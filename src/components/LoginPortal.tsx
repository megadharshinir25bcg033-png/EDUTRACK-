import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  HelpCircle,
  Info,
  Lock,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { UserRole } from '../types/edutrack.ts';

interface LoginPortalProps {
  onLoginSuccess: (role: UserRole) => void;
}

const ROLE_PRESETS: Record<
  UserRole,
  { label: string; idLabel: string; placeholder: string; defaultId: string; hint: string }
> = {
  student: {
    label: 'Student',
    idLabel: 'Student Roll Number',
    placeholder: 'e.g. STU-2024-8841 or 21BCE1045',
    defaultId: 'STU-2024-8841',
    hint: 'Students: Use your enrolled registration number. First-year students can authenticate via University SSO.',
  },
  faculty: {
    label: 'Faculty',
    idLabel: 'Faculty Identification',
    placeholder: 'e.g. FAC-2024-1042 or prof.amorgan',
    defaultId: 'FAC-2024-1042',
    hint: 'Faculty: Sign in with your verified department ID to access grading ledgers and coursework hubs.',
  },
  admin: {
    label: 'Admin',
    idLabel: 'Administrator ID',
    placeholder: 'e.g. ADM-2024-001 or admin.evance',
    defaultId: 'ADM-2024-001',
    hint: 'Administrators: Level-5 governance access is protected by institutional session logging.',
  },
};

