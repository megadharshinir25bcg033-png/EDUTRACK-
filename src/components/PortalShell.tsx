import React, { useState } from 'react';
import {
  Award,
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  CalendarRange,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutGrid,
  LogOut,
  Megaphone,
  Menu,
  Search,
  Settings,
  User,
  UserCog,
  Users,
  X,
} from 'lucide-react';
import { AnnouncementItem, UserProfile, UserRole } from '../types/edutrack.ts';

export type NavTab =
  | 'dashboard'
  | 'assignments'
  | 'attendance'
  | 'timetable'
  | 'calendar'
  | 'announcements'
  | 'results'
  | 'materials'
  | 'ai-assistant'
  | 'student-management'
  | 'staff-management'
  | 'assignment-marks'
  | 'profile'
  | 'settings';

interface PortalShellProps {
  role: UserRole;
  profile: UserProfile;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  announcements: AnnouncementItem[];
  children: React.ReactNode;
}

interface NavGroup {
  label?: string;
  items: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string; dot?: boolean }[];
}

export const PortalShell: React.FC<PortalShellProps> = ({
  role,
  profile,
  activeTab,
  onSelectTab,
  onSwitchRole,
  onLogout,
  searchQuery,
  onSearchChange,
  announcements,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadCount = announcements.filter((a) => !a.isRead).length;

  const navGroups: NavGroup[] =
    role === 'student'
      ? [
          {
            label: 'MAIN',
            items: [
              { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
              { id: 'assignments', label: 'Assignments', icon: FileText },
              { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
              { id: 'timetable', label: 'Timetable', icon: CalendarRange },
              { id: 'calendar', label: 'Calendar', icon: CalendarDays },
              { id: 'announcements', label: 'Announcements', icon: Megaphone },
            ],
          },
          {
            label: 'ACADEMICS',
            items: [
              { id: 'results', label: 'Marks & Results', icon: Award, badge: 'New' },
              { id: 'materials', label: 'Study Materials', icon: BookOpen },
            ],
          },
          {
            label: 'AI TOOLS',
            items: [{ id: 'ai-assistant', label: 'AI Assistant', icon: Bot, dot: true }],
          },
          {
            label: 'ACCOUNT',
            items: [
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'settings', label: 'Settings', icon: Settings },
            ],
          },
        ]
      : role === 'faculty'
      ? [
          {
            label: 'EDUTRACK STAFF PORTAL',
            items: [
              { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
              { id: 'assignments', label: 'Student Assignments', icon: FileText },
              { id: 'assignment-marks', label: 'Assignment Marks', icon: Award },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'settings', label: 'Settings', icon: Settings },
            ],
          },
        ]
      : [
          {
            items: [
              { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
              { id: 'student-management', label: 'Student Management', icon: Users },
              { id: 'staff-management', label: 'Staff Management', icon: UserCog },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'settings', label: 'Settings', icon: Settings },
            ],
          },
        ];

  const portalLabel =
    role === 'student' ? 'Student Portal' : role === 'faculty' ? 'Faculty Portal' : 'Admin Portal';

  const searchPlaceholder =
    role === 'student'
      ? 'Search courses, topics, materials...'
      : role === 'faculty'
      ? 'Search assignments, students, gradebook...'
      : 'Search administrative records, logs, staff...';

  const renderSidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-5">
        {/* Brand */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl edutrack-gradient-btn flex items-center justify-center text-white shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                EduTrack AI
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                {portalLabel}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="flex flex-col gap-4 overflow-y-auto pr-1">
          {navGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {group.label && (
                <span className="px-3 pb-1 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  {group.label}
                </span>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#30b155] text-white font-bold shadow-[0_8px_20px_-4px_rgba(48,177,85,0.35)]'
                        : 'text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <Icon className="w-[18px] h-[18px] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          active ? 'bg-white/25 text-white' : 'bg-[#d0eb78] text-[#3d4d00]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.dot && (
                      <span
                        className={`w-2 h-2 rounded-full ${active ? 'bg-white' : 'bg-[#30b155]'}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer whitespace-nowrap mt-1"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Quick Portal Switcher for effortless multi-role exploration */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 p-3 border border-slate-200/60 dark:border-slate-700/60">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
            Switch Institutional Portal
          </p>
          <div className="grid grid-cols-3 gap-1">
            {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onSwitchRole(r)}
                className={`py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                  role === r
                    ? 'bg-[#30b155] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen edutrack-canvas-wash text-slate-900 dark:text-slate-100">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-5 z-40 flex-col">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-900 h-full p-5 z-10 shadow-2xl">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {role === 'admin' && (
              <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-[#e2e7ff] dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold whitespace-nowrap shrink-0">
                Central Administration
              </span>
            )}

            {role === 'faculty' && (
              <span className="hidden xl:inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#006e2c] dark:text-emerald-300 text-xs font-bold whitespace-nowrap shrink-0">
                Dept. of Computer Science
              </span>
            )}

            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#30b155]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setRoleMenuOpen(false);
                }}
                aria-label="Notifications"
                className="relative w-10 h-10 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#e2e7ff] dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#30b155]" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Campus Circulars ({unreadCount} unread)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifOpen(false);
                        onSelectTab(role === 'student' ? 'announcements' : 'dashboard');
                      }}
                      className="text-xs font-semibold text-[#006e2c] hover:underline cursor-pointer"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-64 overflow-y-auto">
                    {announcements.slice(0, 3).map((ann) => (
                      <div
                        key={ann.id}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-xs"
                      >
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{ann.title}</p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{ann.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill & Role Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setRoleMenuOpen(!roleMenuOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 hover:bg-[#e2e7ff] dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {profile.displayTitle.replace(', Ph.D.', '')}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight tabular-nums">
                    {profile.institutionalId}
                  </span>
                </div>
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayTitle}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#30b155]"
                />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setRoleMenuOpen(false);
                      onSelectTab('profile');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRoleMenuOpen(false);
                      onSelectTab('settings');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Account Settings
                  </button>
                  <div className="my-1.5 h-px bg-slate-200 dark:bg-slate-800" />
                  <p className="px-3 py-1 text-[11px] font-bold text-slate-400">Switch Role Portal</p>
                  {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRoleMenuOpen(false);
                        onSwitchRole(r);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold capitalize cursor-pointer ${
                        role === r
                          ? 'bg-emerald-50 text-[#006e2c] dark:bg-emerald-950/50 dark:text-emerald-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {r} Portal
                    </button>
                  ))}
                  <div className="my-1.5 h-px bg-slate-200 dark:bg-slate-800" />
                  <button
                    type="button"
                    onClick={() => {
                      setRoleMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1440px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};
