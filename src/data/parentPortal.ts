export type ParentChild = { id: string; name: string; age: string; country: string; course: string; teacher: string; progress: number; attendance: string; nextClass: string; level: string };

export const parentChildren: ParentChild[] = [
  { id: "ahmed", name: "Ahmed Khan", age: "11 years", country: "United Kingdom", course: "Quran with Tajweed", teacher: "Ustadh Tariq Al-Mansoor", progress: 72, attendance: "94%", nextClass: "Today · 6:00 PM", level: "Intermediate" },
  { id: "ayesha", name: "Ayesha Khan", age: "8 years", country: "United Kingdom", course: "Quran Reading", teacher: "Sheikh Ahmad Hassan", progress: 58, attendance: "96%", nextClass: "Tomorrow · 5:30 PM", level: "Beginner" },
  { id: "muhammad", name: "Muhammad Khan", age: "6 years", country: "United Kingdom", course: "Noorani Qaida", teacher: "Ustadh Tariq Al-Mansoor", progress: 84, attendance: "91%", nextClass: "Thursday · 4:00 PM", level: "Beginner" },
];

export const parentClasses = [
  { child: "Ahmed Khan", course: "Quran with Tajweed", teacher: "Ustadh Tariq Al-Mansoor", date: "Today", time: "6:00 PM", duration: "45 minutes", status: "Scheduled" },
  { child: "Ayesha Khan", course: "Quran Reading", teacher: "Sheikh Ahmad Hassan", date: "Tomorrow", time: "5:30 PM", duration: "45 minutes", status: "Confirmed" },
  { child: "Muhammad Khan", course: "Noorani Qaida", teacher: "Ustadh Tariq Al-Mansoor", date: "Thursday", time: "4:00 PM", duration: "30 minutes", status: "Scheduled" },
  { child: "Ahmed Khan", course: "Quran Reading", teacher: "Sheikh Ahmad Hassan", date: "Sep 12", time: "6:00 PM", duration: "45 minutes", status: "Completed" },
];

export const parentAssignments = [
  { title: "Tajweed practice recording", child: "Ahmed Khan", course: "Quran with Tajweed", teacher: "Ustadh Tariq Al-Mansoor", due: "Friday", status: "Pending", grade: "Pending Review", feedback: "Awaiting submission evaluation" },
  { title: "Reading reflection", child: "Ayesha Khan", course: "Quran Reading", teacher: "Sheikh Ahmad Hassan", due: "Last week", status: "Graded", grade: "94%", feedback: "Clear pronunciation of heavy letters. Excellent effort." },
  { title: "Weekly memorization review", child: "Muhammad Khan", course: "Noorani Qaida", teacher: "Ustadh Tariq Al-Mansoor", due: "Monday", status: "Submitted", grade: "Under Review", feedback: "Teacher is reviewing the recorded practice." },
];

export const parentMaterials = [
  { title: "Tajweed lesson notes", type: "Teacher Notes", child: "Ahmed Khan", course: "Quran with Tajweed", date: "Sep 15, 2026" },
  { title: "Reading practice worksheet", type: "Worksheet", child: "Ayesha Khan", course: "Quran Reading", date: "Sep 12, 2026" },
  { title: "Recitation audio guide", type: "Audio", child: "Ahmed Khan", course: "Quran with Tajweed", date: "Sep 10, 2026" },
  { title: "Revision resource", type: "Quran Resource", child: "Muhammad Khan", course: "Noorani Qaida", date: "Sep 08, 2026" },
];

export const parentFeedback = [
  { teacher: "Ustadh Tariq Al-Mansoor", date: "Sep 16, 2026", course: "Quran with Tajweed", child: "Ahmed Khan", performance: "Strong progress", strengths: "Consistency and careful listening", improve: "Continue practicing pause points", comments: "Ahmed is focused and engaged during recitation exercises." },
  { teacher: "Sheikh Ahmad Hassan", date: "Sep 14, 2026", course: "Quran Reading", child: "Ayesha Khan", performance: "Growing confidence", strengths: "Letter recognition and vowel elongation", improve: "Build reading fluency through daily 10-minute repetition", comments: "Ayesha is showing excellent enthusiasm in each lesson." },
];

export const parentNotifications = [
  { title: "Upcoming class", text: "Ahmed Khan has a Tajweed class scheduled today at 6:00 PM.", type: "Upcoming Class", unread: true },
  { title: "Teacher feedback", text: "New teacher notes have been submitted for Ayesha Khan.", type: "Teacher Feedback", unread: true },
  { title: "Assignment update", text: "Ayesha Khan's reading reflection has been graded.", type: "Assignment", unread: false },
];

export const parentAttendance = [
  ["Sep 16", "Ahmed Khan", "Quran with Tajweed", "Ustadh Tariq Al-Mansoor", "Present"],
  ["Sep 14", "Ayesha Khan", "Quran Reading", "Sheikh Ahmad Hassan", "Present"],
  ["Sep 11", "Muhammad Khan", "Noorani Qaida", "Ustadh Tariq Al-Mansoor", "Late"],
  ["Sep 09", "Ahmed Khan", "Quran Reading", "Sheikh Ahmad Hassan", "Absent"],
];
