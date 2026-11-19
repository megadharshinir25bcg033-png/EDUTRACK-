import React, { useState } from 'react';
import {
  Activity,
  Award,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Edit3,
  Fingerprint,
  GraduationCap,
  History,
  Key,
  Lock,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import {
  AuditLogItem,
  CampusActivityItem,
  StaffRegistryItem,
  StudentRegistryItem,
  UserProfile,
} from '../../types/edutrack.ts';
import { NavTab } from '../PortalShell.tsx';

/* -------------------------------------------------------------------------- */
/* 1. ADMIN DASHBOARD VIEW                                                    */
/* -------------------------------------------------------------------------- */
interface AdminDashboardProps {
  profile: UserProfile;
  students: StudentRegistryItem[];
  staff: StaffRegistryItem[];
  activity: CampusActivityItem[];
  onNavigate: (tab: NavTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardProps> = ({
  profile,
  students,
  staff,
  activity,
  onNavigate,
}) => {
  const [exported, setExported] = useState(false);

  const departments = [
    { name: 'Computer Science & AI', count: 920 + Math.max(0, students.length - 6), pct: '32.3%', color: 'bg-[#30b155]' },
    { name: 'Electronics & Comm.', count: 680, pct: '23.9%', color: 'bg-[#79ce67]' },
    { name: 'Mechanical & Mechatronics', count: 540, pct: '19.0%', color: 'bg-[#b0986d]' },
    { name: 'Civil & Structural Engineering', count: 410, pct: '14.4%', color: 'bg-[#30b155]' },
    { name: 'Biotechnology & Genomics', count: 295, pct: '10.4%', color: 'bg-[#63df7c]' },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
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
                Welcome back, Dr. Eleanor Vance
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] text-xs font-bold">
                Super Administrator
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {profile.division} • AY 2024–2025 Fall Term • Real-time Campus Sync Active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('student-management')}
            className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Student</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('staff-management')}
            className="px-4 py-2.5 rounded-xl bg-[#eef2ff] hover:bg-[#e2e7ff] text-slate-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#006e2c]" />
            <span>+ Add Staff</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setExported(true);
              setTimeout(() => setExported(false), 2500);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{exported ? 'Report Ready' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('student-management')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-[#30b155]/60 transition-all"
        >
          <span className="text-xs font-semibold text-slate-500">Total Students</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">{2839 + students.length}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
              +128
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">98.4% active status</p>
        </div>
        <div
          onClick={() => onNavigate('staff-management')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-[#30b155]/60 transition-all"
        >
          <span className="text-xs font-semibold text-slate-500">Total Staff</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">{159 + staff.length}</span>
            <span className="px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-[11px] font-bold">
              Full Quorum
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">142 Faculty • 22 Operations</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500">Active Classes</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">96</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
              Optimal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">68 Lectures • 28 Wet Labs</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500">Curricula & Assignments</span>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-3xl font-extrabold tabular-nums">382</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006e2c] text-[11px] font-bold">
              94.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 8 Departments</p>
        </div>
      </div>

      {/* Enrollment Split + Campus Activity Stream */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-base font-extrabold">Institutional Faculty & Enrollment Split</h2>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-2.5 py-1 rounded-full bg-[#eef2ff] text-slate-700">8 Accredited Depts</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#006e2c]">34 Programs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Student Enrollment by Department</span>
                <span className="text-[#006e2c] tabular-nums">{2839 + students.length} Enrolled</span>
              </div>
              {departments.map((d) => (
                <div key={d.name} className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{d.name}</span>
                    <span className="text-slate-500 tabular-nums">
                      {d.count} students ({d.pct})
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full`} style={{ width: d.pct }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Faculty Quota</span>
                <span className="text-slate-500">1:17 Ratio</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { dept: 'CSE / Data AI', count: '44 Prof.' },
                  { dept: 'ECE / Hardware', count: '32 Prof.' },
                  { dept: 'Mech / Robotics', count: '28 Prof.' },
                  { dept: 'Civil & Human.', count: '38 Staff' },
                ].map((q) => (
                  <div key={q.dept} className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800">
                    <p className="text-[11px] text-slate-500 font-semibold">{q.dept}</p>
                    <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                      {q.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold">Campus Activity Stream</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006e2c] text-xs font-bold">
              Live
            </span>
          </div>
          <div className="space-y-3">
            {activity.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 text-[#006e2c] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{item.title}</p>
                    <span className="text-[11px] text-slate-400 shrink-0">{item.timeAgo}</span>
                  </div>
                  <p className="text-slate-500 mt-0.5 line-clamp-1">{item.detail}</p>
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
/* 2. ADMIN STUDENT MANAGEMENT VIEW                                           */
/* -------------------------------------------------------------------------- */
interface AdminStudentManagementProps {
  students: StudentRegistryItem[];
  onAddStudent: (payload: {
    fullName: string;
    registerNo: string;
    department: string;
    specialization: string;
    yearLabel: string;
    semesterLabel: string;
    email: string;
    phone: string;
  }) => Promise<void>;
  onUpdateStatus: (id: string, status: StudentRegistryItem['status']) => Promise<void>;
  onDeleteStudent: (id: string) => Promise<void>;
}

export const AdminStudentManagementView: React.FC<AdminStudentManagementProps> = ({
  students,
  onAddStudent,
  onUpdateStatus,
  onDeleteStudent,
}) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [modalOpen, setModalOpen] = useState(false);

  const [fullName, setFullName] = useState('');
  const [registerNo, setRegisterNo] = useState('');
  const [department, setDepartment] = useState('Computer Science & AI');
  const [specialization, setSpecialization] = useState('B.Tech Honors');
  const [yearLabel, setYearLabel] = useState('Year 1');
  const [semesterLabel, setSemesterLabel] = useState('Sem I');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+1 (555) 204-8820');

  const filtered = students.filter((s) => {
    const matchText =
      !search ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.registerNo.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All Departments' || s.department === deptFilter;
    return matchText && matchDept;
  });

  const exportCsv = () => {
    const header = 'Name,Register No,Department,Year,Email,Status\n';
    const rows = filtered
      .map((s) => `"${s.fullName}","${s.registerNo}","${s.department}","${s.yearLabel}","${s.email}","${s.status}"`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edutrack-student-registry.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#006e2c]">Admin Portal &gt; Student Management & Records</p>
          <h1 className="text-2xl font-extrabold mt-1">Student Information & Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student enrollment records, profiles, departmental credentials, and academic status.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={exportCsv}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Registry</span>
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add New Student</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Total Enrolled</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">{2839 + students.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Active Attendance</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">2,798 (98.35%)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Newly Registered</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">142 (Fall 2024)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">On Leave / Flagged</span>
          <p className="text-2xl font-extrabold text-red-600 tabular-nums mt-1">
            {students.filter((s) => s.status !== 'Active').length + 45}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or register no..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold"
        >
          <option>All Departments</option>
          <option>Computer Science & AI</option>
          <option>Electronics & Comm</option>
          <option>Mechanical & Mechatronics</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs min-w-[780px]">
          <thead className="bg-[#f2f3ff] dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-4 font-bold">Student Name & Avatar</th>
              <th className="p-4 font-bold">Register No.</th>
              <th className="p-4 font-bold">Department & Specialization</th>
              <th className="p-4 font-bold">Year / Sem</th>
              <th className="p-4 font-bold">Institutional Contact</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-emerald-100 text-[#006e2c] font-bold flex items-center justify-center shrink-0">
                      {s.initials}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{s.fullName}</p>
                      <p className="text-[11px] text-slate-500">{s.admittedTerm}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">{s.registerNo}</td>
                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white">{s.department}</p>
                  <p className="text-[11px] text-slate-500">{s.specialization}</p>
                </td>
                <td className="p-4">
                  <p className="font-bold">{s.yearLabel}</p>
                  <p className="text-[11px] text-slate-500">{s.semesterLabel}</p>
                </td>
                <td className="p-4">
                  <p className="font-semibold">{s.email}</p>
                  <p className="text-[11px] text-slate-500 tabular-nums">{s.phone}</p>
                </td>
                <td className="p-4">
                  <select
                    value={s.status}
                    onChange={(e) => void onUpdateStatus(s.id, e.target.value as StudentRegistryItem['status'])}
                    className={`px-2.5 py-1 rounded-full font-bold text-[11px] cursor-pointer ${
                      s.status === 'Active'
                        ? 'bg-emerald-100 text-[#006e2c]'
                        : s.status === 'On Leave'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Probation">Probation</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button
                    type="button"
                    onClick={() => void onDeleteStudent(s.id)}
                    aria-label="Delete student"
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Enroll New Student</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onAddStudent({
                  fullName,
                  registerNo,
                  department,
                  specialization,
                  yearLabel,
                  semesterLabel,
                  email,
                  phone,
                });
                setFullName('');
                setRegisterNo('');
                setEmail('');
                setModalOpen(false);
              }}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Register Number</label>
                  <input
                    type="text"
                    value={registerNo}
                    onChange={(e) => setRegisterNo(e.target.value)}
                    placeholder="CS-2024-0999"
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  >
                    <option>Computer Science & AI</option>
                    <option>Electronics & Comm</option>
                    <option>Mechanical & Mechatronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Institutional Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer">
                  Save Enrollment
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
/* 3. ADMIN STAFF MANAGEMENT VIEW                                             */
/* -------------------------------------------------------------------------- */
interface AdminStaffManagementProps {
  staff: StaffRegistryItem[];
  onAddStaff: (payload: {
    fullName: string;
    staffId: string;
    department: string;
    designation: string;
    email: string;
    phone: string;
    weeklyHours: number;
  }) => Promise<void>;
  onUpdateStatus: (id: string, status: StaffRegistryItem['status']) => Promise<void>;
  onDeleteStaff: (id: string) => Promise<void>;
}

export const AdminStaffManagementView: React.FC<AdminStaffManagementProps> = ({
  staff,
  onAddStaff,
  onUpdateStatus,
  onDeleteStaff,
}) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [modalOpen, setModalOpen] = useState(false);

  const [fullName, setFullName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [department, setDepartment] = useState('Computer Science & AI');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+1 (555) 482-9910');
  const [weeklyHours, setWeeklyHours] = useState(14);

  const filtered = staff.filter((s) => {
    const matchText =
      !search ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.staffId.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All Departments' || s.department === deptFilter;
    return matchText && matchDept;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#006e2c]">Admin Portal &gt; Staff Management & Faculty Governance</p>
          <div className="flex items-center gap-2.5 mt-1 flex-wrap">
            <h1 className="text-2xl font-extrabold">Faculty & Staff Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] text-xs font-bold">
              AY 2024–2025
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage institutional professors, department deans, teaching assistants, and administrative personnel.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add New Staff</span>
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Total Staff</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">{159 + staff.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Active Staff</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">
            {148 + staff.filter((s) => s.status === 'On Duty').length} (92.68% On Duty)
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Newly Added Staff</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">18 (Fall 2024)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500">Inactive / Sabbatical</span>
          <p className="text-2xl font-extrabold tabular-nums mt-1">
            {11 + staff.filter((s) => s.status !== 'On Duty').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by faculty name or staff ID..."
          className="h-10 px-3.5 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs flex-1 min-w-[200px]"
        />
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs font-bold"
        >
          <option>All Departments</option>
          <option>Computer Science & AI</option>
          <option>Mechanical & Mechatronics</option>
          <option>Applied Mathematics</option>
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs min-w-[780px]">
          <thead className="bg-[#f2f3ff] dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-4 font-bold">Faculty / Staff Member</th>
              <th className="p-4 font-bold">Staff ID</th>
              <th className="p-4 font-bold">Department</th>
              <th className="p-4 font-bold">Designation</th>
              <th className="p-4 font-bold">Contact Info</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[#d0eb78] text-[#3d4d00] font-bold flex items-center justify-center shrink-0">
                      {f.initials}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{f.fullName}</span>
                  </div>
                </td>
                <td className="p-4 font-mono font-bold text-[#006e2c]">{f.staffId}</td>
                <td className="p-4 font-semibold">{f.department}</td>
                <td className="p-4">{f.designation}</td>
                <td className="p-4">
                  <p className="font-semibold">{f.email}</p>
                  <p className="text-[11px] text-slate-500 tabular-nums">{f.phone}</p>
                </td>
                <td className="p-4">
                  <select
                    value={f.status}
                    onChange={(e) => void onUpdateStatus(f.id, e.target.value as StaffRegistryItem['status'])}
                    className={`px-2.5 py-1 rounded-full font-bold text-[11px] cursor-pointer ${
                      f.status === 'On Duty'
                        ? 'bg-emerald-100 text-[#006e2c]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <option value="On Duty">On Duty</option>
                    <option value="Sabbatical">Sabbatical</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button
                    type="button"
                    onClick={() => void onDeleteStaff(f.id)}
                    aria-label="Remove staff member"
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Onboard Faculty / Staff</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onAddStaff({
                  fullName,
                  staffId,
                  department,
                  designation,
                  email,
                  phone,
                  weeklyHours,
                });
                setFullName('');
                setStaffId('');
                setEmail('');
                setModalOpen(false);
              }}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Faculty Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Priya Sharma"
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Staff ID</label>
                  <input
                    type="text"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder="FAC-2024-1102"
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  >
                    <option>Computer Science & AI</option>
                    <option>Mechanical & Mechatronics</option>
                    <option>Applied Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Institutional Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Weekly Hours</label>
                  <input
                    type="number"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer">
                  Onboard Staff
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
/* 4. ADMIN EXECUTIVE PROFILE & CREDENTIALS VIEW (PRIMARY HTML REFERENCE)     */
/* -------------------------------------------------------------------------- */
interface AdminExecutiveProfileProps {
  profile: UserProfile;
  auditLogs: AuditLogItem[];
  onSaveProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const AdminExecutiveProfileView: React.FC<AdminExecutiveProfileProps> = ({
  profile,
  auditLogs,
  onSaveProfile,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [dossierDone, setDossierDone] = useState(false);

  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [altPhone, setAltPhone] = useState(profile.altPhone);
  const [recoveryEmail, setRecoveryEmail] = useState(profile.recoveryEmail);
  const [officeLocation, setOfficeLocation] = useState(profile.officeLocation);
  const [officeHours, setOfficeHours] = useState(profile.officeHours);
  const [emergencyContact, setEmergencyContact] = useState(profile.emergencyContact);
  const [newPass, setNewPass] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const copyText = (val: string) => {
    void navigator.clipboard.writeText(val);
    setCopiedKey(val);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const passScore =
    newPass.length === 0 ? 0 : newPass.length < 6 ? 1 : newPass.length < 10 ? 2 : newPass.length < 14 ? 3 : 4;

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-white dark:bg-slate-900 border border-emerald-200 shadow-xl rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#30b155] text-white flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Central Directory Synchronized</p>
            <p className="text-[11px] text-[#006e2c]">{toastMsg}</p>
          </div>
        </div>
      )}

      {/* Breadcrumb & Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Admin Portal &gt; Executive Governance &gt;{' '}
            <span className="text-[#006e2c] font-bold">Administrator Profile</span>
          </p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Executive Profile & Credentials
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#556a00] text-xs font-bold">
              Level-5 Root Clearance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage personal records, security access permissions, institutional affiliations, and emergency protocols.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            type="button"
            onClick={() => {
              setDossierDone(true);
              setTimeout(() => setDossierDone(false), 2000);
            }}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#6f5c36]" />
            <span>{dossierDone ? 'Dossier Downloaded' : 'Export Dossier (PDF)'}</span>
          </button>
          <button
            type="button"
            onClick={() => setPassOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Key className="w-4 h-4 text-[#006e2c]" />
            <span>Change Password</span>
          </button>
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="px-4 py-2.5 rounded-xl edutrack-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Hero Profile Banner Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#d0eb78]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative w-24 h-24 shrink-0">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#006e2c] via-[#30b155] to-[#d0eb78]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover bg-slate-100"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#30b155] border-2 border-white flex items-center justify-center text-white">
                <Check className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {profile.fullName}, Ph.D.
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#d0eb78] text-[#556a00] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Super Administrator
                </span>
                <button
                  type="button"
                  onClick={() => copyText(profile.institutionalId)}
                  className="px-2.5 py-0.5 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 font-mono text-xs font-bold text-[#006e2c] flex items-center gap-1 cursor-pointer"
                >
                  <span>{copiedKey === profile.institutionalId ? 'Copied!' : profile.institutionalId}</span>
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                {profile.designation} <span className="text-slate-500">• {profile.division}</span>
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#006e2c]" /> {profile.officeLocation}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#6f5c36]" /> Tenure: {profile.tenure}
                </span>
                <span className="flex items-center gap-1">
                  <Fingerprint className="w-3.5 h-3.5 text-[#006e2c]" /> 2FA: {profile.twoFactor}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className="flex items-center gap-3 bg-[#f2f3ff] dark:bg-slate-800 px-4 py-3 rounded-xl">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-700"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#30b155]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="100, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute text-[11px] font-extrabold tabular-nums">100%</span>
              </div>
              <div>
                <p className="text-xs font-bold">Profile Integrity</p>
                <p className="text-[11px] text-[#006e2c] font-semibold">Fully Verified Dossier</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#f2f3ff] dark:bg-slate-800 px-3.5 py-2 rounded-xl">
                <p className="text-[11px] text-slate-500">Managed Units</p>
                <p className="text-sm font-extrabold">8 Faculties</p>
              </div>
              <div className="bg-[#f2f3ff] dark:bg-slate-800 px-3.5 py-2 rounded-xl">
                <p className="text-[11px] text-slate-500">Direct Reports</p>
                <p className="text-sm font-extrabold tabular-nums">164 Personnel</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Executive Detail Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-extrabold">Personal Information</h3>
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="text-xs font-bold text-[#006e2c] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500">Full Legal Name</p>
                <p className="font-semibold mt-0.5">{profile.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Date of Birth</p>
                <p className="font-semibold mt-0.5">{profile.dob}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Gender</p>
                <p className="font-semibold mt-0.5">{profile.gender}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Primary Institutional Phone</p>
                <p className="font-semibold mt-0.5 flex items-center gap-1 tabular-nums">
                  {profile.phone} <BadgeCheck className="w-4 h-4 text-[#006e2c]" />
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Alternate Mobile Line</p>
                <p className="font-semibold mt-0.5 tabular-nums">{profile.altPhone}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Institutional Email Address</p>
                <p className="font-semibold text-[#006e2c] mt-0.5">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Personal Recovery Email</p>
                <p className="font-semibold mt-0.5">{profile.recoveryEmail}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Emergency Point of Contact</p>
                <p className="font-semibold mt-0.5">{profile.emergencyContact}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Official Residential Address</p>
                <p className="font-semibold mt-0.5">{profile.address}</p>
              </div>
            </div>
          </div>

          {/* Professional Credentials */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-extrabold">Professional Credentials & Tenureship</h3>
              <span className="px-2.5 py-0.5 rounded-lg bg-[#eef2ff] text-xs font-semibold text-slate-700">
                Verified Tenured
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500">Designation Title</p>
                <p className="font-semibold mt-0.5">{profile.designation}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Assigned Division</p>
                <p className="font-semibold mt-0.5">{profile.department}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500 mb-1.5">Conferred Academic Qualifications</p>
                <div className="flex flex-wrap gap-2">
                  {(profile.qualifications || []).map((q) => (
                    <span
                      key={q}
                      className="px-3 py-1.5 rounded-lg bg-[#f2f3ff] dark:bg-slate-800 text-xs font-semibold"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500">Campus Physical Office</p>
                <p className="font-semibold mt-0.5">{profile.officeLocation}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Standing Consultation Hours</p>
                <p className="font-semibold mt-0.5">{profile.officeHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold">Security & IAM Credentials</h3>
              <button
                type="button"
                onClick={() => setAuditOpen(true)}
                className="text-xs font-bold text-[#006e2c] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <History className="w-3.5 h-3.5" /> Audit Trail
              </button>
            </div>
            <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-500">Directory Username</p>
                <p className="font-mono font-bold text-sm">{profile.username}</p>
              </div>
              <button type="button" onClick={() => copyText(profile.username)} className="cursor-pointer text-slate-500 hover:text-[#006e2c]">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Account Security State</span>
                <span className="font-bold text-[#006e2c]">Active • Unrestricted Administrator</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Multi-Factor Status</span>
                <span className="px-2 py-0.5 rounded-full bg-[#d0eb78] text-[#3d4d00] font-bold">Enforced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Authenticated</span>
                <span className="font-semibold">Today, 08:15 AM (Cambridge VPN)</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPassOpen(true)}
                className="py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-xs font-bold cursor-pointer"
              >
                Update Key
              </button>
              <button
                type="button"
                onClick={() => showToast('YubiKey 5C NFC & Authenticator App verified active.')}
                className="py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-xs font-bold cursor-pointer"
              >
                Manage 2FA
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-base font-extrabold">Permissions & Policy Matrix</h3>
            {[
              { name: 'User Directory IAM', badge: 'Read / Write / Delete', primary: true },
              { name: 'Financial Disbursals', badge: 'Tier-3 Sign-Off', primary: false },
              { name: 'Curricula Certification', badge: 'Unrestricted', primary: true },
              { name: 'Payroll & Staff Appraisals', badge: 'Authorized Signatory', primary: false },
            ].map((perm) => (
              <div
                key={perm.name}
                className="p-2.5 rounded-xl bg-[#f2f3ff]/70 dark:bg-slate-800 flex items-center justify-between text-xs"
              >
                <span className="font-bold">{perm.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-md font-bold ${
                    perm.primary ? 'bg-[#30b155] text-white' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {perm.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Edit Executive Profile</h3>
              <button type="button" onClick={() => setEditOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onSaveProfile({
                  fullName,
                  phone,
                  altPhone,
                  recoveryEmail,
                  officeLocation,
                  officeHours,
                  emergencyContact,
                });
                setEditOpen(false);
                showToast('Executive profile modifications saved successfully.');
              }}
              className="grid grid-cols-2 gap-3.5"
            >
              <div className="col-span-2">
                <label className="block text-xs font-bold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Primary VOIP Extension</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Alternate Mobile</label>
                <input
                  type="text"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold mb-1">Personal Recovery Email</label>
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Office Location</label>
                <input
                  type="text"
                  value={officeLocation}
                  onChange={(e) => setOfficeLocation(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Consultation Hours</label>
                <input
                  type="text"
                  value={officeHours}
                  onChange={(e) => setOfficeHours(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold mb-1">Emergency Contact</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="col-span-2 flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl edutrack-gradient-btn text-white text-xs font-bold cursor-pointer">
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Change Administrative Passphrase</h3>
              <button type="button" onClick={() => setPassOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPassOpen(false);
                setNewPass('');
                showToast('Your administrative passphrase was updated securely.');
              }}
              className="space-y-3.5"
            >
              <input
                type="password"
                placeholder="Current passphrase"
                required
                className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
              />
              <div>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="New strong password (min 14 chars)"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
                />
                <div className="flex items-center gap-1.5 mt-2">
                  {[1, 2, 3, 4].map((b) => (
                    <div
                      key={b}
                      className={`h-1 flex-1 rounded-full ${
                        passScore >= b ? 'bg-[#30b155]' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-bold text-[#006e2c] ml-1">
                    {passScore === 4 ? 'Fortified' : passScore === 3 ? 'Strong' : passScore > 0 ? 'Moderate' : 'Empty'}
                  </span>
                </div>
              </div>
              <input
                type="password"
                placeholder="Confirm new password"
                required
                className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-sm"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#006e2c] text-white text-xs font-bold cursor-pointer">
                Update Passphrase
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Audit Trail Modal */}
      {auditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Security Audit Log</h3>
              <button type="button" onClick={() => setAuditOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-2.5 max-h-72 overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>{log.title}</span>
                    <span className="text-[#006e2c]">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">{log.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