export const LoginPortal: React.FC<LoginPortalProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('STU-2024-8841');
  const [password, setPassword] = useState('edutrack2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHelpdesk, setShowHelpdesk] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleRoleSwitch = (nextRole: UserRole) => {
    setRole(nextRole);
    setIdentifier(ROLE_PRESETS[nextRole].defaultId);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to verify institutional credentials.');
        return;
      }
      onLoginSuccess(role);
    } catch {
      setError('Connection error while verifying credentials.');
    } finally {
      setLoading(false);
    }
  };

  const preset = ROLE_PRESETS[role];

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Brand & Institutional Showcase Panel */}
      <div className="lg:col-span-6 relative overflow-hidden bg-gradient-to-br from-[#f2fae8] via-[#e4f5da] to-[#d9f0cb] p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#c2dd6c]/30 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 bottom-10 w-80 h-80 rounded-full bg-[#30b155]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg">
          {/* Brand */}
          <div className="flex items-center gap-3.5 mb-10">
            <div className="w-12 h-12 rounded-2xl edutrack-gradient-btn flex items-center justify-center text-white shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">EduTrack</span>
                <span className="px-2 py-0.5 rounded-full bg-[#30b155] text-white text-[11px] font-bold">
                  AI 4.2
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 mt-0.5">Smart Academic Ecosystem</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200/70 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#30b155]" />
            <span className="text-xs font-semibold text-emerald-900">Unified Institutional Gateway</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance mb-5">
            Next–Gen Intelligence for Higher Learning.
          </h1>

          <p className="text-base text-slate-700 leading-relaxed max-w-md">
            Empowering students, faculty, and institutional leaders with automated curriculum intelligence,
            streamlined grading, and encrypted audit trails.
          </p>
        </div>

        {/* 3 Feature Highlight Cards */}
        <div className="relative z-10 flex flex-col gap-3.5 mt-10 max-w-lg">
          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 border border-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e9f7cf] text-[#3d4d00] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">99.98% Service Uptime SLA</p>
                <p className="text-xs text-slate-500">Federated high-availability cloud architecture</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#80fc96]/60 text-[#003c15] text-xs font-bold shrink-0">
              Live
            </span>
          </div>

          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 border border-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#fbdfaf]/60 text-[#564421] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Course Copilot & Analytics</p>
                <p className="text-xs text-slate-500">Continuous learning assessment & Gemini study tutor</p>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
          </div>

          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 border border-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006e2c] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Institutional Compliance</p>
                <p className="text-xs text-slate-500">Certified FERPA, GDPR, and SOC–2 Type II</p>
              </div>
            </div>
            <Lock className="w-4 h-4 text-[#006e2c] shrink-0" />
          </div>
        </div>
      </div>

      {/* Right Authentication Form Panel */}
      <div className="lg:col-span-6 bg-[#fafcff] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#30b155]" />
            <span>Network Status: Operational</span>
          </div>
          <button
            type="button"
            onClick={() => setShowHelpdesk(true)}
            className="inline-flex items-center gap-1.5 text-[#006e2c] font-semibold hover:underline cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Helpdesk</span>
          </button>
        </div>

        <div className="w-full max-w-[440px] mx-auto my-auto py-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Sign in to your Portal</h2>
          <p className="text-sm text-slate-500 mt-1.5 mb-7">
            Select your institutional role to access your personalized workspace.
          </p>

          {/* Role Switcher */}
          <div className="grid grid-cols-3 gap-1 p-1.5 rounded-2xl bg-[#eef2ff] mb-6">
            {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => {
              const active = role === r;
              const Icon = r === 'student' ? GraduationCap : r === 'faculty' ? Users : ShieldCheck;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSwitch(r)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-white text-[#006e2c] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{ROLE_PRESETS[r].label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">{preset.idLabel}</label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={preset.placeholder}
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#30b155] focus:ring-4 focus:ring-[#30b155]/12 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(false);
                    setShowForgot(true);
                  }}
                  className="text-xs font-semibold text-[#006e2c] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter institutional password"
                  required
                  className="w-full h-12 pl-10 pr-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#30b155] focus:ring-4 focus:ring-[#30b155]/12 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 accent-[#30b155]"
                />
                <span>Remember device for 30 days</span>
              </label>
              <span className="text-[11px] text-slate-400">Session IP logged</span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl edutrack-gradient-btn text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
            >
              <span>{loading ? 'Verifying Credentials...' : 'Secure Portal Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              OR AUTHENTICATE VIA
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={() => onLoginSuccess(role)}
            className="w-full h-11 rounded-xl bg-white border border-slate-200 hover:border-[#30b155] hover:bg-emerald-50/30 text-sm font-semibold text-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-slate-600" />
            <span>Single Sign-On (University ID SSO)</span>
          </button>

          <div className="mt-5 p-3.5 rounded-xl bg-[#eef2ff]/70 border border-slate-200/70 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">{preset.hint}</p>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          Apex Institute of Technology & Sciences • Academic Governance Platform
        </div>
      </div>

      {/* Helpdesk Modal */}
      {showHelpdesk && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Institutional IT Helpdesk</h3>
              <button
                type="button"
                onClick={() => setShowHelpdesk(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              For instant portal testing, select any role tab above and click{' '}
              <strong className="text-slate-900">Secure Portal Sign In</strong> or{' '}
              <strong className="text-slate-900">Single Sign-On</strong>.
            </p>
            <div className="space-y-2 text-xs bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <p>
                <span className="font-bold text-slate-800">Student ID:</span> STU-2024-8841 (Alex Morgan)
              </p>
              <p>
                <span className="font-bold text-slate-800">Faculty ID:</span> FAC-2024-1042 (Prof. Alex Morgan)
              </p>
              <p>
                <span className="font-bold text-slate-800">Admin ID:</span> ADM-2024-001 (Dr. Eleanor Vance)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowHelpdesk(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#30b155] text-white text-sm font-bold cursor-pointer"
            >
              Close Helpdesk
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900">Reset Institutional Passphrase</h3>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
                Verification link dispatched to the registered recovery email for <strong>{identifier}</strong>.
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Enter your institutional ID to receive a hardware-verified recovery link.
                </p>
                <input
                  type="text"
                  defaultValue={identifier}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setResetSent(true)}
                  className="w-full py-2.5 rounded-xl bg-[#30b155] text-white text-sm font-bold cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
