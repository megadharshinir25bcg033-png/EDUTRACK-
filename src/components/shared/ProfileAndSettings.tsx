import React, { useState } from 'react';
import {
  BadgeCheck,
  CheckCircle2,
  Download,
  Edit3,
  Lock,
  Moon,
  Save,
  Sun,
} from 'lucide-react';
import { UserProfile, UserSettings } from '../../types/edutrack.ts';

/* -------------------------------------------------------------------------- */
/* ROLE-TAILORED PROFILE VIEW (STUDENT & FACULTY)                             */
/* -------------------------------------------------------------------------- */
interface StandardProfileProps {
  profile: UserProfile;
  onSaveProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const StandardProfileView: React.FC<StandardProfileProps> = ({ profile, onSaveProfile }) => {
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [cvDownloaded, setCvDownloaded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <img
            src={profile.avatarUrl}
            alt={profile.displayTitle}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#30b155] shrink-0"
          />
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {profile.displayTitle}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-xs font-bold flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5" />
                {profile.role === 'faculty' ? 'Verified Faculty' : 'Verified Student'}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#006e2c] mt-1">
              {profile.department} • {profile.designation}
            </p>
            <div className="flex items-center gap-2 flex-wrap mt-3 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 font-bold">
                ID: {profile.institutionalId}
              </span>
              {profile.role === 'faculty' ? (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 font-semibold">
                    184 Enrolled Students
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 font-semibold">
                    14.5 Weekly Hours
                  </span>
                </>
              ) : (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 font-semibold">
                    {profile.semester} • {profile.section}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#006e2c] font-bold">
                    CGPA: {profile.cgpa}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-slate-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[#006e2c]" />
            <span>{editing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCvDownloaded(true);
              setTimeout(() => setCvDownloaded(false), 2000);
            }}
            className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{cvDownloaded ? 'Downloaded!' : profile.role === 'faculty' ? 'Download CV' : 'Download ID Card'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Info */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold">Personal Information</h2>
            <span className="text-xs font-semibold text-[#006e2c]">Confidential & Protected</span>
          </div>

          {editing ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onSaveProfile({ fullName, phone, address });
                setEditing(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-bold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Residential Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <button type="submit" className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500">Full Legal Name</p>
                <p className="font-semibold mt-0.5">{profile.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Date of Birth & Age</p>
                <p className="font-semibold mt-0.5">{profile.dob}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Gender</p>
                <p className="font-semibold mt-0.5">{profile.gender}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Contact Phone</p>
                <p className="font-semibold mt-0.5 tabular-nums">{profile.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Institutional & Primary Email</p>
                <p className="font-semibold text-[#006e2c] mt-0.5">{profile.email}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Residential Address</p>
                <p className="font-semibold mt-0.5">{profile.address}</p>
              </div>
            </div>
          )}
        </div>

        <div className="xl:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold">
              {profile.role === 'faculty' ? 'Teaching & Curriculum' : 'Enrolled Academic Track'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] text-xs font-bold">
              Fall 2024
            </span>
          </div>
          <div className="space-y-2.5 text-xs">
            {[
              { code: '503', title: 'Distributed Systems & Consensus', meta: 'Sem V • Sec A & B' },
              { code: '501', title: 'Advanced Algorithms & Complexity', meta: 'Sem V • Sec B' },
              { code: '502', title: 'Operating Systems Architecture', meta: 'Sem V • Combined' },
            ].map((c) => (
              <div key={c.code} className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#30b155] text-white font-extrabold flex items-center justify-center shrink-0">
                  {c.code}
                </span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{c.title}</p>
                  <p className="text-slate-500">{c.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* ACCOUNT & SYSTEM SETTINGS VIEW (ALL ROLES)                                 */
/* -------------------------------------------------------------------------- */
interface SettingsViewProps {
  profile: UserProfile;
  onSaveProfile: (updates: Partial<UserProfile>, settings?: Partial<UserSettings>) => Promise<void>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ profile, onSaveProfile }) => {
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [settings, setSettings] = useState<UserSettings>(profile.settings);
  const [newPassword, setNewPassword] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveAll = async () => {
    await onSaveProfile({ fullName, email, phone }, settings);
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const toggleSetting = (key: keyof UserSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Account & System Settings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-xs font-bold">
              SYNCED
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your institutional credentials, security protocols, alert preferences, and portal appearance.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          className="px-5 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{savedNotice ? 'Changes Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#006e2c] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Workspace settings & preferences synchronized.</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Account Info & Security */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold">Account Information</h2>
              <span className="px-2.5 py-0.5 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 text-xs font-semibold">
                Academic Year 2024–25
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Institutional ID (Verified)</label>
                <div className="h-10 px-3 rounded-xl bg-[#eef2ff] dark:bg-slate-800 flex items-center justify-between font-mono font-bold text-sm">
                  <span>{profile.institutionalId}</span>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Institutional Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm font-semibold tabular-nums"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold">{profile.department}</span>
              <span className="font-bold text-[#006e2c]">{profile.designation}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-extrabold">Security & Authentication</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-500 font-semibold mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong passphrase..."
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Appearance */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-extrabold">Notification Channels</h2>
            <div className="space-y-3">
              {[
                { key: 'assignmentAlerts' as const, title: 'Assignments & Submissions', desc: 'Deadlines, feedback & grades' },
                { key: 'attendanceWarnings' as const, title: 'Attendance Threshold Warnings', desc: 'Alerts when dipping under 75%' },
                { key: 'examAlerts' as const, title: 'Exams & Hall Tickets', desc: 'Mid-terms, finals & test venues' },
                { key: 'campusBroadcasts' as const, title: 'Campus Broadcasts', desc: 'Faculty bulletins & urgent circulars' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings[item.key]}
                    onClick={() => toggleSetting(item.key)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                      settings[item.key] ? 'bg-[#30b155]' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                        settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-extrabold">Appearance & Theme</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSettings((prev) => ({ ...prev, theme: 'light' }));
                  document.documentElement.classList.remove('dark');
                }}
                className={`p-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                  settings.theme === 'light'
                    ? 'border-[#30b155] bg-emerald-50 text-[#006e2c]'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light Mode</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettings((prev) => ({ ...prev, theme: 'dark' }));
                  document.documentElement.classList.add('dark');
                }}
                className={`p-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                  settings.theme === 'dark'
                    ? 'border-[#30b155] bg-slate-800 text-emerald-400'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
