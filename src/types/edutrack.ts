export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserSettings {
  emailNotifications: boolean;
  assignmentAlerts: boolean;
  attendanceWarnings: boolean;
  examAlerts: boolean;
  campusBroadcasts: boolean;
  theme: 'light' | 'dark';
  density: 'standard' | 'compact';
}

export interface UserProfile {
  id: string;
  role: UserRole;
  institutionalId: string;
  fullName: string;
  displayTitle: string;
  email: string;
  recoveryEmail: string;
  phone: string;
  altPhone: string;
  department: string;
  division: string;
  designation: string;
  semester?: string;
  section?: string;
  cgpa?: number;
  dob: string;
  gender: string;
  officeLocation: string;
  officeHours: string;
  emergencyContact: string;
  address: string;
  avatarUrl: string;
  username: string;
  clearanceLevel?: string;
  tenure?: string;
  twoFactor?: string;
  qualifications?: string[];
  settings: UserSettings;
}

export interface AssignmentItem {
  id: string;
  code: string;
  title: string;
  description: string;
  courseCode: string;
  courseTitle: string;
  facultyName: string;
  targetSection: string;
  dueDate: string;
  dueWindow: string;
  timeLeft: string;
  maxMarks: number;
  status: 'In Progress' | 'Pending' | 'Submitted' | 'Graded' | 'Extended' | 'Critical';
  progress: number;
  isCritical: boolean;
  submissionsRatio?: string;
  submissionsPct?: number;
  submittedFile?: string;
  submittedAt?: string;
  marksObtained?: number;
  grade?: string;
  feedback?: string;
}

export interface SubmissionRecord {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseCode: string;
  studentName: string;
  studentCode: string;
  initials: string;
  fileName: string;
  submittedAt: string;
  submissionState: 'On-Time' | 'Late (2h)' | 'Pending';
  marks: number | null;
  maxMarks: number;
  feedback: string;
  grade: string;
  published: boolean;
}

export interface AttendanceRecord {
  id: string;
  sessionDate: string;
  dayNum: number;
  timeSlot: string;
  courseCode: string;
  courseTitle: string;
  room: string;
  facultyName: string;
  status: 'Present' | 'Absent' | 'Absent (Pending Med)' | 'Leave/OD' | 'Holiday';
}

export interface CourseEligibility {
  courseCode: string;
  courseTitle: string;
  attended: number;
  total: number;
  percentage: number;
}

export interface LeaveRequest {
  id: string;
  studentId?: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending Approval' | 'Approved';
  createdAt: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  slotNumber: 1 | 2 | 3;
  timeLabel: string;
  courseCode: string;
  courseTitle: string;
  sessionType: 'LEC' | 'LAB' | 'SEM' | 'PROJ' | 'FREE';
  facultyName: string;
  room: string;
  statusLabel: string;
  isLive?: boolean;
  isCompleted?: boolean;
}

export interface CalendarEvent {
  id: string;
  day: number;
  month: string;
  dateLabel: string;
  title: string;
  shortLabel: string;
  courseCode: string;
  timeRange: string;
  location: string;
  category: 'exam' | 'deadline' | 'workshop' | 'holiday' | 'academic';
  description: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: 'IMPORTANT NOTICE' | 'ACADEMIC' | 'EVENTS & WORKSHOP' | 'EXAMINATION';
  tag: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  attachmentLabel?: string;
  isRead: boolean;
  isBookmarked: boolean;
  isUrgent: boolean;
}

export interface ExamResultItem {
  id: string;
  examType: 'Semester V Final' | 'Model Examination' | 'Internal Assessment';
  courseCode: string;
  courseTitle: string;
  credits: number;
  maxMarks: number;
  score: number;
  grade: string;
  classAvg: number;
  isTop?: boolean;
}

export interface StudyMaterialItem {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  facultyName: string;
  unitLabel: string;
  fileType: 'PDF Notes' | 'PPT Slides' | 'Lab Code' | 'Q-Banks';
  badgeLabel: string;
  fileSize: string;
  updatedLabel: string;
  isUnread: boolean;
  isOffline: boolean;
}

export interface StudentRegistryItem {
  id: string;
  fullName: string;
  initials: string;
  admittedTerm: string;
  registerNo: string;
  department: string;
  specialization: string;
  yearLabel: string;
  semesterLabel: string;
  email: string;
  phone: string;
  attendancePct: number;
  status: 'Active' | 'On Leave' | 'Probation';
}

export interface StaffRegistryItem {
  id: string;
  fullName: string;
  initials: string;
  staffId: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  weeklyHours: number;
  status: 'On Duty' | 'Sabbatical' | 'Inactive';
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  formula?: string;
  formulaLabel?: string;
  groundedIn?: string;
}

export interface AiStudyThread {
  id: string;
  title: string;
  courseCode: string;
  subtitle: string;
  updatedLabel: string;
  messages: AiChatMessage[];
}

export interface AuditLogItem {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
}

export interface CampusActivityItem {
  id: string;
  title: string;
  detail: string;
  timeAgo: string;
  type: 'registration' | 'faculty' | 'curricula' | 'exam' | 'security';
}

export interface EduTrackDatabase {
  profiles: Record<UserRole, UserProfile>;
  assignments: AssignmentItem[];
  submissions: SubmissionRecord[];
  attendanceRecords: AttendanceRecord[];
  courseEligibility: CourseEligibility[];
  leaveRequests: LeaveRequest[];
  timetableSlots: TimetableSlot[];
  calendarEvents: CalendarEvent[];
  announcements: AnnouncementItem[];
  examResults: ExamResultItem[];
  studyMaterials: StudyMaterialItem[];
  studentRegistry: StudentRegistryItem[];
  staffRegistry: StaffRegistryItem[];
  aiThreads: AiStudyThread[];
  auditLogs: AuditLogItem[];
  campusActivity: CampusActivityItem[];
}
