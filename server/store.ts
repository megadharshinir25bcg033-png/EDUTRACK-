import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { createInitialDatabase } from '../src/data/seedData.ts';
import { EduTrackDatabase } from '../src/types/edutrack.ts';

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'edutrack-db.json');

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;
  const url = process.env.SUPABASE_URL?.trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)?.trim();
  if (url && key && url.startsWith('http')) {
    supabaseClient = createClient(url, key, {
      auth: { persistSession: false },
    });
    return supabaseClient;
  }
  return null;
}

function readLocalStore(): EduTrackDatabase {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as EduTrackDatabase;
      if (parsed && parsed.profiles && parsed.assignments) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read local store, resetting to initial seed:', err);
  }
  const initial = createInitialDatabase();
  writeLocalStore(initial);
  return initial;
}

function writeLocalStore(db: EduTrackDatabase): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist local store:', err);
  }
}

let memoryDb: EduTrackDatabase | null = null;

export async function loadDatabase(): Promise<EduTrackDatabase> {
  if (!memoryDb) {
    memoryDb = readLocalStore();
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const [
        profilesRes,
        assignmentsRes,
        submissionsRes,
        announcementsRes,
        materialsRes,
        studentsRes,
        staffRes,
      ] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('assignments').select('*'),
        supabase.from('submissions').select('*'),
        supabase.from('announcements').select('*'),
        supabase.from('study_materials').select('*'),
        supabase.from('student_registry').select('*'),
        supabase.from('staff_registry').select('*'),
      ]);

      if (!profilesRes.error && profilesRes.data && profilesRes.data.length > 0) {
        for (const row of profilesRes.data) {
          const role = row.role as 'student' | 'faculty' | 'admin';
          if (memoryDb.profiles[role]) {
            memoryDb.profiles[role] = {
              ...memoryDb.profiles[role],
              institutionalId: row.institutional_id ?? memoryDb.profiles[role].institutionalId,
              fullName: row.full_name ?? memoryDb.profiles[role].fullName,
              displayTitle: row.display_title ?? memoryDb.profiles[role].displayTitle,
              email: row.email ?? memoryDb.profiles[role].email,
              recoveryEmail: row.recovery_email ?? memoryDb.profiles[role].recoveryEmail,
              phone: row.phone ?? memoryDb.profiles[role].phone,
              altPhone: row.alt_phone ?? memoryDb.profiles[role].altPhone,
              officeLocation: row.office_location ?? memoryDb.profiles[role].officeLocation,
              officeHours: row.office_hours ?? memoryDb.profiles[role].officeHours,
              emergencyContact: row.emergency_contact ?? memoryDb.profiles[role].emergencyContact,
              settings: row.settings ?? memoryDb.profiles[role].settings,
            };
          }
        }
      }

      if (!assignmentsRes.error && assignmentsRes.data && assignmentsRes.data.length > 0) {
        memoryDb.assignments = assignmentsRes.data.map((r) => ({
          id: r.id,
          code: r.code,
          title: r.title,
          description: r.description,
          courseCode: r.course_code,
          courseTitle: r.course_title,
          facultyName: r.faculty_name,
          targetSection: r.target_section,
          dueDate: r.due_date,
          dueWindow: r.due_window,
          timeLeft: r.time_left,
          maxMarks: r.max_marks,
          status: r.status,
          progress: r.progress,
          isCritical: r.is_critical,
          submittedFile: r.submitted_file ?? undefined,
          submittedAt: r.submitted_at ?? undefined,
          marksObtained: r.marks_obtained ?? undefined,
          grade: r.grade ?? undefined,
          feedback: r.feedback ?? undefined,
        }));
      }

      if (!submissionsRes.error && submissionsRes.data && submissionsRes.data.length > 0) {
        memoryDb.submissions = submissionsRes.data.map((r) => ({
          id: r.id,
          assignmentId: r.assignment_id,
          assignmentTitle: r.assignment_title,
          courseCode: r.course_code,
          studentName: r.student_name,
          studentCode: r.student_code,
          initials: r.initials,
          fileName: r.file_name,
          submittedAt: r.submitted_at,
          submissionState: r.submission_state,
          marks: r.marks,
          maxMarks: r.max_marks,
          feedback: r.feedback ?? '',
          grade: r.grade ?? 'Pending',
          published: Boolean(r.published),
        }));
      }

      if (!announcementsRes.error && announcementsRes.data && announcementsRes.data.length > 0) {
        memoryDb.announcements = announcementsRes.data.map((r) => ({
          id: r.id,
          title: r.title,
          summary: r.summary,
          body: r.body,
          category: r.category,
          tag: r.tag,
          authorName: r.author_name,
          authorRole: r.author_role,
          publishedAt: r.published_at,
          attachmentLabel: r.attachment_label ?? undefined,
          isRead: Boolean(r.is_read),
          isBookmarked: Boolean(r.is_bookmarked),
          isUrgent: Boolean(r.is_urgent),
        }));
      }

      if (!materialsRes.error && materialsRes.data && materialsRes.data.length > 0) {
        memoryDb.studyMaterials = materialsRes.data.map((r) => ({
          id: r.id,
          title: r.title,
          courseCode: r.course_code,
          courseName: r.course_name,
          facultyName: r.faculty_name,
          unitLabel: r.unit_label,
          fileType: r.file_type,
          badgeLabel: r.badge_label,
          fileSize: r.file_size,
          updatedLabel: r.updated_label,
          isUnread: Boolean(r.is_unread),
          isOffline: Boolean(r.is_offline),
        }));
      }

      if (!studentsRes.error && studentsRes.data && studentsRes.data.length > 0) {
        memoryDb.studentRegistry = studentsRes.data.map((r) => ({
          id: r.id,
          fullName: r.full_name,
          initials: r.initials,
          admittedTerm: r.admitted_term,
          registerNo: r.register_no,
          department: r.department,
          specialization: r.specialization,
          yearLabel: r.year_label,
          semesterLabel: r.semester_label,
          email: r.email,
          phone: r.phone,
          attendancePct: Number(r.attendance_pct),
          status: r.status,
        }));
      }

      if (!staffRes.error && staffRes.data && staffRes.data.length > 0) {
        memoryDb.staffRegistry = staffRes.data.map((r) => ({
          id: r.id,
          fullName: r.full_name,
          initials: r.initials,
          staffId: r.staff_id,
          department: r.department,
          designation: r.designation,
          email: r.email,
          phone: r.phone,
          weeklyHours: Number(r.weekly_hours),
          status: r.status,
        }));
      }
    } catch (err) {
      console.warn('Supabase sync skipped, serving local store:', err);
    }
  }

  return memoryDb;
}

export async function saveDatabase(db: EduTrackDatabase): Promise<void> {
  memoryDb = db;
  writeLocalStore(db);
}

export async function syncRowToSupabase(
  table: string,
  row: Record<string, unknown>,
  conflictColumn = 'id'
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    const { error } = await supabase.from(table).upsert(row, { onConflict: conflictColumn });
    if (error) {
      console.warn(`Supabase upsert warning (${table}):`, error.message);
    }
  } catch (err) {
    console.warn(`Supabase upsert error (${table}):`, err);
  }
}

export async function deleteRowFromSupabase(table: string, id: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      console.warn(`Supabase delete warning (${table}):`, error.message);
    }
  } catch (err) {
    console.warn(`Supabase delete error (${table}):`, err);
  }
}
