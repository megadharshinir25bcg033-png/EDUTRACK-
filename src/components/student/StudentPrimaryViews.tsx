import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileCheck2,
  FileText,
  Filter,
  Search,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import {
  AssignmentItem,
  AttendanceRecord,
  CalendarEvent,
  CourseEligibility,
  LeaveRequest,
  TimetableSlot,
} from '../../types/edutrack.ts';
import { NavTab } from '../PortalShell.tsx';

interface StudentDashboardProps {
  assignments: AssignmentItem[];
  calendarEvents: CalendarEvent[];
  onNavigate: (tab: NavTab, aiPrompt?: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardProps> = ({
  assignments,
  calendarEvents,
  onNavigate,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(18);

  const submittedCount = assignments.filter((a) => a.status === 'Submitted' || a.status === 'Graded').length;
  const pendingCount = assignments.filter((a) => a.status === 'Pending' || a.status === 'In Progress' || a.status === 'Critical').length;

  const daysInNov = Array.from({ length: 30 }, (_, i) => i + 1);
  const leadingBlanks = Array.from({ length: 5 }, (_, i) => 27 + i); // Oct 27-31 for Nov 1 Fri start

  const dayEventsMap = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    for (const ev of calendarEvents) {
      if (!map[ev.day]) map[ev.day] = [];
      map[ev.day].push(ev);
    }
    return map;
  }, [calendarEvents]);

  const upcomingEvents = calendarEvents.filter((e) => e.day >= 18).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Good Morning, Alex!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Academic Year 2024–2025 • Fall Semester • Active Track
          </p>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('assignments')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-[#30b155]/60 transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Assignments</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#006e2c] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {24 + Math.max(0, assignments.length - 5)}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
              +2 this wk
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 6 Subjects</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-4/5 bg-[#30b155] rounded-full" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('assignments')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-[#30b155]/60 transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Pending Deadlines</span>
            <div className="w-9 h-9 rounded-xl bg-[#f1f8d6] text-[#516600] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              0{pendingCount}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
              Action req.
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Due next 72 hrs</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-2/5 bg-[#6f5c36] rounded-full" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('results')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-[#30b155]/60 transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Submitted & Evaluated</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#006e2c] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {19 + submittedCount}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold tabular-nums">
              87.5%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">On-time completion</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-[88%] bg-[#30b155] rounded-full" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('attendance')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-[#30b155]/60 transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Overall Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-[#f1f8d6] text-[#006e2c] flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-3xl font-extrabold text-[#006e2c] dark:text-emerald-400 tabular-nums">
              92.4%
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
              Safe
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Safe Zone (Min 75%)</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-[92%] bg-[#30b155] rounded-full" />
          </div>
        </div>
      </div>

      {/* AI Academic Assistant Banner */}
      <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#8de57c] via-[#a9e486] to-[#cbe87b] text-slate-900 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/90 text-[#006e2c] flex items-center justify-center shrink-0 shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg font-extrabold text-slate-900">AI Academic Assistant</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[#006e2c] text-xs font-bold">
                GPT-Edu Active
              </span>
            </div>
            <p className="text-sm text-slate-800 mt-1 leading-relaxed">
              <strong>Recommendation:</strong> Based on your <strong>Machine Learning Quiz (Nov 18)</strong>, prep
              readiness is <strong>78%</strong>. Review <strong>Module 3 Gradient Descent & Loss Functions</strong>.
            </p>
            <div className="flex items-center gap-2 flex-wrap mt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mr-1">Try:</span>
              {[
                { label: 'Summarize Ch.4', prompt: 'Summarize Chapter 4 Gradient Descent and Backpropagation from CS-402.' },
                { label: 'Draft Lab Report', prompt: 'Help me structure the NumPy Backpropagation lab report for CS-402.' },
                { label: 'Practice Quiz', prompt: 'Generate 3 practice MCQs on Loss Functions and Adam Optimizer.' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => onNavigate('ai-assistant', chip.prompt)}
                  className="px-3 py-1 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('ai-assistant')}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 text-sm font-bold flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Ask AI Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-slate-800/80">Synced with 6 courses</span>
        </div>
      </div>

      {/* Calendar & Upcoming Events Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Mini Calendar */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#006e2c] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">November 2024</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
                    Fall Sem
                  </span>
                </div>
                <p className="text-xs text-slate-500">Term Week 11 • {calendarEvents.length} Events Scheduled</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedDay(18)}
                className="px-3 py-1.5 rounded-xl bg-[#eef2ff] text-slate-700 text-xs font-bold hover:bg-[#e2e7ff] cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => onNavigate('calendar')}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                aria-label="Open full calendar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {leadingBlanks.map((d) => (
              <div key={`prev-${d}`} className="py-2.5 text-sm text-slate-300 dark:text-slate-600 tabular-nums">
                {d}
              </div>
            ))}
            {daysInNov.map((day) => {
              const evs = dayEventsMap[day] || [];
              const isSelected = selectedDay === day;
              const isHoliday = evs.some((e) => e.category === 'holiday');
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`relative py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer tabular-nums flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-[#30b155] text-white shadow-md'
                      : isHoliday
                      ? 'bg-[#fbdfaf]/45 text-[#564421] hover:bg-[#fbdfaf]/70'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span>{day}</span>
                  {evs.length > 0 && (
                    <span className="flex items-center gap-0.5 mt-0.5">
                      {evs.slice(0, 2).map((e) => (
                        <span
                          key={e.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected
                              ? 'bg-white'
                              : e.category === 'exam'
                              ? 'bg-[#30b155]'
                              : e.category === 'deadline'
                              ? 'bg-amber-500'
                              : 'bg-lime-600'
                          }`}
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 flex-wrap text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Legend:</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#30b155]" /> Exams & Quizzes
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Deadlines
            </span>
            <span className="inline-flex items-center gap-1.5 text-lime-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-lime-600" /> Workshops
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#6f5c36] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#b0986d]" /> Holidays
            </span>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upcoming Events</h3>
              <p className="text-xs text-slate-500">Selected Date: November {selectedDay}, 2024</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="text-xs font-bold text-[#006e2c] hover:underline cursor-pointer"
            >
              Full Calendar
            </button>
          </div>

          <div className="space-y-3">
            {(dayEventsMap[selectedDay]?.length ? dayEventsMap[selectedDay] : upcomingEvents).map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#30b155] text-white text-[10px] font-bold uppercase">
                    {ev.category === 'exam' ? 'Internal Exam' : ev.category === 'deadline' ? 'Assignment Deadline' : 'Workshop & Talk'}
                  </span>
                  <span className="text-xs font-bold text-[#006e2c] tabular-nums">{ev.courseCode}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{ev.title}</p>
                <p className="text-xs text-slate-500">
                  {ev.dateLabel} • {ev.timeRange} • {ev.location}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('timetable')}
            className="w-full py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            View Weekly Timetable & Sync iCal
          </button>
        </div>
      </div>
    </div>
  );
};

interface StudentAssignmentsProps {
  assignments: AssignmentItem[];
  searchQuery: string;
  onSubmitAssignment: (id: string, fileName: string, notes: string) => Promise<void>;
  onRequestExtension: (id: string) => Promise<void>;
  onOpenAi: (prompt?: string) => void;
}

export const StudentAssignmentsView: React.FC<StudentAssignmentsProps> = ({
  assignments,
  searchQuery,
  onSubmitAssignment,
  onRequestExtension,
  onOpenAi,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedId, setSelectedId] = useState<string>(assignments[0]?.id ?? '');
  const [fileName, setFileName] = useState('neural_backprop_v3.ipynb');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const query = (localSearch || searchQuery).toLowerCase();
  const subjects = ['All Subjects', ...Array.from(new Set(assignments.map((a) => a.courseCode)))];

  const filtered = assignments.filter((a) => {
    const matchesSearch =
      !query ||
      a.title.toLowerCase().includes(query) ||
      a.code.toLowerCase().includes(query) ||
      a.courseCode.toLowerCase().includes(query);
    const matchesSubject = subjectFilter === 'All Subjects' || a.courseCode === subjectFilter;
    const matchesStatus = statusFilter === 'All Statuses' || a.status === statusFilter;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const focused = filtered.find((a) => a.id === selectedId) || filtered[0] || assignments[0];

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!focused) return;
    setSubmitting(true);
    try {
      await onSubmitAssignment(focused.id, fileName, notes);
      setNotes('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          My Assignments
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Academic Year 2024–2025 • Fall Semester • Active Track
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Assigned</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">{24 + Math.max(0, assignments.length - 5)}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
              +2 this wk
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 5 active modules • 85% pace</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Pending Action</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">
              0{assignments.filter((a) => a.status === 'Pending' || a.status === 'In Progress').length}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
              Action required
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Due within next 7 days</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Submitted & Graded</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">
              {16 + assignments.filter((a) => a.status === 'Submitted' || a.status === 'Graded').length}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
              Avg: 91.5%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">16 scored A or A+ • Top 5%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Critical / Extension</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">
              0{assignments.filter((a) => a.isCritical || a.status === 'Extended').length}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">
              Needs Request
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">1 grace period active • Policy 48h</p>
        </div>
      </div>

      {/* Copilot Strip */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#e5f8dd] to-[#d9f3c7] border border-emerald-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#006e2c] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-900">EduTrack AI Copilot</span>
              <span className="px-2 py-0.5 rounded-full bg-[#30b155] text-white text-[11px] font-bold">
                GPT-Edu v4.5 Active
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-0.5">
              Insight: {focused ? `${focused.title} (${focused.courseCode})` : 'All coursework synced'}.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onOpenAi(`Review my structure and plagiarism checklist for ${focused?.title}`)}
            className="px-3 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 cursor-pointer"
          >
            Plagiarism Check
          </button>
          <button
            type="button"
            onClick={() => onOpenAi(`Format IEEE citations for ${focused?.courseCode}`)}
            className="px-3 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 cursor-pointer"
          >
            Format Citations
          </button>
          <button
            type="button"
            onClick={() => onOpenAi(`Give me 3 practice questions for ${focused?.title}`)}
            className="px-3 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 cursor-pointer"
          >
            Practice Qs
          </button>
          <button
            type="button"
            onClick={() => onOpenAi()}
            className="px-4 py-2 rounded-xl bg-[#006e2c] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Copilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by title, code or professor..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#30b155]"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm font-medium focus:outline-none"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm font-medium focus:outline-none"
        >
          {['All Statuses', 'In Progress', 'Pending', 'Submitted', 'Graded', 'Extended'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Active Assignments Table + Focused Submission Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Assignments</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600">
                {filtered.length} Shown
              </span>
            </div>
            <span className="text-xs font-semibold text-[#006e2c]">Synced with Supabase LMS</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((item) => {
              const isSelected = focused?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-4 sm:px-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="md:col-span-5">
                    <span className="text-xs font-bold text-[#006e2c] font-mono">{item.code}</span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="md:col-span-3 text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {item.courseCode} {item.courseTitle}
                    </p>
                    <p className="text-slate-500 mt-0.5">{item.facultyName}</p>
                  </div>
                  <div className="md:col-span-2 text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{item.dueWindow}</p>
                    <p className="text-[#006e2c] font-medium mt-0.5">{item.timeLeft}</p>
                  </div>
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                        item.status === 'Submitted' || item.status === 'Graded'
                          ? 'bg-emerald-100 text-[#006e2c]'
                          : item.status === 'In Progress'
                          ? 'bg-[#d0eb78] text-[#3d4d00]'
                          : item.status === 'Extended'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-[#eef2ff] text-slate-700'
                      }`}
                    >
                      {item.status === 'In Progress' ? `In Progress (${item.progress}%)` : item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focused Submission & Review Card */}
        {focused && (
          <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#006e2c]">
                Focused Submission
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                Submission & Review
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 space-y-1">
              <span className="text-xs font-bold text-[#006e2c] font-mono">{focused.code}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{focused.title}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Due: {focused.dueWindow} • Max {focused.maxMarks} pts
              </p>
            </div>

            {focused.submittedFile && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                <p className="font-bold text-[#006e2c]">Uploaded: {focused.submittedFile}</p>
                <p className="text-slate-500">Submitted {focused.submittedAt}</p>
                {focused.marksObtained !== undefined && (
                  <p className="font-bold text-slate-900 dark:text-white pt-1">
                    Score: {focused.marksObtained}/{focused.maxMarks} ({focused.grade})
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deliverable Filename / Commit
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                    className="flex-1 h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#30b155]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional verification notes for faculty..."
                  className="w-full p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#30b155]"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Upload className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : focused.status === 'Submitted' ? 'Resubmit Deliverable' : 'Submit Assignment'}</span>
              </button>
            </form>

            <button
              type="button"
              onClick={() => onRequestExtension(focused.id)}
              className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Request 48h Grace Extension
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface StudentAttendanceProps {
  records: AttendanceRecord[];
  eligibility: CourseEligibility[];
  leaveRequests: LeaveRequest[];
  onSubmitLeave: (payload: { leaveType: string; fromDate: string; toDate: string; reason: string }) => Promise<void>;
}

export const StudentAttendanceView: React.FC<StudentAttendanceProps> = ({
  records,
  eligibility,
  leaveRequests,
  onSubmitLeave,
}) => {
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('Medical Waiver');
  const [fromDate, setFromDate] = useState('2024-11-15');
  const [toDate, setToDate] = useState('2024-11-15');
  const [reason, setReason] = useState('');
  const [exportMsg, setExportMsg] = useState(false);

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitLeave({ leaveType, fromDate, toDate, reason });
    setReason('');
    setLeaveModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Attendance Overview
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Academic Year 2024–2025 • Fall Semester • Active Track
        </p>
      </div>

      {/* Ledger Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#006e2c] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Student Attendance Ledger
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
                Biometric Synced (09:42 AM)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Academic Year 2024–2025 • Fall Semester • RFID Sensor Station #04
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-3.5 py-2 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
            Requirement: Min 75%
          </span>
          <button
            type="button"
            onClick={() => setLeaveModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#eef2ff] hover:bg-[#e2e7ff] text-slate-900 text-xs font-bold cursor-pointer"
          >
            Request Leave / OD
          </button>
          <button
            type="button"
            onClick={() => {
              setExportMsg(true);
              setTimeout(() => setExportMsg(false), 2500);
            }}
            className="px-4 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exportMsg ? 'Exported PDF' : 'Export Report (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Overall Attendance</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">88.4%</span>
            <span className="text-xs font-bold text-[#006e2c]">+2.1%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Safe Zone (&gt; 75% Target)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Present Sessions</span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">76</span>
            <span className="text-sm text-slate-500">/ 86 Conducted</span>
          </div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
            88.4% Regularity
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Absent Count</span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-3xl font-extrabold text-red-600 tabular-nums">06</span>
            <span className="text-sm text-slate-500">Sessions</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">3 Excused • 3 Unexcused</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Authorized Leaves / OD</span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">
              0{4 + leaveRequests.length - 1}
            </span>
            <span className="text-sm text-slate-500">Days Credited</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Hackathon (2d) + Med (2d)</p>
        </div>
      </div>

      {/* AI Attendance Alert */}
      <div className="rounded-2xl p-4 sm:p-5 bg-[#eff7e6] dark:bg-emerald-950/30 border border-emerald-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#30b155] text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                EduTrack AI Attendance Alert
              </span>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">
                Action Required: CS-405
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
              Cloud Systems stands at <strong className="text-red-600">71.4%</strong> (threshold: 75%). Attending the
              next <strong>3 consecutive sessions</strong> elevates score to <strong className="text-[#006e2c]">76.8%</strong>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setLeaveType('Medical Waiver');
              setLeaveModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold border border-slate-200 cursor-pointer"
          >
            Medical Waiver
          </button>
          <button
            type="button"
            onClick={() => setRecoveryOpen(!recoveryOpen)}
            className="px-4 py-2 rounded-xl bg-[#006e2c] text-white text-xs font-bold cursor-pointer"
          >
            {recoveryOpen ? 'Hide Recovery Plan' : 'View Recovery Plan'}
          </button>
        </div>
      </div>

      {recoveryOpen && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 text-sm space-y-2">
          <p className="font-bold text-[#006e2c]">CS-405 Cloud Systems Recovery Schedule</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Attend Nov 20 (Wed 10:45 AM), Nov 22 (Fri 09:00 AM), and Nov 25 (Mon 10:45 AM) in Room 102 to raise your
            attendance from 15/21 (71.4%) to 18/24 (75.0%+). Submitting a Medical Waiver for Nov 15 immediately
            restores eligibility to 76.2%.
          </p>
        </div>
      )}

      {/* Calendar + Course Eligibility */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-base font-bold">November 2024</h3>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#006e2c]" /> Present</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600" /> Absent</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-600" /> Leave/OD</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold">
            {[28, 29, 30, 31].map((d) => (
              <div key={`p-${d}`} className="py-2 text-slate-300">{d}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const rec = records.find((r) => r.dayNum === day);
              const isAbsent = rec?.status.startsWith('Absent');
              const isLeave = rec?.status === 'Leave/OD';
              const isPresent = rec?.status === 'Present';
              return (
                <div
                  key={day}
                  className={`py-2 rounded-lg tabular-nums flex items-center justify-center gap-1 ${
                    day === 16
                      ? 'bg-[#006e2c] text-white'
                      : isAbsent
                      ? 'bg-red-50 text-red-700'
                      : isLeave
                      ? 'bg-amber-50 text-amber-800'
                      : isPresent
                      ? 'bg-emerald-50 text-[#006e2c]'
                      : 'bg-[#f2f3ff]/60 text-slate-600'
                  }`}
                >
                  <span>{day}</span>
                  {(isPresent || isAbsent || isLeave) && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        day === 16
                          ? 'bg-white'
                          : isAbsent
                          ? 'bg-red-600'
                          : isLeave
                          ? 'bg-amber-600'
                          : 'bg-[#006e2c]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Course Eligibility Tracker</h3>
            <p className="text-xs text-slate-500">Threshold: 75% for End-Term Examinations</p>
          </div>
          <div className="space-y-4">
            {eligibility.map((c) => {
              const below = c.percentage < 75;
              return (
                <div key={c.courseCode} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {c.courseCode} {c.courseTitle}
                    </span>
                    <span className={`font-bold tabular-nums ${below ? 'text-red-600' : 'text-[#006e2c]'}`}>
                      {c.percentage.toFixed(1)}% ({c.attended}/{c.total})
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${below ? 'bg-red-600' : 'bg-[#30b155]'}`}
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Class Attendance Logs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold">Recent Class Attendance Logs</h3>
          <span className="text-xs font-semibold text-slate-500">{records.length} Sessions Recorded</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {records.slice(0, 6).map((rec) => (
            <div key={rec.id} className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs">
              <div className="sm:col-span-3">
                <p className="font-bold text-slate-900 dark:text-white">{rec.sessionDate}</p>
                <p className="text-slate-500 tabular-nums">{rec.timeSlot}</p>
              </div>
              <div className="sm:col-span-4">
                <p className="font-bold text-slate-900 dark:text-white">{rec.courseTitle}</p>
                <p className="text-slate-500">{rec.courseCode} • {rec.room}</p>
              </div>
              <div className="sm:col-span-3 font-medium text-slate-700 dark:text-slate-300">
                {rec.facultyName}
              </div>
              <div className="sm:col-span-2 flex sm:justify-end">
                <span
                  className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap ${
                    rec.status === 'Present'
                      ? 'bg-emerald-100 text-[#006e2c]'
                      : rec.status === 'Leave/OD'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {rec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave / OD Request Modal */}
      {leaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Request Leave / On-Duty (OD)</h3>
              <button type="button" onClick={() => setLeaveModalOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleLeaveSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                >
                  <option>Medical Waiver</option>
                  <option>On-Duty (Hackathon / Symposium)</option>
                  <option>Academic Research Travel</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Justification / Supporting Note</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe medical certificate or event participation..."
                  required
                  className="w-full p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLeaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface StudentTimetableProps {
  slots: TimetableSlot[];
}

export const StudentTimetableView: React.FC<StudentTimetableProps> = ({ slots }) => {
  const days: TimetableSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState<TimetableSlot['day']>('Wednesday');
  const [synced, setSynced] = useState(false);

  const todayTimeline = slots.filter((s) => s.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#006e2c] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">My Timetable</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
                Sem 5 • Fall 2024
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] text-xs font-bold">
                Sync Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              B.Tech Computer Science & Artificial Intelligence • Section B • Academic Year 2024–25
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold">
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>Week 12 (Nov 18 – Nov 23, 2024)</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <button
            type="button"
            onClick={() => setSelectedDay('Wednesday')}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 text-[#006e2c] text-xs font-bold cursor-pointer"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              setSynced(true);
              setTimeout(() => setSynced(false), 2500);
            }}
            className="px-4 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer"
          >
            {synced ? 'Calendar Synced' : 'Sync Calendar'}
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Classes This Week</span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xl font-extrabold tabular-nums">24 Sessions</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-[#006e2c] text-[11px] font-bold">
              100% On Plan
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Today’s Load ({selectedDay.slice(0, 3)})</span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xl font-extrabold">4 Lectures + 1 Lab</span>
            <span className="px-2 py-0.5 rounded-lg bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
              In Progress
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Free Academic Slots</span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xl font-extrabold tabular-nums">6 Slots • 9.0 hrs</span>
            <span className="px-2 py-0.5 rounded-lg bg-[#fbdfaf]/60 text-[#564421] text-[11px] font-bold">
              Optimal Load
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Next Upcoming Class</span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-base font-extrabold truncate">CS-402 Deep Learning</span>
            <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-700 text-[11px] font-bold shrink-0">
              In 25m
            </span>
          </div>
        </div>
      </div>

      {/* Matrix + Today's Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-9 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold">Interactive Weekly Matrix</h2>
              <p className="text-xs text-slate-500">Select any day column to inspect session timeline</p>
            </div>
          </div>

          <div className="min-w-[780px] space-y-3">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2.5 text-center">
              <div className="py-2.5 rounded-xl bg-[#f2f3ff] text-xs font-bold text-slate-500">TIME</div>
              {days.map((day, idx) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    selectedDay === day
                      ? 'bg-emerald-50 text-[#006e2c] ring-2 ring-[#30b155]'
                      : 'bg-[#f2f3ff] text-slate-700 hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div>{day}</div>
                  <div className="text-[11px] font-medium text-slate-500">Nov {18 + idx}</div>
                </button>
              ))}
            </div>

            {/* Slot 1 & Slot 2 */}
            {[1, 2].map((slotNum) => (
              <div key={slotNum} className="grid grid-cols-7 gap-2.5 items-stretch">
                <div className="p-3 rounded-xl bg-[#f2f3ff]/70 flex flex-col justify-center text-center">
                  <span className="text-[11px] font-extrabold text-slate-700">SLOT 0{slotNum}</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 tabular-nums">
                    {slotNum === 1 ? '09:00 AM' : '10:45 AM'}
                  </span>
                  <span className="text-[11px] text-slate-500 tabular-nums">
                    {slotNum === 1 ? '10:30 AM' : '12:15 PM'}
                  </span>
                </div>
                {days.map((day) => {
                  const s = slots.find((item) => item.day === day && item.slotNumber === slotNum);
                  if (!s) return <div key={day} />;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedDay(day)}
                      className={`p-3 rounded-xl border text-xs flex flex-col justify-between cursor-pointer transition-all ${
                        s.isLive
                          ? 'bg-emerald-50 border-[#30b155] ring-2 ring-[#30b155]/30'
                          : s.sessionType === 'FREE'
                          ? 'bg-slate-50 border-slate-200/70 text-slate-500'
                          : 'bg-[#f5faef] border-emerald-200/70 hover:border-[#30b155]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-[#006e2c] truncate">{s.courseCode}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            s.isLive
                              ? 'bg-[#30b155] text-white'
                              : s.isCompleted
                              ? 'bg-emerald-200/80 text-[#003c15]'
                              : 'bg-white text-slate-600'
                          }`}
                        >
                          {s.isLive ? 'LIVE NOW' : s.sessionType}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 mt-1.5 leading-snug">{s.courseTitle}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{s.facultyName}</p>
                      <div className="flex items-center justify-between mt-2 text-[11px]">
                        <span className="text-slate-600">{s.room}</span>
                        <span className="font-bold text-[#006e2c]">{s.statusLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Lunch Break */}
            <div className="py-2.5 px-4 rounded-xl bg-[#faf8f0] border border-amber-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Campus Lunch Break & Recess</span>
              <span className="tabular-nums">12:15 PM – 01:15 PM (60 min)</span>
              <span className="text-[#006e2c] font-bold">Cafeteria Hub Active</span>
            </div>

            {/* Slot 3 */}
            <div className="grid grid-cols-7 gap-2.5 items-stretch">
              <div className="p-3 rounded-xl bg-[#f2f3ff]/70 flex flex-col justify-center text-center">
                <span className="text-[11px] font-extrabold text-slate-700">SLOT 03</span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 tabular-nums">01:15 PM</span>
                <span className="text-[11px] text-slate-500 tabular-nums">02:45 PM</span>
              </div>
              {days.map((day) => {
                const s = slots.find((item) => item.day === day && item.slotNumber === 3);
                if (!s) return <div key={day} />;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedDay(day)}
                    className="p-3 rounded-xl bg-[#f7faf2] border border-emerald-200/70 text-xs flex flex-col justify-between cursor-pointer hover:border-[#30b155]"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[#006e2c] truncate">{s.courseCode}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold text-slate-600">
                        {s.sessionType}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 mt-1.5 leading-snug">{s.courseTitle}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.facultyName}</p>
                    <div className="flex items-center justify-between mt-2 text-[11px]">
                      <span className="text-slate-600">{s.room}</span>
                      <span className="font-bold text-[#006e2c]">{s.statusLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Today's Timeline */}
        <div className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold">{selectedDay} Timeline</h3>
              <p className="text-xs text-slate-500">{todayTimeline.length} Scheduled Slots</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
              Active
            </span>
          </div>
          <div className="space-y-3">
            {todayTimeline.map((slot) => (
              <div
                key={slot.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  slot.isLive
                    ? 'bg-emerald-50 border-[#30b155]'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#006e2c]">{slot.courseCode}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{slot.statusLabel}</span>
                </div>
                <p className="font-bold text-slate-900 dark:text-white">{slot.courseTitle}</p>
                <p className="text-slate-500 tabular-nums">{slot.timeLabel} • {slot.room}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
