import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, FileText, X } from 'lucide-react';
import { LoginPortal } from './components/LoginPortal.tsx';
import { NavTab, PortalShell } from './components/PortalShell.tsx';
import {
  AdminDashboardView,
  AdminExecutiveProfileView,
  AdminStaffManagementView,
  AdminStudentManagementView,
} from './components/admin/AdminViews.tsx';
import {
  FacultyAssignmentsHubView,
  FacultyDashboardView,
  FacultyMarksConsoleView,
} from './components/faculty/FacultyViews.tsx';
import { SettingsView, StandardProfileView } from './components/shared/ProfileAndSettings.tsx';
import {
  StudentAssignmentsView,
  StudentAttendanceView,
  StudentDashboardView,
  StudentTimetableView,
} from './components/student/StudentPrimaryViews.tsx';
import {
  StudentAiAssistantView,
  StudentAnnouncementsView,
  StudentCalendarView,
  StudentMaterialsView,
  StudentResultsView,
} from './components/student/StudentSecondaryViews.tsx';
import {
  AnnouncementItem,
  EduTrackDatabase,
  StaffRegistryItem,
  StudentRegistryItem,
  StudyMaterialItem,
  SubmissionRecord,
  UserProfile,
  UserRole,
  UserSettings,
} from './types/edutrack.ts';

const VALID_TABS_BY_ROLE: Record<UserRole, NavTab[]> = {
  student: [
    'dashboard',
    'assignments',
    'attendance',
    'timetable',
    'calendar',
    'announcements',
    'results',
    'materials',
    'ai-assistant',
    'profile',
    'settings',
  ],
  faculty: ['dashboard', 'assignments', 'assignment-marks', 'profile', 'settings'],
  admin: ['dashboard', 'student-management', 'staff-management', 'profile', 'settings'],
};

