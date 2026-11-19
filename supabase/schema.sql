-- EduTrack AI — Supabase PostgreSQL Schema & Initial Seed
-- Run this script in your Supabase Project > SQL Editor to provision all tables.

create extension if not exists "pgcrypto";

-- 1. Profiles (Student, Faculty, Admin)
create table if not exists public.profiles (
  id text primary key,
  role text not null check (role in ('student', 'faculty', 'admin')),
  institutional_id text not null unique,
  full_name text not null,
  display_title text not null,
  email text not null unique,
  recovery_email text,
  phone text,
  alt_phone text,
  department text not null,
  division text,
  designation text,
  semester text,
  section text,
  cgpa numeric(4,2),
  dob text,
  gender text,
  office_location text,
  office_hours text,
  emergency_contact text,
  address text,
  avatar_url text,
  username text,
  clearance_level text,
  tenure text,
  two_factor text,
  settings jsonb not null default '{"emailNotifications": true, "assignmentAlerts": true, "attendanceWarnings": true, "examAlerts": true, "campusBroadcasts": true, "theme": "light", "density": "standard"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Assignments
create table if not exists public.assignments (
  id text primary key,
  code text not null,
  title text not null,
  description text not null,
  course_code text not null,
  course_title text not null,
  faculty_name text not null,
  target_section text not null,
  due_date text not null,
  due_window text not null,
  time_left text not null,
  max_marks integer not null default 50,
  status text not null check (status in ('In Progress', 'Pending', 'Submitted', 'Graded', 'Extended', 'Critical')),
  progress integer not null default 0,
  is_critical boolean not null default false,
  submitted_file text,
  submitted_at text,
  marks_obtained integer,
  grade text,
  feedback text,
  created_at timestamptz not null default now()
);

-- 3. Faculty Grading Submissions Ledger
create table if not exists public.submissions (
  id text primary key,
  assignment_id text not null,
  assignment_title text not null,
  course_code text not null,
  student_name text not null,
  student_code text not null,
  initials text not null,
  file_name text not null,
  submitted_at text not null,
  submission_state text not null check (submission_state in ('On-Time', 'Late (2h)', 'Pending')),
  marks integer,
  max_marks integer not null default 50,
  feedback text default '',
  grade text default 'Pending',
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

-- 4. Attendance Records & Leave Requests
create table if not exists public.attendance_records (
  id text primary key,
  session_date text not null,
  day_num integer not null,
  time_slot text not null,
  course_code text not null,
  course_title text not null,
  room text not null,
  faculty_name text not null,
  status text not null check (status in ('Present', 'Absent', 'Absent (Pending Med)', 'Leave/OD', 'Holiday')),
  created_at timestamptz not null default now()
);

create table if not exists public.leave_requests (
  id text primary key,
  student_id text not null,
  leave_type text not null,
  from_date text not null,
  to_date text not null,
  reason text not null,
  status text not null default 'Pending Approval',
  created_at timestamptz not null default now()
);

-- 5. Announcements & Circulars
create table if not exists public.announcements (
  id text primary key,
  title text not null,
  summary text not null,
  body text not null,
  category text not null check (category in ('IMPORTANT NOTICE', 'ACADEMIC', 'EVENTS & WORKSHOP', 'EXAMINATION')),
  tag text not null,
  author_name text not null,
  author_role text not null,
  published_at text not null,
  attachment_label text,
  is_read boolean not null default false,
  is_bookmarked boolean not null default false,
  is_urgent boolean not null default false,
  created_at timestamptz not null default now()
);

-- 6. Exam Results
create table if not exists public.exam_results (
  id text primary key,
  exam_type text not null check (exam_type in ('Semester V Final', 'Model Examination', 'Internal Assessment')),
  course_code text not null,
  course_title text not null,
  credits numeric(3,1) not null,
  max_marks integer not null default 100,
  score integer not null,
  grade text not null,
  class_avg integer not null,
  is_top boolean not null default false
);

-- 7. Study Materials
create table if not exists public.study_materials (
  id text primary key,
  title text not null,
  course_code text not null,
  course_name text not null,
  faculty_name text not null,
  unit_label text not null,
  file_type text not null check (file_type in ('PDF Notes', 'PPT Slides', 'Lab Code', 'Q-Banks')),
  badge_label text not null,
  file_size text not null,
  updated_label text not null,
  is_unread boolean not null default false,
  is_offline boolean not null default false,
  created_at timestamptz not null default now()
);

-- 8. Admin Student Registry & Staff Directory
create table if not exists public.student_registry (
  id text primary key,
  full_name text not null,
  initials text not null,
  admitted_term text not null,
  register_no text not null unique,
  department text not null,
  specialization text not null,
  year_label text not null,
  semester_label text not null,
  email text not null,
  phone text not null,
  attendance_pct numeric(5,2) not null default 92.0,
  status text not null check (status in ('Active', 'On Leave', 'Probation')),
  created_at timestamptz not null default now()
);

create table if not exists public.staff_registry (
  id text primary key,
  full_name text not null,
  initials text not null,
  staff_id text not null unique,
  department text not null,
  designation text not null,
  email text not null,
  phone text not null,
  weekly_hours numeric(4,1) not null default 14.0,
  status text not null check (status in ('On Duty', 'Sabbatical', 'Inactive')),
  created_at timestamptz not null default now()
);

-- 9. AI Study Threads & Audit Logs
create table if not exists public.ai_threads (
  id text primary key,
  title text not null,
  course_code text not null,
  subtitle text not null,
  updated_label text not null,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id text primary key,
  title text not null,
  detail text not null,
  timestamp_label text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (configure policies for your auth setup)
alter table public.profiles enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.attendance_records enable row level security;
alter table public.leave_requests enable row level security;
alter table public.announcements enable row level security;
alter table public.exam_results enable row level security;
alter table public.study_materials enable row level security;
alter table public.student_registry enable row level security;
alter table public.staff_registry enable row level security;
alter table public.ai_threads enable row level security;
alter table public.audit_logs enable row level security;
