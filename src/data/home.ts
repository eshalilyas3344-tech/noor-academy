import type { LucideIcon } from "lucide-react";
import { BookOpen, Clock3, Globe2, HeartHandshake, Languages, LineChart, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

export type Course = {
  title: string;
  description: string;
  level: string;
  age: string;
  icon: LucideIcon;
  tone: string;
};

export const trustPoints = [
  { label: "Qualified teachers", icon: ShieldCheck },
  { label: "Flexible scheduling", icon: Clock3 },
  { label: "Personalized learning", icon: HeartHandshake },
  { label: "Global access", icon: Globe2 },
];

export const benefits = [
  { title: "Qualified teachers", text: "Learn with experienced, Ijaza-certified Quran educators in a calm, supportive setting.", icon: UsersRound },
  { title: "Flexible classes", text: "Find lesson times that fit around school, work, and family schedules across all time zones.", icon: Clock3 },
  { title: "Personalized learning", text: "A tailored learning path shaped around each student's pace, starting point, and goals.", icon: Sparkles },
  { title: "Learn from anywhere", text: "Bring a consistent Quran learning rhythm to wherever life takes you with our interactive classroom.", icon: Globe2 },
];

export const courses: Course[] = [
  { title: "Noorani Qaida", description: "Build a confident foundation in Arabic letters and pronunciation.", level: "Beginner", age: "Children & adults", icon: BookOpen, tone: "#eaf4ef" },
  { title: "Quran Reading", description: "Develop fluency and confidence through guided reading practice.", level: "Beginner to intermediate", age: "All ages", icon: Languages, tone: "#f5f1e8" },
  { title: "Quran with Tajweed", description: "Learn the principles that bring clarity and beauty to recitation.", level: "Intermediate", age: "Children & adults", icon: Sparkles, tone: "#eaf0f5" },
  { title: "Quran Memorization", description: "Create a sustainable, encouraging rhythm for memorization goals.", level: "All levels", age: "Children & adults", icon: LineChart, tone: "#f4ede5" },
  { title: "Translation & Tafseer", description: "Explore meaning and context with age-appropriate guidance.", level: "Intermediate", age: "Adults & teens", icon: HeartHandshake, tone: "#edf5f3" },
  { title: "Islamic Studies", description: "Grow understanding through essential knowledge and reflection.", level: "Beginner to advanced", age: "Children & teens", icon: ShieldCheck, tone: "#f6f2e8" },
];

export const learningSteps = [
  ["01", "Book a free trial", "Tell us what you hope to learn and when you are available."],
  ["02", "Meet your teacher", "Discover a supportive teaching style that feels right for you."],
  ["03", "Follow your plan", "Build a steady learning rhythm around your goals."],
  ["04", "Track your progress", "See your growth and keep moving forward with confidence."],
];

export const featuredTeachers = [
  { name: "Ustadh Tariq Al-Mansoor", specialty: "Quran reading & Tajweed", languages: "English · Arabic", initials: "TA" },
  { name: "Sheikh Ahmad Al-Husseini", specialty: "Memorization & recitation", languages: "English · Urdu · Arabic", initials: "AH" },
  { name: "Ustadha Mariam Siddiq", specialty: "Islamic studies & Tajweed", languages: "English · Arabic", initials: "MS" },
];

export const demoTeachers = featuredTeachers;

export const testimonials = [
  { quote: "Finding a teacher who understands how to teach children with patience and encouragement was transformative. My son looks forward to his Quran lessons every afternoon.", name: "Dr. Bilal Siddiqui", location: "London, UK" },
  { quote: "The Tajweed rules were broken down systematically so I could finally pronounce the heavy and soft letters accurately. The online platform makes scheduling effortless.", name: "Sarah Al-Mansoor", location: "Toronto, Canada" },
  { quote: "Having both student and parent portals lets us celebrate small milestones together. Noor Academy has brought a blessed rhythm into our home.", name: "Amina & Tariq Khan", location: "Sydney, Australia" },
];

export const pricingPlans = [
  { name: "Starter", description: "Ideal for steady foundational learning", monthly: "$49", yearly: "$39/mo", features: ["2 one-to-one lessons weekly", "Flexible lesson rescheduling", "Monthly progress evaluations", "Direct teacher feedback"] },
  { name: "Comprehensive", description: "Most popular for steady Tajweed & fluency", monthly: "$89", yearly: "$75/mo", features: ["4 one-to-one lessons weekly", "Dedicated Ijaza-certified tutor", "Parent & Student portal access", "Recorded revision sessions", "Tailored homework assignments"] },
  { name: "Intensive Hifdh", description: "Structured daily memorization & revision", monthly: "$139", yearly: "$119/mo", features: ["5 one-to-one lessons weekly", "Customized daily Muraja'ah plan", "Weekly oral recitation exams", "Priority scheduling & support", "Direct scholar mentorship"] },
];

export const faqs = [
  ["Who can learn with Noor Academy?", "Our programs welcome children from age 4, teenagers, and adult learners of all backgrounds, from absolute beginners to advanced reciters."],
  ["How are lessons scheduled?", "Lessons are scheduled around your convenience, 24/7, tailored to your local time zone and matched with qualified teachers worldwide."],
  ["Can I choose or change my teacher?", "Yes. You can specify gender and language preferences during onboarding, and request a teacher change at any time without interruption."],
  ["What technology do I need?", "A desktop computer, tablet, or smartphone with a stable internet connection, webcam, and microphone. No complex software installation is needed."],
];
