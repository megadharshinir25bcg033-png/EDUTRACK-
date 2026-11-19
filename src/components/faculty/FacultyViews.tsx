import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Eye,
  FileText,
  Filter,
  Megaphone,
  Plus,
  Save,
  Send,
  Upload,
  Users,
  X,
} from 'lucide-react';
import {
  AnnouncementItem,
  AssignmentItem,
  StudyMaterialItem,
  SubmissionRecord,
  UserProfile,
} from '../../types/edutrack.ts';
import { NavTab } from '../PortalShell.tsx';

/* -------------------------------------------------------------------------- */
/* 1. FACULTY DASHBOARD VIEW                                                  */
/* -------------------------------------------------------------------------- */
interface FacultyDashboardProps {
  profile: UserProfile;
  assignments: AssignmentItem[];
  submissions: SubmissionRecord[];
  announcements: AnnouncementItem[];
  onNavigate: (tab: NavTab) => void;
  onInspectSubmission: (sub: SubmissionRecord) => void;
}

export const FacultyDashboardView: React.FC<FacultyDashboardProps> = ({
  profile,
  assignments,
  submissions,
  announcements,
  onNavigate,
  onInspectSubmission,
}) => {
  const [courseFilter, setCourseFilter] = useState('All Courses');
  const pendingCount = submissions.filter((s) => s.marks === null).length;
  const completedCount = submissions.filter((s) => s.marks !== null).length;

  const filteredSubs = submissions.filter(
    (s) => courseFilter === 'All Courses' || s.courseCode === courseFilter
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={profile.avatarUrl}
              alt={profile.displayTitle}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#30b155]"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#30b155] border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Welcome back, Prof. Alex Morgan
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
                Verified Faculty
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-[#006e2c] font-bold">{profile.institutionalId}</span> •{' '}
              {profile.department} • {profile.designation}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-1.5 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
            AY 2024–2025 • Fall Semester
          </span>
          <span className="text-xs font-semibold text-[#006e2c]">AI Grading Copilot Connected</span>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-[#006e2c]" />
          </div>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">184</span>
            <span className="px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">+12 new</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Enrolled across 3 active sections</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Total Assignments</span>
            <FileText className="w-4 h-4 text-[#006e2c]" />
          </div>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">{11 + assignments.length}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
              {assignments.length} active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Published across CS501, 502, 503</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">{26 + pendingCount}</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              Needs action
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{pendingCount} submissions in live queue</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Completed Reviews</span>
            <CheckCircle2 className="w-4 h-4 text-[#30b155]" />
          </div>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">{138 + completedCount}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">91.5%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Evaluated & marks published</p>
        </div>
      </div>

      {/* Action Strip */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate('assignments')}
          className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('assignments')}
          className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
        >
          <Upload className="w-4 h-4 text-[#006e2c]" />
          <span>Upload Study Materials</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('assignments')}
          className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
        >
          <ClipboardCheck className="w-4 h-4 text-[#006e2c]" />
          <span>View Student Submissions</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('assignment-marks')}
          className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
        >
          <Award className="w-4 h-4 text-[#006e2c]" />
          <span>Enter Assignment Marks</span>
        </button>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Quick Filter:</span>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="h-9 px-3 rounded-xl bg-[#eef2ff] text-slate-800 font-bold focus:outline-none"
          >
            <option>All Courses</option>
            <option>CS503</option>
            <option>CS501</option>
            <option>CS502</option>
          </select>
        </div>
      </div>

      {/* Submissions Feed + Performance Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold">Recent Submissions Feed</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
                Live Stream
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('assignment-marks')}
              className="text-xs font-bold text-[#006e2c] hover:underline cursor-pointer"
            >
              View All Submissions →
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredSubs.map((sub) => (
              <div key={sub.id} className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                <div className="sm:col-span-4">
                  <p className="font-bold text-slate-900 dark:text-white">{sub.assignmentTitle}</p>
                  <p className="text-[#006e2c] font-semibold mt-0.5">{sub.courseCode}</p>
                </div>
                <div className="sm:col-span-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#d0eb78] text-[#3d4d00] font-bold flex items-center justify-center shrink-0">
                    {sub.initials}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{sub.studentName}</p>
                    <p className="text-slate-500 font-mono text-[11px]">{sub.studentCode}</p>
                  </div>
                </div>
                <div className="sm:col-span-2 text-slate-500">{sub.submittedAt}</div>
                <div className="sm:col-span-2">
                  <span
                    className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap ${
                      sub.marks !== null
                        ? 'bg-emerald-100 text-[#006e2c]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sub.marks !== null ? sub.submissionState : 'Pending Review'}
                  </span>
                </div>
                <div className="sm:col-span-1 flex sm:justify-end">
                  <button
                    type="button"
                    onClick={() => onInspectSubmission(sub)}
                    aria-label="Inspect submission"
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">Performance Overview</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] text-xs font-bold">
                CS Dept
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#f3fae8] dark:bg-emerald-950/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600">Cohort Average Score</p>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-0.5">
                  44.2 <span className="text-sm font-medium text-slate-500">/ 50 (88.4%)</span>
                </p>
                <p className="text-xs text-[#006e2c] font-semibold mt-1">Top: Sophia Chen (49/50)</p>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-[#30b155] flex flex-col items-center justify-center text-[10px] font-extrabold text-[#006e2c]">
                <span>91.5%</span>
                <span className="text-[8px]">TURN-IN</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800">
                <span className="text-slate-500">EVALUATED</span>
                <p className="font-extrabold text-sm mt-0.5 tabular-nums">142 Tasks</p>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800">
                <span className="text-slate-500">ACCURACY INDEX</span>
                <p className="font-extrabold text-sm text-[#006e2c] mt-0.5">98.2% High</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Latest Faculty Notice</h3>
              <span className="text-xs font-bold text-[#006e2c]">Official</span>
            </div>
            {announcements[0] && (
              <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">{announcements[0].title}</p>
                <p className="text-slate-500 mt-1 line-clamp-2">{announcements[0].summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. FACULTY STUDENT ASSIGNMENTS & COURSEWORK HUB                            */
/* -------------------------------------------------------------------------- */
interface FacultyAssignmentsHubProps {
  assignments: AssignmentItem[];
  submissions: SubmissionRecord[];
  materials: StudyMaterialItem[];
  announcements: AnnouncementItem[];
  onCreateAssignment: (payload: {
    title: string;
    description: string;
    courseCode: string;
    courseTitle: string;
    targetSection: string;
    dueWindow: string;
    maxMarks: number;
  }) => Promise<void>;
  onUploadMaterial: (payload: {
    title: string;
    courseCode: string;
    courseName: string;
    fileType: StudyMaterialItem['fileType'];
  }) => Promise<void>;
  onCreateAnnouncement: (payload: { title: string; summary: string; category: AnnouncementItem['category'] }) => Promise<void>;
  onOpenMarksConsole: () => void;
}

export const FacultyAssignmentsHubView: React.FC<FacultyAssignmentsHubProps> = ({
  assignments,
  submissions,
  materials,
  announcements,
  onCreateAssignment,
  onUploadMaterial,
  onCreateAnnouncement,
  onOpenMarksConsole,
}) => {
  const [hubTab, setHubTab] = useState<'assignments' | 'submissions' | 'materials' | 'announcements'>('assignments');
  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState('All Courses');
  const [createOpen, setCreateOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [circularOpen, setCircularOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('CS503');
  const [courseTitle, setCourseTitle] = useState('Distributed Systems');
  const [targetSection, setTargetSection] = useState('CSE-A • Sem 7');
  const [dueWindow, setDueWindow] = useState('Nov 28, 11:59 PM');
  const [maxMarks, setMaxMarks] = useState(50);
  const [desc, setDesc] = useState('');

  const [matTitle, setMatTitle] = useState('');
  const [matCourse, setMatCourse] = useState('CS503');
  const [matType, setMatType] = useState<StudyMaterialItem['fileType']>('PDF Notes');

  const [annTitle, setAnnTitle] = useState('');
  const [annSummary, setAnnSummary] = useState('');

  const filteredAssignments = assignments.filter((a) => {
    const matchText = !searchText || a.title.toLowerCase().includes(searchText.toLowerCase());
    const matchCourse = courseFilter === 'All Courses' || a.courseCode === courseFilter;
    return matchText && matchCourse;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#30b155] text-white flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-extrabold">Student Assignments & Coursework Hub</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
                Faculty Portal
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] text-xs font-bold">
                Fall Semester 2024
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage student coursework, assess submissions, publish lecture slides, and broadcast academic circulars.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
          <button
            type="button"
            onClick={() => setMaterialOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#eef2ff] hover:bg-[#e2e7ff] text-slate-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#006e2c]" />
            <span>Upload Material</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Total Assignments</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">{23 + assignments.length} Tasks</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Active Assignments</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">{assignments.length} Live</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Pending Submissions</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">
            {submissions.filter((s) => s.marks === null).length + 40} Awaiting Review
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Completed Submissions</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">386 (94.2%)</p>
        </div>
      </div>

      {/* Hub Segmented Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-2">
        {(
          [
            { id: 'assignments', label: 'All Assignments & Management' },
            { id: 'submissions', label: `Student Submissions (${submissions.length})` },
            { id: 'materials', label: `Study Materials Hub (${materials.length})` },
            { id: 'announcements', label: `Faculty Announcements (${announcements.length})` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setHubTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hubTab === tab.id
                ? 'bg-[#30b155] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-[#f2f3ff] dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {hubTab === 'assignments' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search assignment title..."
              className="h-10 px-3.5 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs flex-1 min-w-[200px]"
            />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold"
            >
              <option>All Courses</option>
              <option>CS503</option>
              <option>CS501</option>
              <option>CS502</option>
              <option>CS-402</option>
            </select>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredAssignments.map((a) => (
              <div key={a.id} className="p-4 sm:px-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                <div className="md:col-span-5 flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#d0eb78] text-[#3d4d00] font-extrabold shrink-0">
                    {a.courseCode}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{a.title}</p>
                    <p className="text-slate-500 mt-0.5 line-clamp-1">{a.description}</p>
                  </div>
                </div>
                <div className="md:col-span-2 font-semibold text-slate-700 dark:text-slate-300">
                  {a.targetSection}
                </div>
                <div className="md:col-span-2">
                  <p className="font-bold tabular-nums">{a.submissionsRatio || '32 / 60'} ({a.submissionsPct || 53}%)</p>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 mt-1 overflow-hidden">
                    <div className="h-full bg-[#30b155] rounded-full" style={{ width: `${a.submissionsPct || 53}%` }} />
                  </div>
                </div>
                <div className="md:col-span-2 font-semibold text-slate-700 dark:text-slate-300">
                  {a.dueWindow}
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={onOpenMarksConsole}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-[#006e2c] font-bold hover:bg-emerald-100 cursor-pointer"
                  >
                    Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hubTab === 'submissions' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
          {submissions.map((sub) => (
            <div key={sub.id} className="p-4 flex items-center justify-between gap-4 text-xs">
              <div>
                <p className="font-bold text-sm">{sub.studentName} ({sub.studentCode})</p>
                <p className="text-slate-500">
                  {sub.courseCode} • {sub.assignmentTitle} • File: <span className="font-mono text-[#006e2c]">{sub.fileName}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenMarksConsole}
                className="px-3.5 py-2 rounded-xl bg-[#30b155] text-white font-bold cursor-pointer"
              >
                {sub.marks !== null ? `${sub.marks}/${sub.maxMarks}` : 'Enter Marks'}
              </button>
            </div>
          ))}
        </div>
      )}

      {hubTab === 'materials' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
          {materials.map((m) => (
            <div key={m.id} className="p-4 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-sm">{m.title}</p>
                <p className="text-slate-500">{m.courseCode} • {m.fileType} • {m.fileSize} • {m.updatedLabel}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#006e2c] font-bold">{m.badgeLabel}</span>
            </div>
          ))}
        </div>
      )}

      {hubTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCircularOpen(true)}
              className="px-4 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>Publish Faculty Circular</span>
            </button>
          </div>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
                <p className="font-bold text-sm">{a.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{a.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {createOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Publish New Assignment</h3>
              <button type="button" onClick={() => setCreateOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onCreateAssignment({
                  title,
                  description: desc,
                  courseCode,
                  courseTitle,
                  targetSection,
                  dueWindow,
                  maxMarks,
                });
                setTitle('');
                setDesc('');
                setCreateOpen(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-bold mb-1">Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Paxos Quorum Verification Lab"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Course Code</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Target Section</label>
                  <input
                    type="text"
                    value={targetSection}
                    onChange={(e) => setTargetSection(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Due Window</label>
                  <input
                    type="text"
                    value={dueWindow}
                    onChange={(e) => setDueWindow(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(Number(e.target.value))}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Deliverables & Instructions</label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe evaluation rubric and submission format..."
                  className="w-full p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setCreateOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer">
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Material Modal */}
      {materialOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Upload Course Study Material</h3>
              <button type="button" onClick={() => setMaterialOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onUploadMaterial({
                  title: matTitle,
                  courseCode: matCourse,
                  courseName: courseTitle,
                  fileType: matType,
                });
                setMatTitle('');
                setMaterialOpen(false);
              }}
              className="space-y-3.5"
            >
              <input
                type="text"
                value={matTitle}
                onChange={(e) => setMatTitle(e.target.value)}
                placeholder="Material title..."
                required
                className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={matCourse}
                  onChange={(e) => setMatCourse(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value as StudyMaterialItem['fileType'])}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                >
                  <option>PDF Notes</option>
                  <option>PPT Slides</option>
                  <option>Lab Code</option>
                  <option>Q-Banks</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer">
                Publish to Student Portals
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Circular Modal */}
      {circularOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Broadcast Academic Circular</h3>
              <button type="button" onClick={() => setCircularOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onCreateAnnouncement({ title: annTitle, summary: annSummary, category: 'ACADEMIC' });
                setAnnTitle('');
                setAnnSummary('');
                setCircularOpen(false);
              }}
              className="space-y-3.5"
            >
              <input
                type="text"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="Circular headline..."
                required
                className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
              />
              <textarea
                rows={3}
                value={annSummary}
                onChange={(e) => setAnnSummary(e.target.value)}
                placeholder="Notice details..."
                required
                className="w-full p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer">
                Broadcast Notice
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. FACULTY GRADING & MARKS CONSOLE VIEW                                    */
/* -------------------------------------------------------------------------- */
interface FacultyMarksConsoleProps {
  submissions: SubmissionRecord[];
  onSaveGrade: (id: string, marks: number | null, feedback: string) => Promise<void>;
  onPublishAll: () => Promise<void>;
}

export const FacultyMarksConsoleView: React.FC<FacultyMarksConsoleProps> = ({
  submissions,
  onSaveGrade,
  onPublishAll,
}) => {
  const [filterText, setFilterText] = useState('');
  const [tab, setTab] = useState<'all' | 'graded' | 'pending'>('all');
  const [publishedBanner, setPublishedBanner] = useState(false);

  const filtered = submissions.filter((s) => {
    const matchText =
      !filterText ||
      s.studentName.toLowerCase().includes(filterText.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(filterText.toLowerCase());
    const matchTab =
      tab === 'all' ? true : tab === 'graded' ? s.marks !== null : s.marks === null;
    return matchText && matchTab;
  });

  const gradedList = submissions.filter((s) => s.marks !== null);
  const topSubmission = [...gradedList].sort((a, b) => (b.marks ?? 0) - (a.marks ?? 0))[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Faculty Assignment Grading & Marks Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-xs font-bold">
              Active Session
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate student submissions, record marks, provide qualitative feedback, and publish results to student portals.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setPublishedBanner(true);
              setTimeout(() => setPublishedBanner(false), 2500);
            }}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#006e2c]" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={async () => {
              await onPublishAll();
              setPublishedBanner(true);
              setTimeout(() => setPublishedBanner(false), 2500);
            }}
            className="px-5 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{publishedBanner ? 'Marks Published!' : 'Publish Marks'}</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Students</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">60 <span className="text-xs font-normal text-slate-500">enrolled</span></p>
          <p className="text-xs text-[#006e2c] mt-1">Class CS-A • Section 1</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase">Course Tasks</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">8 <span className="text-xs font-normal text-slate-500">assignments</span></p>
          <p className="text-xs text-slate-500 mt-1">Task 4 in progress</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase">Marks Published</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">{50 + gradedList.length} / 60</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
            On Track
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase">Pending Submissions</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">
            {submissions.filter((s) => s.marks === null).length} <span className="text-xs font-normal text-slate-500">awaiting grade</span>
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
            Review queue
          </span>
        </div>
      </div>

      {/* Filter & Ledger */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold">Grading Ledger</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-xs font-bold text-slate-700">
                Showing {filtered.length} records
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter student by name or ID..."
                className="h-9 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs"
              />
              {(['all', 'graded', 'pending'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize cursor-pointer ${
                    tab === t ? 'bg-[#30b155] text-white' : 'bg-[#f2f3ff] text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((sub) => (
              <div key={sub.id} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                <div className="md:col-span-3 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-[#006e2c] font-bold flex items-center justify-center shrink-0">
                    {sub.initials}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{sub.studentName}</p>
                    <p className="text-[11px] font-mono text-slate-500">{sub.studentCode}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] font-bold">
                    {sub.submissionState}
                  </span>
                  <p className="font-mono text-[11px] text-[#006e2c] mt-1 truncate">{sub.fileName}</p>
                </div>
                <div className="md:col-span-2 flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    max={sub.maxMarks}
                    defaultValue={sub.marks ?? ''}
                    placeholder="--"
                    onBlur={(e) => {
                      const val = e.target.value === '' ? null : Number(e.target.value);
                      void onSaveGrade(sub.id, val, sub.feedback);
                    }}
                    className="w-16 h-9 px-2 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 font-extrabold text-center tabular-nums focus:outline-none focus:ring-2 focus:ring-[#30b155]"
                  />
                  <span className="text-slate-500 font-semibold">/ {sub.maxMarks}</span>
                </div>
                <div className="md:col-span-3">
                  <input
                    type="text"
                    defaultValue={sub.feedback}
                    placeholder="Add feedback note..."
                    onBlur={(e) => void onSaveGrade(sub.id, sub.marks, e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#30b155]"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <span
                    className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap ${
                      sub.marks !== null
                        ? 'bg-emerald-100 text-[#006e2c]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sub.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold">Performance Analytics</h3>
          {topSubmission && (
            <div className="p-4 rounded-xl bg-[#f3fae8] dark:bg-emerald-950/30 space-y-1">
              <span className="text-[11px] font-bold uppercase text-[#006e2c]">Highest Score</span>
              <p className="text-2xl font-extrabold tabular-nums">
                {topSubmission.marks} / {topSubmission.maxMarks}
              </p>
              <p className="text-xs font-bold text-[#006e2c]">
                {topSubmission.studentName} ({topSubmission.grade})
              </p>
            </div>
          )}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-semibold">
              <span>A+ Grade (90–100%)</span>
              <span className="tabular-nums font-bold text-[#006e2c]">
                {gradedList.filter((s) => (s.marks ?? 0) >= 45).length} students
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>A Grade (80–89%)</span>
              <span className="tabular-nums font-bold">
                {gradedList.filter((s) => (s.marks ?? 0) >= 40 && (s.marks ?? 0) < 45).length} students
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Pending Evaluation</span>
              <span className="tabular-nums font-bold text-amber-700">
                {submissions.filter((s) => s.marks === null).length} students
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
