import React, { useState } from 'react';
import {
  Award,
  Bell,
  Bookmark,
  BookOpen,
  Bot,
  Calendar,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Megaphone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import {
  AiStudyThread,
  AnnouncementItem,
  CalendarEvent,
  ExamResultItem,
  StudyMaterialItem,
} from '../../types/edutrack.ts';

/* -------------------------------------------------------------------------- */
/* 1. ACADEMIC CALENDAR VIEW                                                  */
/* -------------------------------------------------------------------------- */
interface StudentCalendarProps {
  events: CalendarEvent[];
}

export const StudentCalendarView: React.FC<StudentCalendarProps> = ({ events }) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([
    'academic',
    'deadline',
    'holiday',
    'exam',
    'workshop',
  ]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(events[7] || events[0] || null);
  const [synced, setSynced] = useState(false);

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const visibleEvents = events.filter((e) => activeCategories.includes(e.category));
  const exams = events.filter((e) => e.category === 'exam');
  const deadlines = events.filter((e) => e.category === 'deadline');

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#30b155] text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-extrabold">Academic Calendar</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-xs font-bold">
                  Sem 5 • Fall 2024
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-slate-700 text-xs font-bold">
                  AY 2024–25
                </span>
              </div>
              <p className="text-xs text-[#006e2c] font-semibold mt-0.5">
                AI Synced & Schedule Optimized
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-2 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold">
              November 2024
            </span>
            <button
              type="button"
              onClick={() => {
                setSynced(true);
                setTimeout(() => setSynced(false), 2000);
              }}
              className="px-4 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer"
            >
              {synced ? 'Synced!' : 'Sync'}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-semibold mr-1">Categories:</span>
          {[
            { id: 'academic', label: 'Academic Events', color: 'bg-emerald-100 text-[#006e2c]' },
            { id: 'deadline', label: 'Assignments', color: 'bg-teal-100 text-teal-800' },
            { id: 'holiday', label: 'Holidays', color: 'bg-lime-100 text-lime-800' },
            { id: 'exam', label: 'Examinations', color: 'bg-amber-100 text-amber-800' },
          ].map((cat) => {
            const active = activeCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`px-3 py-1 rounded-full font-bold transition-opacity cursor-pointer ${cat.color} ${
                  active ? 'opacity-100 ring-1 ring-current/30' : 'opacity-40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 7-column Grid */}
        <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-500 border-b border-slate-100 pb-2">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {[28, 29, 30, 31].map((d) => (
            <div key={`p-${d}`} className="min-h-[82px] p-2 rounded-xl bg-slate-50/50 text-xs text-slate-300">
              {d}
            </div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const dayEvs = visibleEvents.filter((e) => e.day === day);
            const isToday = day === 20;
            return (
              <div
                key={day}
                className={`min-h-[82px] p-2 rounded-xl border flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-emerald-50/70 border-[#30b155] ring-1 ring-[#30b155]'
                    : 'bg-[#fafbff] dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold tabular-nums ${isToday ? 'text-[#006e2c]' : 'text-slate-800 dark:text-slate-200'}`}>
                    {day}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-extrabold text-[#006e2c] uppercase">Today</span>
                  )}
                </div>
                <div className="space-y-1 mt-1">
                  {dayEvs.map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setSelectedEvent(ev)}
                      className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-bold truncate cursor-pointer ${
                        ev.category === 'exam'
                          ? 'bg-amber-100 text-amber-900'
                          : ev.category === 'deadline'
                          ? 'bg-emerald-100 text-[#006e2c]'
                          : ev.category === 'holiday'
                          ? 'bg-lime-100 text-lime-900'
                          : 'bg-[#e2e7ff] text-slate-800'
                      }`}
                    >
                      {ev.shortLabel}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column */}
      <div className="xl:col-span-4 space-y-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Upcoming Examinations</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              {exams.length} Scheduled
            </span>
          </div>
          {exams.slice(0, 3).map((ex) => (
            <div key={ex.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{ex.title}</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-bold">
                  {ex.courseCode}
                </span>
              </div>
              <p className="text-xs text-[#006e2c] font-semibold">
                {ex.dateLabel} • {ex.timeRange} • {ex.location}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Assignment Deadlines</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-xs font-bold">
              Urgent
            </span>
          </div>
          {deadlines.map((d) => (
            <div key={d.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-0.5">
              <p className="font-bold text-slate-900 dark:text-white">{d.title}</p>
              <p className="text-slate-500">{d.dateLabel} • {d.timeRange}</p>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="bg-emerald-50/80 dark:bg-emerald-950/30 rounded-2xl p-5 border border-emerald-200 space-y-1.5">
            <span className="text-[11px] font-bold uppercase text-[#006e2c]">Selected Event Detail</span>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedEvent.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">{selectedEvent.description}</p>
            <p className="text-xs font-bold text-[#006e2c] pt-1">
              {selectedEvent.dateLabel} • {selectedEvent.timeRange} • {selectedEvent.location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. ANNOUNCEMENTS & NOTICES VIEW                                            */
/* -------------------------------------------------------------------------- */
interface StudentAnnouncementsProps {
  announcements: AnnouncementItem[];
  onToggleRead: (id: string) => Promise<void>;
  onToggleBookmark: (id: string) => Promise<void>;
  onMarkAllRead: () => Promise<void>;
  onNavigateResults: () => void;
}

export const StudentAnnouncementsView: React.FC<StudentAnnouncementsProps> = ({
  announcements,
  onToggleRead,
  onToggleBookmark,
  onMarkAllRead,
  onNavigateResults,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'IMPORTANT NOTICE' | 'ACADEMIC' | 'EXAMINATION' | 'EVENTS & WORKSHOP'>('ALL');
  const [openCircular, setOpenCircular] = useState<AnnouncementItem | null>(null);

  const filtered = announcements.filter((a) => {
    if (filter === 'ALL') return true;
    if (filter === 'UNREAD') return !a.isRead;
    return a.category === filter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Announcements & Notices
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Academic Year 2024–2025 • Official Campus Feed & Department Bulletins
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Notices</p>
            <p className="text-2xl font-extrabold tabular-nums mt-0.5">{44 + announcements.length}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">+4 today</span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">High Priority</p>
            <p className="text-2xl font-extrabold tabular-nums mt-0.5">0{announcements.filter((a) => a.isUrgent).length}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Urgent Action</span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Unread Circulars</p>
            <p className="text-2xl font-extrabold text-[#006e2c] tabular-nums mt-0.5">
              0{announcements.filter((a) => !a.isRead).length}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#006e2c] text-white text-xs font-bold">New</span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Upcoming Events</p>
            <p className="text-2xl font-extrabold tabular-nums mt-0.5">06</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#eef2ff] text-slate-700 text-xs font-bold">This Month</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {(
            [
              { id: 'ALL', label: `All (${announcements.length})` },
              { id: 'UNREAD', label: `Unread (${announcements.filter((a) => !a.isRead).length})` },
              { id: 'IMPORTANT NOTICE', label: 'Important' },
              { id: 'ACADEMIC', label: 'Academic' },
              { id: 'EXAMINATION', label: 'Examination' },
              { id: 'EVENTS & WORKSHOP', label: 'Events' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#30b155] text-white'
                  : 'bg-[#f2f3ff] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#e2e7ff]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="px-3.5 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 text-[#006e2c]" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Feed + Urgent Deadline */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 space-y-4">
          {filtered.map((ann) => (
            <div
              key={ann.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      ann.category === 'IMPORTANT NOTICE'
                        ? 'bg-red-100 text-red-700'
                        : ann.category === 'ACADEMIC'
                        ? 'bg-[#d0eb78] text-[#3d4d00]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ann.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-slate-700 text-[11px] font-semibold">
                    {ann.tag}
                  </span>
                  {!ann.isRead && (
                    <span className="text-xs font-bold text-[#006e2c]">• Unread</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onToggleBookmark(ann.id)}
                  aria-label="Bookmark circular"
                  className={`p-1.5 rounded-lg cursor-pointer ${
                    ann.isBookmarked ? 'text-[#006e2c] bg-emerald-50' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{ann.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ann.summary}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {ann.authorName} • {ann.authorRole}
                  </span>
                  <span>{ann.publishedAt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpenCircular(ann);
                    if (!ann.isRead) void onToggleRead(ann.id);
                  }}
                  className="font-bold text-[#006e2c] hover:underline cursor-pointer"
                >
                  Read Full Circular →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="xl:col-span-4 space-y-5">
          <div className="rounded-2xl p-5 bg-[#f3fae8] dark:bg-emerald-950/30 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">ACTION REQUIRED</span>
              <span className="text-red-700 font-bold">3 Days Left</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Mandatory Academic Course Verification Deadline
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Verify enrolled electives and credits in the <strong>Marks & Results</strong> tab before the
              institutional registrar portal freezes for Fall 2024.
            </p>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900 text-xs">
              <p className="text-slate-500 font-bold uppercase text-[10px]">Cutoff Timestamp</p>
              <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">Nov 18, 2024 • 05:00 PM</p>
            </div>
            <button
              type="button"
              onClick={onNavigateResults}
              className="w-full py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer"
            >
              Verify Enrolled Electives
            </button>
          </div>
        </div>
      </div>

      {/* Circular Reader Modal */}
      {openCircular && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
                  {openCircular.category}
                </span>
                <h3 className="text-lg font-extrabold mt-2">{openCircular.title}</h3>
              </div>
              <button type="button" onClick={() => setOpenCircular(null)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{openCircular.body}</p>
            <p className="text-xs text-slate-500">
              Issued by {openCircular.authorName} ({openCircular.authorRole}) • {openCircular.publishedAt}
            </p>
            <button
              type="button"
              onClick={() => setOpenCircular(null)}
              className="w-full py-2.5 rounded-xl bg-[#30b155] text-white text-xs font-bold cursor-pointer"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. MARKS & RESULTS VIEW                                                    */
/* -------------------------------------------------------------------------- */
interface StudentResultsProps {
  results: ExamResultItem[];
}

export const StudentResultsView: React.FC<StudentResultsProps> = ({ results }) => {
  const [examTab, setExamTab] = useState<ExamResultItem['examType']>('Semester V Final');
  const [downloaded, setDownloaded] = useState(false);

  const activeRows = results.filter((r) => r.examType === examTab);
  const totalObtained = activeRows.reduce((acc, r) => acc + r.score, 0);
  const totalMax = activeRows.reduce((acc, r) => acc + r.maxMarks, 0);
  const pct = totalMax ? ((totalObtained / totalMax) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#30b155] text-white flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-extrabold">Academic Performance & Results</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
                {examTab}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bachelor of Technology • Computer Science & Engineering • Academic Year 2024–25
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="px-3.5 py-2 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold text-[#006e2c]">
            Live Sync • COE Portal
          </span>
          <button
            type="button"
            onClick={() => {
              setDownloaded(true);
              setTimeout(() => setDownloaded(false), 2500);
            }}
            className="px-4 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloaded ? 'Transcript Saved' : 'Download Transcript PDF'}</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Total Subjects</span>
          <p className="text-3xl font-extrabold tabular-nums mt-2">0{activeRows.length}</p>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
            100% Evaluated
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Marks Obtained</span>
          <p className="text-3xl font-extrabold tabular-nums mt-2">
            {totalObtained} <span className="text-base font-semibold text-slate-500">/ {totalMax}</span>
          </p>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[#006e2c] text-white text-[11px] font-bold tabular-nums">
            {pct}% Score
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">CGPA & Standing</span>
          <p className="text-3xl font-extrabold tabular-nums mt-2">
            9.24 <span className="text-base font-semibold text-slate-500">/ 10</span>
          </p>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
            Top 5% • Rank #03
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Overall Standing</span>
          <p className="text-3xl font-extrabold text-[#006e2c] mt-2">A+</p>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[#006e2c] text-white text-[11px] font-bold">
            First Class w/ Dist.
          </span>
        </div>
      </div>

      {/* Results Table + Class Benchmark */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-[#f2f3ff] dark:bg-slate-800 p-1 rounded-xl">
              {(['Semester V Final', 'Model Examination', 'Internal Assessment'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setExamTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    examTab === tab
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#006e2c]" /> Accredited Grading System
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#f2f3ff] dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <th className="p-3 rounded-l-xl font-bold">Subject Name & Code</th>
                  <th className="p-3 font-bold text-center">Credits</th>
                  <th className="p-3 font-bold text-center">Max</th>
                  <th className="p-3 font-bold text-center">Score</th>
                  <th className="p-3 font-bold">Progress</th>
                  <th className="p-3 rounded-r-xl font-bold text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeRows.map((row) => {
                  const rowPct = Math.round((row.score / row.maxMarks) * 100);
                  return (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#f2f3ff] font-mono font-bold text-slate-700">
                            {row.courseCode}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">{row.courseTitle}</span>
                          {row.isTop && (
                            <span className="px-1.5 py-0.5 rounded bg-[#d0eb78] text-[#3d4d00] text-[10px] font-bold">
                              Top
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-center tabular-nums">{row.credits.toFixed(1)}</td>
                      <td className="p-3 text-center tabular-nums">{row.maxMarks}</td>
                      <td className="p-3 text-center font-extrabold text-slate-900 dark:text-white tabular-nums">
                        {row.score}
                      </td>
                      <td className="p-3 w-36">
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-[#30b155] rounded-full" style={{ width: `${rowPct}%` }} />
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold ${
                            row.grade.startsWith('A+')
                              ? 'bg-[#30b155] text-white'
                              : 'bg-[#d0eb78] text-[#3d4d00]'
                          }`}
                        >
                          {row.grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold">Class Benchmark</h3>
                <p className="text-xs text-slate-500">Student ({pct}%) vs Class Average (78.4%)</p>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-[#006e2c] text-white text-xs font-bold">+11.9% Delta</span>
            </div>

            <div className="space-y-3 pt-1">
              {activeRows.slice(0, 5).map((r) => (
                <div key={r.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>{r.courseCode}</span>
                    <span className="tabular-nums text-[#006e2c]">
                      {r.score} vs {r.classAvg} avg
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex gap-0.5">
                    <div
                      className="h-full bg-[#30b155] rounded-full"
                      style={{ width: `${(r.score / r.maxMarks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-bold">Official Transcript Verification</h3>
            <p className="text-xs text-slate-500">
              Registry Hash: <span className="font-mono font-bold text-[#006e2c]">2024-SEM5-8841-COE</span>
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Verified digitally by Office of Controller of Examinations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. STUDY MATERIALS REPOSITORY VIEW                                         */
/* -------------------------------------------------------------------------- */
interface StudentMaterialsProps {
  materials: StudyMaterialItem[];
  onToggleOffline: (id: string) => Promise<void>;
  onUploadMaterial: (payload: { title: string; courseCode: string; courseName: string; fileType: StudyMaterialItem['fileType'] }) => Promise<void>;
}

export const StudentMaterialsView: React.FC<StudentMaterialsProps> = ({
  materials,
  onToggleOffline,
  onUploadMaterial,
}) => {
  const [courseFilter, setCourseFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [searchText, setSearchText] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('CS503');
  const [newType, setNewType] = useState<StudyMaterialItem['fileType']>('PDF Notes');

  const courses = ['All', ...Array.from(new Set(materials.map((m) => m.courseCode)))];
  const filtered = materials.filter((m) => {
    const matchCourse = courseFilter === 'All' || m.courseCode === courseFilter;
    const matchType = typeFilter === 'All Types' || m.fileType === typeFilter;
    const matchText = !searchText || m.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCourse && matchType && matchText;
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUploadMaterial({
      title: newTitle,
      courseCode: newCourse,
      courseName: 'Computer Science',
      fileType: newType,
    });
    setNewTitle('');
    setUploadOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Course Study Materials & Repository</h1>
          <p className="text-xs text-slate-500 mt-1">
            Semester V • Bachelor of Technology (CSE) • Academic Year 2024–25
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#eef2ff] hover:bg-[#e2e7ff] text-slate-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#006e2c]" />
            <span>Upload New Notes</span>
          </button>
          <button
            type="button"
            onClick={() => filtered.forEach((m) => { if (!m.isOffline) void onToggleOffline(m.id); })}
            className="px-4 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Semester Pack (ZIP • 340 MB)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Total Materials</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">{144 + materials.length} Resources</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">New Uploads</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">
            {materials.filter((m) => m.isUnread).length + 16} Unread
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Downloaded Offline</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">
            {materials.filter((m) => m.isOffline).length + 39} Files
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Question Banks</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">26 Sets</p>
        </div>
      </div>

      {/* Course & File Type Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {courses.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCourseFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                courseFilter === c
                  ? 'bg-[#006e2c] text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {c === 'All' ? `All (${materials.length})` : c}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Filter by title, module..."
            className="h-9 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs flex-1 min-w-[180px] focus:outline-none"
          />
          {['All Types', 'PDF Notes', 'PPT Slides', 'Lab Code', 'Q-Banks'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                typeFilter === t ? 'bg-[#d0eb78] text-[#3d4d00]' : 'bg-[#f2f3ff] dark:bg-slate-800 text-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Materials List + AI Exam Recommender */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 space-y-3">
          {filtered.map((mat) => (
            <div
              key={mat.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{mat.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {mat.facultyName} • {mat.unitLabel} • {mat.fileSize} • {mat.updatedLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#006e2c] text-[11px] font-bold">
                  {mat.badgeLabel}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleOffline(mat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    mat.isOffline
                      ? 'bg-[#d0eb78] text-[#3d4d00]'
                      : 'bg-[#006e2c] text-white'
                  }`}
                >
                  {mat.isOffline ? 'Cached Offline' : 'Get'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#006e2c]" /> AI Exam Recommender
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#d0eb78] text-[#3d4d00] text-[10px] font-bold">
              PRIORITY PICKS
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs">
            <p className="font-bold">Mid-Sem Revision Pack (CS503)</p>
            <p className="text-slate-500 mt-0.5">All 6 Units • High-yield Transformer proofs</p>
          </div>
          <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs">
            <p className="font-bold">5-Yr Solved Question Bank (CS502)</p>
            <p className="text-slate-500 mt-0.5">98% syllabus match for Fall 2024</p>
          </div>
        </div>
      </div>

      {/* Upload Material Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Upload Study Notes</h3>
              <button type="button" onClick={() => setUploadOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold mb-1">Material Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. CS503: Attention Mechanism Summary Notes"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Course Code</label>
                  <input
                    type="text"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Resource Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as StudyMaterialItem['fileType'])}
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  >
                    <option>PDF Notes</option>
                    <option>PPT Slides</option>
                    <option>Lab Code</option>
                    <option>Q-Banks</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer"
                >
                  Upload to Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. AI ASSISTANT STUDY COMPANION VIEW (GEMINI API)                          */
/* -------------------------------------------------------------------------- */
interface StudentAiAssistantProps {
  threads: AiStudyThread[];
  initialPrompt?: string;
  onSendMessage: (threadId: string, message: string, mode: string) => Promise<void>;
}

export const StudentAiAssistantView: React.FC<StudentAiAssistantProps> = ({
  threads,
  initialPrompt,
  onSendMessage,
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || '');
  const [prompt, setPrompt] = useState<string>(initialPrompt || '');
  const [mode, setMode] = useState<string>('Ask Question');
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || sending) return;
    setErrorMsg(null);
    setSending(true);
    try {
      await onSendMessage(activeThread?.id || '', prompt.trim(), mode);
      setPrompt('');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to reach Gemini AI Tutor.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-9 h-9 rounded-xl bg-[#30b155] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold">EduTrack AI Study Companion & Tutor</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
              GEMINI ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Semester V • Computer Science & Engineering • Grounded in syllabus & 148 verified faculty lecture archives
          </p>
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#006e2c] font-bold">
              Course Context: Synced (6 Subjects)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#eef2ff] text-slate-700 font-semibold">
              Model: Gemini 4 Hydrogen
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#006e2c] font-semibold">
              Tier: Unlimited Campus Access
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setPrompt('');
            setMode('Ask Question');
          }}
          className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Conversation</span>
        </button>
      </div>

      {/* Main Chat + Threads */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          {/* Personalized Contextual Stream */}
          <div className="p-4 rounded-xl bg-[#f2f6ff] dark:bg-slate-800/70 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#30b155] text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#006e2c]">
                Personalized Contextual Stream
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                Hello Alex! Indexed <strong>CS503 Transformers</strong>, recent assignment submissions in{' '}
                <strong>CS501</strong>, and lab assessments. Select a study mode or ask any course question:
              </p>
            </div>
          </div>

          {/* 4 Quick Mode Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'Ask Question', tag: 'Instant', desc: 'Concept breakdown' },
              { id: 'Explain Topic', tag: 'Deep Dive', desc: 'Intuitive math & proofs' },
              { id: 'Summarize', tag: 'High Yield', desc: 'Concise flashcards' },
              { id: 'Generate Quiz', tag: 'Exam Prep', desc: 'Practice MCQs' },
            ].map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setMode(card.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  mode === card.id
                    ? 'bg-emerald-50 border-[#30b155] ring-1 ring-[#30b155]'
                    : 'bg-[#fafbff] dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-[#30b155]'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">{card.id}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#d0eb78] text-[#3d4d00] text-[10px] font-bold">
                    {card.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{card.desc}</p>
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {activeThread?.messages.map((msg) =>
              msg.sender === 'user' ? (
                <div key={msg.id} className="flex flex-col items-end gap-1">
                  <span className="text-[11px] text-slate-400">{msg.timestamp} • Alex Morgan</span>
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#006e2c] text-white px-4 py-3 text-sm leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex flex-col items-start gap-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">EduTrack AI</span>
                    {msg.groundedIn && (
                      <span className="px-2 py-0.5 rounded-full bg-[#eef2ff] text-slate-700 text-[11px] font-medium">
                        {msg.groundedIn}
                      </span>
                    )}
                    <span className="text-slate-400">{msg.timestamp}</span>
                  </div>
                  <div className="w-full rounded-2xl bg-[#f7faf7] dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 p-4 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap space-y-3">
                    <p>{msg.content}</p>
                    {msg.formula && (
                      <div className="rounded-xl bg-[#eef2ff] dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#006e2c] mb-1">
                          <span>FORMULA DEFINITION</span>
                          <span>{msg.formulaLabel}</span>
                        </div>
                        <code className="block font-mono text-xs font-bold text-slate-900 dark:text-white text-center py-1">
                          {msg.formula}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Input Box */}
          <form onSubmit={handleSend} className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Ask EduTrack AI (${mode} mode)...`}
              className="flex-1 h-12 px-4 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#30b155]"
            />
            <button
              type="submit"
              disabled={sending || !prompt.trim()}
              className="h-12 px-5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>{sending ? 'Thinking...' : 'Ask Tutor'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Recent Study Threads & Exam Prep Alerts */}
        <div className="xl:col-span-4 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Recent Study Threads</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] text-[11px] font-bold">
                {threads.length} Active
              </span>
            </div>
            <div className="space-y-2">
              {threads.map((thr) => (
                <button
                  key={thr.id}
                  type="button"
                  onClick={() => setActiveThreadId(thr.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    activeThread?.id === thr.id
                      ? 'bg-emerald-50 border-[#30b155]'
                      : 'bg-[#f2f3ff]/60 dark:bg-slate-800/50 border-transparent hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {thr.title}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[#006e2c] text-[10px] font-bold shrink-0">
                      {thr.courseCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {thr.subtitle} • {thr.updatedLabel}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <h3 className="text-sm font-bold">AI Exam Prep Alerts</h3>
            <div className="p-3 rounded-xl bg-red-50 border border-red-200/70 text-xs">
              <p className="font-bold text-red-700">CS502 Concurrency Review • Priority High</p>
              <p className="text-red-900/80 mt-0.5">
                Quiz 2 graded — review page replacement & semaphore deadlock proofs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
