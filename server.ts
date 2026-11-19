import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  deleteRowFromSupabase,
  loadDatabase,
  saveDatabase,
  syncRowToSupabase,
} from './server/store.ts';
import {
  AiChatMessage,
  AnnouncementItem,
  AssignmentItem,
  StaffRegistryItem,
  StudentRegistryItem,
  StudyMaterialItem,
  UserRole,
} from './src/types/edutrack.ts';

dotenv.config();

const PORT = 3000;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function computeGrade(marks: number, maxMarks: number): string {
  const pct = Math.round((marks / Math.max(1, maxMarks)) * 100);
  if (pct >= 90) return `A+ (${pct}%)`;
  if (pct >= 80) return `A (${pct}%)`;
  if (pct >= 70) return `B+ (${pct}%)`;
  if (pct >= 60) return `B (${pct}%)`;
  return `C (${pct}%)`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '4mb' }));

  // Bootstrap all data
  app.get('/api/bootstrap', async (_req, res) => {
    try {
      const db = await loadDatabase();
      res.json(db);
    } catch (err) {
      console.error('Bootstrap error:', err);
      res.status(500).json({ error: 'Failed to load institutional workspace data.' });
    }
  });

  // Auth Sign-In (supports student, faculty, admin credentials or quick portal login)
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { role, identifier, password } = req.body as {
        role?: UserRole;
        identifier?: string;
        password?: string;
      };
      const selectedRole: UserRole = role && ['student', 'faculty', 'admin'].includes(role) ? role : 'student';
      const db = await loadDatabase();
      const profile = db.profiles[selectedRole];

      if (!identifier || !identifier.trim()) {
        return res.status(400).json({ error: 'Please enter your institutional ID or email.' });
      }
      if (!password || password.trim().length < 4) {
        return res.status(400).json({ error: 'Please enter a valid institutional password (min 4 characters).' });
      }

      res.json({
        authenticated: true,
        role: selectedRole,
        profile,
      });
    } catch (err) {
      console.error('Auth error:', err);
      res.status(500).json({ error: 'Authentication service unavailable.' });
    }
  });

  // Update Profile & Settings
  app.patch('/api/profile', async (req, res) => {
    try {
      const { role, updates, settings } = req.body as {
        role: UserRole;
        updates?: Record<string, unknown>;
        settings?: Record<string, unknown>;
      };
      const db = await loadDatabase();
      const current = db.profiles[role];
      if (!current) {
        return res.status(404).json({ error: 'Profile role not found.' });
      }

      const updatedProfile = {
        ...current,
        ...(updates ?? {}),
        settings: settings ? { ...current.settings, ...settings } : current.settings,
      };
      db.profiles[role] = updatedProfile;

      if (role === 'admin' && updates?.fullName) {
        db.auditLogs.unshift({
          id: `aud-${Date.now()}`,
          title: 'Executive Profile Updated',
          detail: `Updated contact dossier for ${String(updates.fullName)}`,
          timestamp: 'Just now',
        });
      }

      await saveDatabase(db);
      await syncRowToSupabase('profiles', {
        id: updatedProfile.id,
        role: updatedProfile.role,
        institutional_id: updatedProfile.institutionalId,
        full_name: updatedProfile.fullName,
        display_title: updatedProfile.displayTitle,
        email: updatedProfile.email,
        recovery_email: updatedProfile.recoveryEmail,
        phone: updatedProfile.phone,
        alt_phone: updatedProfile.altPhone,
        department: updatedProfile.department,
        office_location: updatedProfile.officeLocation,
        office_hours: updatedProfile.officeHours,
        emergency_contact: updatedProfile.emergencyContact,
        settings: updatedProfile.settings,
      });

      res.json(updatedProfile);
    } catch (err) {
      console.error('Profile update failed:', err);
      res.status(500).json({ error: 'Failed to save profile changes.' });
    }
  });

  // Create Assignment (Faculty)
  app.post('/api/assignments', async (req, res) => {
    try {
      const { title, description, courseCode, courseTitle, targetSection, dueWindow, maxMarks } = req.body;
      if (!title || !courseCode) {
        return res.status(400).json({ error: 'Assignment title and course code are required.' });
      }
      const db = await loadDatabase();
      const id = `asg-${Date.now()}`;
      const code = `#ASG-${Math.floor(4100 + Math.random() * 900)}`;
      const newAssignment: AssignmentItem = {
        id,
        code,
        title: String(title),
        description: String(description || 'Coursework specification & lab report deliverables.'),
        courseCode: String(courseCode),
        courseTitle: String(courseTitle || 'Computer Science'),
        facultyName: db.profiles.faculty.displayTitle,
        targetSection: String(targetSection || 'CSE-A • Sem 5'),
        dueDate: '2024-11-28',
        dueWindow: String(dueWindow || 'Nov 28, 11:59 PM'),
        timeLeft: '10 days left',
        maxMarks: Number(maxMarks || 50),
        status: 'Pending',
        progress: 0,
        isCritical: false,
        submissionsRatio: '0 / 60',
        submissionsPct: 0,
      };
      db.assignments.unshift(newAssignment);
      db.campusActivity.unshift({
        id: `act-${Date.now()}`,
        title: 'New Assignment Published',
        detail: `${newAssignment.courseCode}: ${newAssignment.title}`,
        timeAgo: 'Just now',
        type: 'curricula',
      });
      await saveDatabase(db);
      await syncRowToSupabase('assignments', {
        id: newAssignment.id,
        code: newAssignment.code,
        title: newAssignment.title,
        description: newAssignment.description,
        course_code: newAssignment.courseCode,
        course_title: newAssignment.courseTitle,
        faculty_name: newAssignment.facultyName,
        target_section: newAssignment.targetSection,
        due_date: newAssignment.dueDate,
        due_window: newAssignment.dueWindow,
        time_left: newAssignment.timeLeft,
        max_marks: newAssignment.maxMarks,
        status: newAssignment.status,
        progress: newAssignment.progress,
        is_critical: newAssignment.isCritical,
      });

      res.status(201).json(newAssignment);
    } catch (err) {
      console.error('Create assignment error:', err);
      res.status(500).json({ error: 'Failed to create assignment.' });
    }
  });

  // Student submits an assignment
  app.patch('/api/assignments/:id/submit', async (req, res) => {
    try {
      const { id } = req.params;
      const { fileName, notes } = req.body as { fileName?: string; notes?: string };
      const db = await loadDatabase();
      const idx = db.assignments.findIndex((a) => a.id === id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Assignment not found.' });
      }
      const existing = db.assignments[idx];
      const updated: AssignmentItem = {
        ...existing,
        status: 'Submitted',
        progress: 100,
        submittedFile: fileName || 'submission_final.pdf',
        submittedAt: 'Just now',
        feedback: notes ? `Student Note: ${notes}` : existing.feedback,
      };
      db.assignments[idx] = updated;

      // Add to faculty submissions ledger if not present
      const existingSub = db.submissions.find((s) => s.assignmentId === id && s.studentCode === 'STU-2024-8841');
      if (!existingSub) {
        const subId = `sub-${Date.now()}`;
        const subRecord = {
          id: subId,
          assignmentId: id,
          assignmentTitle: updated.title,
          courseCode: updated.courseCode,
          studentName: db.profiles.student.displayTitle,
          studentCode: db.profiles.student.institutionalId,
          initials: 'AM',
          fileName: updated.submittedFile || 'submission_final.pdf',
          submittedAt: 'Just now',
          submissionState: 'On-Time' as const,
          marks: null,
          maxMarks: updated.maxMarks,
          feedback: '',
          grade: 'Pending',
          published: false,
        };
        db.submissions.unshift(subRecord);
        await syncRowToSupabase('submissions', {
          id: subRecord.id,
          assignment_id: subRecord.assignmentId,
          assignment_title: subRecord.assignmentTitle,
          course_code: subRecord.courseCode,
          student_name: subRecord.studentName,
          student_code: subRecord.studentCode,
          initials: subRecord.initials,
          file_name: subRecord.fileName,
          submitted_at: subRecord.submittedAt,
          submission_state: subRecord.submissionState,
          marks: subRecord.marks,
          max_marks: subRecord.maxMarks,
          feedback: subRecord.feedback,
          grade: subRecord.grade,
          published: subRecord.published,
        });
      }

      await saveDatabase(db);
      await syncRowToSupabase('assignments', {
        id: updated.id,
        status: updated.status,
        progress: updated.progress,
        submitted_file: updated.submittedFile,
        submitted_at: updated.submittedAt,
      });

      res.json(updated);
    } catch (err) {
      console.error('Submit assignment error:', err);
      res.status(500).json({ error: 'Failed to submit assignment.' });
    }
  });

  // Student requests extension
  app.patch('/api/assignments/:id/extend', async (req, res) => {
    try {
      const { id } = req.params;
      const db = await loadDatabase();
      const idx = db.assignments.findIndex((a) => a.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Assignment not found.' });
      db.assignments[idx] = {
        ...db.assignments[idx],
        status: 'Extended',
        timeLeft: '48h grace granted',
      };
      await saveDatabase(db);
      res.json(db.assignments[idx]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to request extension.' });
    }
  });

  // Faculty grades a submission
  app.patch('/api/submissions/:id/grade', async (req, res) => {
    try {
      const { id } = req.params;
      const { marks, feedback, published } = req.body as {
        marks?: number | null;
        feedback?: string;
        published?: boolean;
      };
      const db = await loadDatabase();
      const idx = db.submissions.findIndex((s) => s.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Submission not found.' });

      const current = db.submissions[idx];
      const nextMarks = marks === null ? null : typeof marks === 'number' ? Math.max(0, Math.min(current.maxMarks, marks)) : current.marks;
      const nextGrade = nextMarks !== null ? computeGrade(nextMarks, current.maxMarks) : 'Pending';
      const updated = {
        ...current,
        marks: nextMarks,
        feedback: feedback !== undefined ? feedback : current.feedback,
        grade: nextGrade,
        published: published !== undefined ? published : current.published,
      };
      db.submissions[idx] = updated;
      await saveDatabase(db);
      await syncRowToSupabase('submissions', {
        id: updated.id,
        marks: updated.marks,
        feedback: updated.feedback,
        grade: updated.grade,
        published: updated.published,
      });

      res.json(updated);
    } catch (err) {
      console.error('Grade submission error:', err);
      res.status(500).json({ error: 'Failed to save grade.' });
    }
  });

  // Publish all graded submissions
  app.post('/api/submissions/publish', async (_req, res) => {
    try {
      const db = await loadDatabase();
      db.submissions = db.submissions.map((s) =>
        s.marks !== null ? { ...s, published: true } : s
      );
      await saveDatabase(db);
      res.json(db.submissions);
    } catch (err) {
      res.status(500).json({ error: 'Failed to publish marks.' });
    }
  });

  // Student submits Leave / OD request
  app.post('/api/attendance/leave', async (req, res) => {
    try {
      const { leaveType, fromDate, toDate, reason } = req.body;
      if (!leaveType || !fromDate || !reason) {
        return res.status(400).json({ error: 'Leave type, date, and reason are required.' });
      }
      const db = await loadDatabase();
      const leave = {
        id: `lv-${Date.now()}`,
        leaveType: String(leaveType),
        fromDate: String(fromDate),
        toDate: String(toDate || fromDate),
        reason: String(reason),
        status: 'Pending Approval' as const,
        createdAt: 'Just now',
      };
      db.leaveRequests.unshift(leave);
      await saveDatabase(db);
      await syncRowToSupabase('leave_requests', {
        id: leave.id,
        student_id: db.profiles.student.id,
        leave_type: leave.leaveType,
        from_date: leave.fromDate,
        to_date: leave.toDate,
        reason: leave.reason,
        status: leave.status,
      });
      res.status(201).json(leave);
    } catch (err) {
      res.status(500).json({ error: 'Failed to submit leave request.' });
    }
  });

  // Announcements read / bookmark / mark all read / create
  app.patch('/api/announcements/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { isRead, isBookmarked } = req.body;
      const db = await loadDatabase();
      const idx = db.announcements.findIndex((a) => a.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Announcement not found.' });
      db.announcements[idx] = {
        ...db.announcements[idx],
        isRead: isRead !== undefined ? Boolean(isRead) : db.announcements[idx].isRead,
        isBookmarked: isBookmarked !== undefined ? Boolean(isBookmarked) : db.announcements[idx].isBookmarked,
      };
      await saveDatabase(db);
      res.json(db.announcements[idx]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update announcement.' });
    }
  });

  app.post('/api/announcements/mark-all-read', async (_req, res) => {
    try {
      const db = await loadDatabase();
      db.announcements = db.announcements.map((a) => ({ ...a, isRead: true }));
      await saveDatabase(db);
      res.json(db.announcements);
    } catch (err) {
      res.status(500).json({ error: 'Failed to mark announcements as read.' });
    }
  });

  app.post('/api/announcements', async (req, res) => {
    try {
      const { title, summary, category, tag } = req.body;
      if (!title || !summary) return res.status(400).json({ error: 'Title and summary are required.' });
      const db = await loadDatabase();
      const item: AnnouncementItem = {
        id: `ann-${Date.now()}`,
        title: String(title),
        summary: String(summary),
        body: String(summary),
        category: category || 'ACADEMIC',
        tag: String(tag || 'Department Notice'),
        authorName: db.profiles.faculty.displayTitle,
        authorRole: 'Faculty of CS',
        publishedAt: 'Just now',
        isRead: false,
        isBookmarked: false,
        isUrgent: category === 'IMPORTANT NOTICE',
      };
      db.announcements.unshift(item);
      await saveDatabase(db);
      await syncRowToSupabase('announcements', {
        id: item.id,
        title: item.title,
        summary: item.summary,
        body: item.body,
        category: item.category,
        tag: item.tag,
        author_name: item.authorName,
        author_role: item.authorRole,
        published_at: item.publishedAt,
        is_read: item.isRead,
        is_bookmarked: item.isBookmarked,
        is_urgent: item.isUrgent,
      });
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: 'Failed to publish circular.' });
    }
  });

  // Study Materials: create & toggle offline
  app.post('/api/materials', async (req, res) => {
    try {
      const { title, courseCode, courseName, unitLabel, fileType, fileSize } = req.body;
      if (!title || !courseCode) return res.status(400).json({ error: 'Material title and course code required.' });
      const db = await loadDatabase();
      const material: StudyMaterialItem = {
        id: `mat-${Date.now()}`,
        title: String(title),
        courseCode: String(courseCode),
        courseName: String(courseName || 'Computer Science'),
        facultyName: db.profiles.faculty.displayTitle,
        unitLabel: String(unitLabel || 'Lecture Archive'),
        fileType: fileType || 'PDF Notes',
        badgeLabel: `${fileType || 'PDF Notes'} • Verified`,
        fileSize: String(fileSize || '8.4 MB'),
        updatedLabel: 'Just now',
        isUnread: true,
        isOffline: false,
      };
      db.studyMaterials.unshift(material);
      await saveDatabase(db);
      await syncRowToSupabase('study_materials', {
        id: material.id,
        title: material.title,
        course_code: material.courseCode,
        course_name: material.courseName,
        faculty_name: material.facultyName,
        unit_label: material.unitLabel,
        file_type: material.fileType,
        badge_label: material.badgeLabel,
        file_size: material.fileSize,
        updated_label: material.updatedLabel,
        is_unread: material.isUnread,
        is_offline: material.isOffline,
      });
      res.status(201).json(material);
    } catch (err) {
      res.status(500).json({ error: 'Failed to upload material.' });
    }
  });

  app.patch('/api/materials/:id/offline', async (req, res) => {
    try {
      const { id } = req.params;
      const db = await loadDatabase();
      const idx = db.studyMaterials.findIndex((m) => m.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Material not found.' });
      db.studyMaterials[idx] = {
        ...db.studyMaterials[idx],
        isOffline: !db.studyMaterials[idx].isOffline,
        isUnread: false,
      };
      await saveDatabase(db);
      res.json(db.studyMaterials[idx]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update material sync.' });
    }
  });

  // Admin Student Registry CRUD
  app.post('/api/admin/students', async (req, res) => {
    try {
      const { fullName, registerNo, department, specialization, yearLabel, semesterLabel, email, phone } = req.body;
      if (!fullName || !registerNo || !email) {
        return res.status(400).json({ error: 'Full name, register number, and email are required.' });
      }
      const db = await loadDatabase();
      const parts = String(fullName).trim().split(/\s+/);
      const initials = parts.map((p) => p[0]?.toUpperCase() || '').join('').slice(0, 2) || 'ST';
      const student: StudentRegistryItem = {
        id: `reg-s-${Date.now()}`,
        fullName: String(fullName),
        initials,
        admittedTerm: 'Admitted: Fall 2024',
        registerNo: String(registerNo),
        department: String(department || 'Computer Science & AI'),
        specialization: String(specialization || 'B.Tech Honors'),
        yearLabel: String(yearLabel || 'Year 1'),
        semesterLabel: String(semesterLabel || 'Sem I'),
        email: String(email),
        phone: String(phone || '+1 (555) 200-4000'),
        attendancePct: 100,
        status: 'Active',
      };
      db.studentRegistry.unshift(student);
      db.campusActivity.unshift({
        id: `act-${Date.now()}`,
        title: `${student.fullName} registered`,
        detail: `Enrolled in ${student.department} (${student.registerNo})`,
        timeAgo: 'Just now',
        type: 'registration',
      });
      await saveDatabase(db);
      await syncRowToSupabase('student_registry', {
        id: student.id,
        full_name: student.fullName,
        initials: student.initials,
        admitted_term: student.admittedTerm,
        register_no: student.registerNo,
        department: student.department,
        specialization: student.specialization,
        year_label: student.yearLabel,
        semester_label: student.semesterLabel,
        email: student.email,
        phone: student.phone,
        attendance_pct: student.attendancePct,
        status: student.status,
      });
      res.status(201).json(student);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add student record.' });
    }
  });

  app.patch('/api/admin/students/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = await loadDatabase();
      const idx = db.studentRegistry.findIndex((s) => s.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Student not found.' });
      db.studentRegistry[idx] = { ...db.studentRegistry[idx], ...req.body };
      await saveDatabase(db);
      res.json(db.studentRegistry[idx]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update student.' });
    }
  });

  app.delete('/api/admin/students/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = await loadDatabase();
      db.studentRegistry = db.studentRegistry.filter((s) => s.id !== id);
      await saveDatabase(db);
      await deleteRowFromSupabase('student_registry', id);
      res.json({ deleted: true, id });
    } catch (err) {
      res.status(500).json({ error: 'Failed to remove student.' });
    }
  });

  // Admin Staff Directory CRUD
  app.post('/api/admin/staff', async (req, res) => {
    try {
      const { fullName, staffId, department, designation, email, phone, weeklyHours } = req.body;
      if (!fullName || !staffId || !email) {
        return res.status(400).json({ error: 'Name, Staff ID, and email are required.' });
      }
      const db = await loadDatabase();
      const cleanName = String(fullName).replace(/^(Prof\.|Dr\.)\s*/i, '');
      const initials = cleanName
        .split(/\s+/)
        .map((p) => p[0]?.toUpperCase() || '')
        .join('')
        .slice(0, 2) || 'FC';
      const staff: StaffRegistryItem = {
        id: `reg-f-${Date.now()}`,
        fullName: String(fullName),
        initials,
        staffId: String(staffId),
        department: String(department || 'Computer Science & AI'),
        designation: String(designation || 'Assistant Professor'),
        email: String(email),
        phone: String(phone || '+1 (555) 482-9900'),
        weeklyHours: Number(weeklyHours || 14),
        status: 'On Duty',
      };
      db.staffRegistry.unshift(staff);
      db.campusActivity.unshift({
        id: `act-${Date.now()}`,
        title: 'Faculty Onboarded',
        detail: `${staff.fullName} assigned to ${staff.department}`,
        timeAgo: 'Just now',
        type: 'faculty',
      });
      await saveDatabase(db);
      await syncRowToSupabase('staff_registry', {
        id: staff.id,
        full_name: staff.fullName,
        initials: staff.initials,
        staff_id: staff.staffId,
        department: staff.department,
        designation: staff.designation,
        email: staff.email,
        phone: staff.phone,
        weekly_hours: staff.weeklyHours,
        status: staff.status,
      });
      res.status(201).json(staff);
    } catch (err) {
      res.status(500).json({ error: 'Failed to onboard faculty member.' });
    }
  });

  app.patch('/api/admin/staff/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = await loadDatabase();
      const idx = db.staffRegistry.findIndex((s) => s.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Staff record not found.' });
      db.staffRegistry[idx] = { ...db.staffRegistry[idx], ...req.body };
      await saveDatabase(db);
      res.json(db.staffRegistry[idx]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update staff record.' });
    }
  });

  app.delete('/api/admin/staff/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = await loadDatabase();
      db.staffRegistry = db.staffRegistry.filter((s) => s.id !== id);
      await saveDatabase(db);
      await deleteRowFromSupabase('staff_registry', id);
      res.json({ deleted: true, id });
    } catch (err) {
      res.status(500).json({ error: 'Failed to remove staff record.' });
    }
  });

  // Server-Side Gemini AI Study Companion Endpoint
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { threadId, message, mode } = req.body as {
        threadId?: string;
        message: string;
        mode?: string;
      };
      if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message prompt is required.' });
      }

      const db = await loadDatabase();
      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured. Please add your Gemini API key in Settings > Secrets.',
        });
      }

      const targetThread =
        db.aiThreads.find((t) => t.id === threadId) ||
        db.aiThreads[0];

      const userMsg: AiChatMessage = {
        id: `msg-u-${Date.now()}`,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: message.trim(),
      };

      const systemInstruction = `You are the EduTrack AI Study Companion & Tutor for Alex Morgan (Semester V, B.Tech Computer Science & Engineering).
Courses synced: CS-402 Deep Learning, CS-405 Cloud Systems, CS501 Advanced Algorithms, CS502 Operating Systems, CS503 AI & Machine Learning, MAT-301 Applied Mathematics.
Mode requested: ${mode || 'Tutor Q&A'}.
Provide clear, structured, accurate academic explanations. Keep responses concise (2–4 short paragraphs or numbered steps) and include key mathematical definitions or complexity formulas when helpful.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: message.trim(),
        config: {
          systemInstruction,
        },
      });

      const replyText = response.text?.trim() || 'I could not generate a study response for that query.';

      const assistantMsg: AiChatMessage = {
        id: `msg-a-${Date.now() + 1}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedIn: 'Grounded in Semester V CSE Syllabus & Lecture Archives',
        content: replyText,
      };

      if (targetThread) {
        targetThread.messages.push(userMsg, assistantMsg);
        targetThread.updatedLabel = 'Just now';
      } else {
        db.aiThreads.unshift({
          id: `thr-${Date.now()}`,
          title: message.slice(0, 48),
          courseCode: 'CS503',
          subtitle: 'Live AI Tutor Session',
          updatedLabel: 'Just now',
          messages: [userMsg, assistantMsg],
        });
      }

      await saveDatabase(db);
      res.json({ userMsg, assistantMsg, thread: targetThread });
    } catch (err: unknown) {
      console.error('Gemini AI chat error:', err);
      const errMsg = err instanceof Error ? err.message : 'AI Tutor request failed.';
      res.status(500).json({ error: errMsg });
    }
  });

  // Vite dev middleware or production static assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduTrack AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