export default function App() {
  const [db, setDb] = useState<EduTrackDatabase | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');
  const [inspectSubmission, setInspectSubmission] = useState<SubmissionRecord | null>(null);
  const [inspectMarks, setInspectMarks] = useState<string>('');
  const [inspectFeedback, setInspectFeedback] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  }, []);

  const fetchBootstrap = useCallback(async () => {
    try {
      setLoadError(null);
      const res = await fetch('/api/bootstrap');
      if (!res.ok) throw new Error('Unable to load EduTrack workspace.');
      const data = (await res.json()) as EduTrackDatabase;
      setDb(data);
    } catch (err: unknown) {
      setLoadError(err instanceof Error ? err.message : 'Network error loading workspace.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBootstrap();
  }, [fetchBootstrap]);

  useEffect(() => {
    if (!db) return;
    const theme = db.profiles[role]?.settings?.theme ?? 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [db, role]);

  const handleLoginSuccess = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setActiveTab('dashboard');
    setSearchQuery('');
    setIsAuthenticated(true);
  };

  const handleSwitchRole = (nextRole: UserRole) => {
    setRole(nextRole);
    setSearchQuery('');
    setActiveTab((prev) =>
      VALID_TABS_BY_ROLE[nextRole].includes(prev) ? prev : 'dashboard'
    );
  };

  const handleSelectTab = (tab: NavTab, aiPrompt?: string) => {
    if (aiPrompt !== undefined) {
      setAiInitialPrompt(aiPrompt);
    } else if (tab !== 'ai-assistant') {
      setAiInitialPrompt('');
    }
    setActiveTab(tab);
  };

  const handleSaveProfile = async (
    updates: Partial<UserProfile>,
    settings?: Partial<UserSettings>
  ) => {
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, updates, settings }),
    });
    if (!res.ok) throw new Error('Failed to save profile.');
    const updatedProfile = (await res.json()) as UserProfile;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            profiles: { ...prev.profiles, [role]: updatedProfile },
          }
        : prev
    );
  };

  const handleSubmitAssignment = async (id: string, fileName: string, notes: string) => {
    const res = await fetch(`/api/assignments/${id}/submit`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, notes }),
    });
    if (!res.ok) throw new Error('Failed to submit assignment.');
    await fetchBootstrap();
    notify('Deliverable submitted and synced to Faculty Portal.');
  };

  const handleRequestExtension = async (id: string) => {
    const res = await fetch(`/api/assignments/${id}/extend`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to request extension.');
    const updated = await res.json();
    setDb((prev) =>
      prev
        ? {
            ...prev,
            assignments: prev.assignments.map((a) => (a.id === id ? updated : a)),
          }
        : prev
    );
    notify('48-hour grace extension activated.');
  };

  const handleCreateAssignment = async (payload: {
    title: string;
    description: string;
    courseCode: string;
    courseTitle: string;
    targetSection: string;
    dueWindow: string;
    maxMarks: number;
  }) => {
    const res = await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create assignment.');
    await fetchBootstrap();
    notify('Assignment published across student portals.');
  };

  const handleSaveGrade = async (id: string, marks: number | null, feedback: string) => {
    const res = await fetch(`/api/submissions/${id}/grade`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ marks, feedback }),
    });
    if (!res.ok) throw new Error('Failed to save grade.');
    const updated = (await res.json()) as SubmissionRecord;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            submissions: prev.submissions.map((s) => (s.id === id ? updated : s)),
          }
        : prev
    );
  };

  const handlePublishAll = async () => {
    const res = await fetch('/api/submissions/publish', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to publish marks.');
    const updatedList = (await res.json()) as SubmissionRecord[];
    setDb((prev) => (prev ? { ...prev, submissions: updatedList } : prev));
    notify('All evaluated marks published to student portals.');
  };

  const handleSubmitLeave = async (payload: {
    leaveType: string;
    fromDate: string;
    toDate: string;
    reason: string;
  }) => {
    const res = await fetch('/api/attendance/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to submit leave request.');
    const created = await res.json();
    setDb((prev) =>
      prev ? { ...prev, leaveRequests: [created, ...prev.leaveRequests] } : prev
    );
    notify('Leave / OD application submitted for faculty review.');
  };

  const handleToggleAnnouncement = async (
    id: string,
    field: 'isRead' | 'isBookmarked'
  ) => {
    const current = db?.announcements.find((a) => a.id === id);
    if (!current) return;
    const res = await fetch(`/api/announcements/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !current[field] }),
    });
    if (!res.ok) return;
    const updated = (await res.json()) as AnnouncementItem;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            announcements: prev.announcements.map((a) => (a.id === id ? updated : a)),
          }
        : prev
    );
  };

  const handleMarkAllRead = async () => {
    const res = await fetch('/api/announcements/mark-all-read', { method: 'POST' });
    if (!res.ok) return;
    const updated = (await res.json()) as AnnouncementItem[];
    setDb((prev) => (prev ? { ...prev, announcements: updated } : prev));
    notify('All campus circulars marked as read.');
  };

  const handleCreateAnnouncement = async (payload: {
    title: string;
    summary: string;
    category: AnnouncementItem['category'];
  }) => {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to broadcast circular.');
    const created = (await res.json()) as AnnouncementItem;
    setDb((prev) =>
      prev ? { ...prev, announcements: [created, ...prev.announcements] } : prev
    );
    notify('Academic circular broadcasted.');
  };

  const handleUploadMaterial = async (payload: {
    title: string;
    courseCode: string;
    courseName: string;
    fileType: StudyMaterialItem['fileType'];
  }) => {
    const res = await fetch('/api/materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to upload study material.');
    const created = (await res.json()) as StudyMaterialItem;
    setDb((prev) =>
      prev ? { ...prev, studyMaterials: [created, ...prev.studyMaterials] } : prev
    );
    notify('Study material published to repository.');
  };

  const handleToggleOffline = async (id: string) => {
    const res = await fetch(`/api/materials/${id}/offline`, { method: 'PATCH' });
    if (!res.ok) return;
    const updated = (await res.json()) as StudyMaterialItem;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            studyMaterials: prev.studyMaterials.map((m) => (m.id === id ? updated : m)),
          }
        : prev
    );
  };

  const handleAddStudent = async (payload: {
    fullName: string;
    registerNo: string;
    department: string;
    specialization: string;
    yearLabel: string;
    semesterLabel: string;
    email: string;
    phone: string;
  }) => {
    const res = await fetch('/api/admin/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to add student.');
    await fetchBootstrap();
    notify('Student enrolled into institutional registry.');
  };

  const handleUpdateStudentStatus = async (
    id: string,
    status: StudentRegistryItem['status']
  ) => {
    const res = await fetch(`/api/admin/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    const updated = (await res.json()) as StudentRegistryItem;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            studentRegistry: prev.studentRegistry.map((s) => (s.id === id ? updated : s)),
          }
        : prev
    );
  };

  const handleDeleteStudent = async (id: string) => {
    const res = await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
    if (!res.ok) return;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            studentRegistry: prev.studentRegistry.filter((s) => s.id !== id),
          }
        : prev
    );
    notify('Student record removed from registry.');
  };

  const handleAddStaff = async (payload: {
    fullName: string;
    staffId: string;
    department: string;
    designation: string;
    email: string;
    phone: string;
    weeklyHours: number;
  }) => {
    const res = await fetch('/api/admin/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to onboard staff.');
    await fetchBootstrap();
    notify('Faculty member onboarded to directory.');
  };

  const handleUpdateStaffStatus = async (
    id: string,
    status: StaffRegistryItem['status']
  ) => {
    const res = await fetch(`/api/admin/staff/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    const updated = (await res.json()) as StaffRegistryItem;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            staffRegistry: prev.staffRegistry.map((s) => (s.id === id ? updated : s)),
          }
        : prev
    );
  };

  const handleDeleteStaff = async (id: string) => {
    const res = await fetch(`/api/admin/staff/${id}`, { method: 'DELETE' });
    if (!res.ok) return;
    setDb((prev) =>
      prev
        ? {
            ...prev,
            staffRegistry: prev.staffRegistry.filter((s) => s.id !== id),
          }
        : prev
    );
    notify('Staff record removed from directory.');
  };

  const handleAiSend = async (threadId: string, message: string, mode: string) => {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, message, mode }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'AI Tutor request failed.');
    }
    await fetchBootstrap();
  };

  if (loading) {
    return (
      <div className="min-h-screen edutrack-canvas-wash flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-[#30b155] border-t-transparent animate-spin" />
          <span className="text-sm font-bold text-slate-800">Initializing EduTrack AI Portal...</span>
        </div>
      </div>
    );
  }

  if (loadError || !db) {
    return (
      <div className="min-h-screen edutrack-canvas-wash flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-red-200 shadow-sm space-y-3 text-center">
          <p className="text-base font-extrabold text-slate-900">Unable to Connect to Institutional Server</p>
          <p className="text-xs text-slate-600">{loadError || 'Workspace state is unavailable.'}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void fetchBootstrap();
            }}
            className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPortal onLoginSuccess={handleLoginSuccess} />;
  }

  const activeProfile = db.profiles[role];

  const renderPage = () => {
    if (activeTab === 'settings') {
      return <SettingsView profile={activeProfile} onSaveProfile={handleSaveProfile} />;
    }

    if (activeTab === 'profile') {
      if (role === 'admin') {
        return (
          <AdminExecutiveProfileView
            profile={activeProfile}
            auditLogs={db.auditLogs}
            onSaveProfile={(updates) => handleSaveProfile(updates)}
          />
        );
      }
      return (
        <StandardProfileView
          profile={activeProfile}
          onSaveProfile={(updates) => handleSaveProfile(updates)}
        />
      );
    }

    if (role === 'student') {
      switch (activeTab) {
        case 'assignments':
          return (
            <StudentAssignmentsView
              assignments={db.assignments}
              searchQuery={searchQuery}
              onSubmitAssignment={handleSubmitAssignment}
              onRequestExtension={handleRequestExtension}
              onOpenAi={(promptText) => handleSelectTab('ai-assistant', promptText)}
            />
          );
        case 'attendance':
          return (
            <StudentAttendanceView
              records={db.attendanceRecords}
              eligibility={db.courseEligibility}
              leaveRequests={db.leaveRequests}
              onSubmitLeave={handleSubmitLeave}
            />
          );
        case 'timetable':
          return <StudentTimetableView slots={db.timetableSlots} />;
        case 'calendar':
          return <StudentCalendarView events={db.calendarEvents} />;
        case 'announcements':
          return (
            <StudentAnnouncementsView
              announcements={db.announcements}
              onToggleRead={(id) => handleToggleAnnouncement(id, 'isRead')}
              onToggleBookmark={(id) => handleToggleAnnouncement(id, 'isBookmarked')}
              onMarkAllRead={handleMarkAllRead}
              onNavigateResults={() => handleSelectTab('results')}
            />
          );
        case 'results':
          return <StudentResultsView results={db.examResults} />;
        case 'materials':
          return (
            <StudentMaterialsView
              materials={db.studyMaterials}
              onToggleOffline={handleToggleOffline}
              onUploadMaterial={handleUploadMaterial}
            />
          );
        case 'ai-assistant':
          return (
            <StudentAiAssistantView
              key={aiInitialPrompt || 'ai-default'}
              threads={db.aiThreads}
              initialPrompt={aiInitialPrompt}
              onSendMessage={handleAiSend}
            />
          );
        case 'dashboard':
        default:
          return (
            <StudentDashboardView
              assignments={db.assignments}
              calendarEvents={db.calendarEvents}
              onNavigate={handleSelectTab}
            />
          );
      }
    }

    if (role === 'faculty') {
      switch (activeTab) {
        case 'assignments':
          return (
            <FacultyAssignmentsHubView
              assignments={db.assignments}
              submissions={db.submissions}
              materials={db.studyMaterials}
              announcements={db.announcements}
              onCreateAssignment={handleCreateAssignment}
              onUploadMaterial={handleUploadMaterial}
              onCreateAnnouncement={handleCreateAnnouncement}
              onOpenMarksConsole={() => handleSelectTab('assignment-marks')}
            />
          );
        case 'assignment-marks':
          return (
            <FacultyMarksConsoleView
              submissions={db.submissions}
              onSaveGrade={handleSaveGrade}
              onPublishAll={handlePublishAll}
            />
          );
        case 'dashboard':
        default:
          return (
            <FacultyDashboardView
              profile={activeProfile}
              assignments={db.assignments}
              submissions={db.submissions}
              announcements={db.announcements}
              onNavigate={handleSelectTab}
              onInspectSubmission={(sub) => {
                setInspectSubmission(sub);
                setInspectMarks(sub.marks !== null ? String(sub.marks) : '');
                setInspectFeedback(sub.feedback || '');
              }}
            />
          );
      }
    }

    // Admin Portal
    switch (activeTab) {
      case 'student-management':
        return (
          <AdminStudentManagementView
            students={db.studentRegistry}
            onAddStudent={handleAddStudent}
            onUpdateStatus={handleUpdateStudentStatus}
            onDeleteStudent={handleDeleteStudent}
          />
        );
      case 'staff-management':
        return (
          <AdminStaffManagementView
            staff={db.staffRegistry}
            onAddStaff={handleAddStaff}
            onUpdateStatus={handleUpdateStaffStatus}
            onDeleteStaff={handleDeleteStaff}
          />
        );
      case 'dashboard':
      default:
        return (
          <AdminDashboardView
            profile={activeProfile}
            students={db.studentRegistry}
            staff={db.staffRegistry}
            activity={db.campusActivity}
            onNavigate={handleSelectTab}
          />
        );
    }
  };

  return (
    <PortalShell
      role={role}
      profile={activeProfile}
      activeTab={activeTab}
      onSelectTab={(t) => handleSelectTab(t)}
      onSwitchRole={handleSwitchRole}
      onLogout={() => {
        setIsAuthenticated(false);
        setActiveTab('dashboard');
      }}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      announcements={db.announcements}
    >
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 shadow-xl rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs font-bold text-slate-900 dark:text-white">
          <CheckCircle2 className="w-4 h-4 text-[#30b155] shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {renderPage()}

      {/* Faculty Quick Submission Inspection Modal */}
      {inspectSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#006e2c] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold">{inspectSubmission.studentName}</h3>
                  <p className="text-xs text-slate-500">
                    {inspectSubmission.studentCode} • {inspectSubmission.courseCode}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectSubmission(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">{inspectSubmission.assignmentTitle}</p>
              <p className="font-mono text-[#006e2c]">{inspectSubmission.fileName}</p>
              <p className="text-slate-500">Submitted: {inspectSubmission.submittedAt}</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const parsed = inspectMarks.trim() === '' ? null : Number(inspectMarks);
                await handleSaveGrade(inspectSubmission.id, parsed, inspectFeedback);
                setInspectSubmission(null);
                notify('Submission marks saved.');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-bold mb-1">
                  Marks (Max {inspectSubmission.maxMarks})
                </label>
                <input
                  type="number"
                  min={0}
                  max={inspectSubmission.maxMarks}
                  value={inspectMarks}
                  onChange={(e) => setInspectMarks(e.target.value)}
                  placeholder="Enter score..."
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm font-bold tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Evaluation Feedback</label>
                <textarea
                  rows={2}
                  value={inspectFeedback}
                  onChange={(e) => setInspectFeedback(e.target.value)}
                  placeholder="Provide qualitative evaluation notes..."
                  className="w-full p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs"
                />
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setInspectSubmission(null);
                    handleSelectTab('assignment-marks');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  Open Full Ledger
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer"
                >
                  Save Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
