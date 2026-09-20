export const studentCourses = [
  { id: "tajweed", title: "Quran with Tajweed", teacher: "Ustadh Tariq Al-Mansoor", progress: 68, next: "Lesson 12", total: 20, completed: 13 },
  { id: "reading", title: "Quran Reading", teacher: "Sheikh Ahmad Hassan", progress: 42, next: "Lesson 8", total: 18, completed: 8 },
  { id: "qaida", title: "Noorani Qaida", teacher: "Ustadh Tariq Al-Mansoor", progress: 84, next: "Revision", total: 14, completed: 12 },
  { id: "memorization", title: "Quran Memorization", teacher: "Sheikh Ahmad Hassan", progress: 31, next: "Review cycle", total: 24, completed: 7 },
  { id: "tafseer", title: "Translation & Tafseer", teacher: "Ustadh Tariq Al-Mansoor", progress: 25, next: "Module 2", total: 12, completed: 3 },
  { id: "studies", title: "Islamic Studies", teacher: "Ustadha Mariam Farooq", progress: 55, next: "Lesson 6", total: 16, completed: 9 },
];

export const upcomingClasses = [
  { course: "Quran with Tajweed", teacher: "Ustadh Tariq Al-Mansoor", date: "Today", time: "6:00 PM", duration: "45 minutes", status: "Scheduled" },
  { course: "Quran Reading", teacher: "Sheikh Ahmad Hassan", date: "Tomorrow", time: "5:30 PM", duration: "45 minutes", status: "Confirmed" },
  { course: "Noorani Qaida", teacher: "Ustadh Tariq Al-Mansoor", date: "Thursday", time: "4:00 PM", duration: "30 minutes", status: "Scheduled" },
];

export const lessons = [
  { title: "Madd and stopping", course: "Quran with Tajweed", duration: "45 min", status: "In Progress", progress: 68 },
  { title: "Reading fluency practice", course: "Quran Reading", duration: "40 min", status: "Upcoming", progress: 0 },
  { title: "Letters and sounds", course: "Noorani Qaida", duration: "30 min", status: "Completed", progress: 100 },
  { title: "Revision cycle one", course: "Quran Memorization", duration: "45 min", status: "Locked", progress: 0 },
];

export const assignments = [
  { title: "Tajweed practice recording", course: "Quran with Tajweed", due: "Friday", status: "Upcoming", teacher: "Ustadh Tariq Al-Mansoor" },
  { title: "Reading reflection", course: "Quran Reading", due: "Last week", status: "Graded", teacher: "Sheikh Ahmad Hassan" },
  { title: "Weekly memorization review", course: "Quran Memorization", due: "Monday", status: "Submitted", teacher: "Sheikh Ahmad Hassan" },
];

export const materials = [
  { title: "Tajweed lesson notes", type: "Teacher Notes", course: "Quran with Tajweed", date: "Sep 15, 2026" },
  { title: "Reading practice worksheet", type: "Worksheet", course: "Quran Reading", date: "Sep 12, 2026" },
  { title: "Recitation audio guide", type: "Audio", course: "Quran with Tajweed", date: "Sep 10, 2026" },
  { title: "Revision resource", type: "Quran Resource", course: "Memorization", date: "Sep 08, 2026" },
];

export const notifications = [
  { title: "Class reminder", text: "Your Quran with Tajweed class is scheduled for today at 6:00 PM.", type: "Class reminder", unread: true },
  { title: "Teacher feedback", text: "New feedback is ready for your recent recitation lesson.", type: "Teacher feedback", unread: true },
  { title: "Assignment update", text: "Your reading reflection has been marked as graded.", type: "Assignment", unread: false },
];

export const attendance = [
  ["Sep 16", "Quran with Tajweed", "Ustadh Tariq Al-Mansoor", "Present"],
  ["Sep 14", "Quran Reading", "Sheikh Ahmad Hassan", "Present"],
  ["Sep 11", "Noorani Qaida", "Ustadh Tariq Al-Mansoor", "Late"],
  ["Sep 09", "Quran Memorization", "Sheikh Ahmad Hassan", "Absent"],
];
