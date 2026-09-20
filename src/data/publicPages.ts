import type { LucideIcon } from "lucide-react";
import { BookOpen, Brain, Languages, MessageCircle, Sparkles, UsersRound } from "lucide-react";

export type CourseRecord = {
  slug: string;
  title: string;
  description: string;
  level: string;
  ageGroup: string;
  classType: string;
  category: string;
  icon: LucideIcon;
  tint: string;
  objectives: string[];
  modules: string[];
  outcomes: string[];
  audience: string;
};

export type TeacherRecord = {
  id: string;
  name: string;
  specialization: string;
  languages: string[];
  level: string;
  availability: string;
  introduction: string;
  approach: string;
  expertise: string[];
  initials: string;
};

export const courses: CourseRecord[] = [
  {
    slug: "noorani-qaida",
    title: "Noorani Qaida",
    description: "Build a confident foundation in Arabic letters, sounds, and first reading patterns.",
    level: "Beginner",
    ageGroup: "Children & adults",
    classType: "One-to-one",
    category: "Foundations",
    icon: BookOpen,
    tint: "#eaf4ef",
    objectives: ["Recognize Arabic letters with confidence", "Build accurate pronunciation habits", "Read foundational combinations at a steady pace"],
    modules: ["Letters and sounds", "Joining letters", "Short and long vowels", "Reading practice"],
    outcomes: ["More confident letter recognition", "A stronger reading foundation", "A clear next step into Quran reading"],
    audience: "New learners, returning learners, and children beginning their Quran journey.",
  },
  {
    slug: "quran-reading",
    title: "Quran Reading",
    description: "Develop fluency and confidence through guided reading practice at your pace.",
    level: "Beginner to intermediate",
    ageGroup: "All ages",
    classType: "One-to-one",
    category: "Reading",
    icon: Languages,
    tint: "#f5f1e8",
    objectives: ["Read connected Arabic text more fluently", "Strengthen pronunciation through repetition", "Build a consistent independent reading rhythm"],
    modules: ["Reading fluency", "Common reading patterns", "Guided correction", "Independent practice"],
    outcomes: ["Greater reading confidence", "A repeatable practice routine", "Clearer teacher feedback between lessons"],
    audience: "Learners who know the basics and want to read with greater ease.",
  },
  {
    slug: "quran-with-tajweed",
    title: "Quran with Tajweed",
    description: "Learn the principles that bring clarity and care to Quran recitation.",
    level: "Intermediate",
    ageGroup: "Children & adults",
    classType: "One-to-one",
    category: "Recitation",
    icon: Sparkles,
    tint: "#eaf0f5",
    objectives: ["Understand essential Tajweed principles", "Apply rules during guided recitation", "Develop a more measured reading style"],
    modules: ["Articulation points", "Noon and Meem rules", "Madd and stopping", "Applied recitation"],
    outcomes: ["More deliberate recitation", "Useful rule recognition", "A personal practice plan"],
    audience: "Learners ready to improve the accuracy and quality of their recitation.",
  },
  {
    slug: "quran-memorization",
    title: "Quran Memorization",
    description: "Create a sustainable, encouraging rhythm for memorization goals.",
    level: "All levels",
    ageGroup: "Children & adults",
    classType: "One-to-one",
    category: "Memorization",
    icon: Brain,
    tint: "#f4ede5",
    objectives: ["Set a realistic memorization rhythm", "Use review patterns that support retention", "Track progress with teacher guidance"],
    modules: ["Goal setting", "New passage practice", "Revision cycles", "Progress reflection"],
    outcomes: ["A manageable memorization routine", "Clear review checkpoints", "Encouraging progress visibility"],
    audience: "Learners who want a structured, sustainable approach to memorization.",
  },
  {
    slug: "translation-tafseer",
    title: "Translation & Tafseer",
    description: "Explore meaning and context through thoughtful, age-appropriate guidance.",
    level: "Intermediate",
    ageGroup: "Adults & teens",
    classType: "One-to-one",
    category: "Understanding",
    icon: MessageCircle,
    tint: "#edf5f3",
    objectives: ["Connect verses with accessible meaning", "Explore context through guided discussion", "Build a reflective learning practice"],
    modules: ["Translation foundations", "Context and themes", "Guided reflection", "Personal study"],
    outcomes: ["More meaningful reading", "Stronger vocabulary awareness", "A framework for continued study"],
    audience: "Teens and adults who want to deepen understanding alongside reading.",
  },
  {
    slug: "islamic-studies",
    title: "Islamic Studies",
    description: "Grow essential knowledge through clear, engaging lessons and reflection.",
    level: "Beginner to advanced",
    ageGroup: "Children & teens",
    classType: "One-to-one",
    category: "Foundations",
    icon: UsersRound,
    tint: "#f6f2e8",
    objectives: ["Build age-appropriate foundational knowledge", "Connect learning to daily life", "Encourage thoughtful questions and reflection"],
    modules: ["Faith foundations", "Stories and lessons", "Practice and character", "Review and reflection"],
    outcomes: ["A stronger knowledge foundation", "More confident discussion", "A learning plan that grows with the student"],
    audience: "Children and teens beginning or continuing their Islamic studies.",
  },
];

export const teachers: TeacherRecord[] = [
  {
    id: "ustadh-tariq",
    name: "Ustadh Tariq Al-Mansoor",
    specialization: "Quran reading & Tajweed",
    languages: ["English", "Arabic"],
    level: "All levels",
    availability: "Mon – Thu (Afternoons & Evenings)",
    introduction: "Certified Qari with an Ijazah in Hafs 'an 'Asim and over 12 years of experience guiding learners of all ages worldwide.",
    approach: "Patient, structured, and responsive to each learner's starting point with systematic phonetic correction and warmth.",
    expertise: ["Quran Reading", "Quran with Tajweed", "Makharij & Sifaat"],
    initials: "TA",
  },
  {
    id: "sheikh-ahmad",
    name: "Sheikh Ahmad Al-Husseini",
    specialization: "Memorization & Recitation",
    languages: ["English", "Urdu", "Arabic"],
    level: "Beginner to advanced",
    availability: "Flexible weekdays & weekends",
    introduction: "Hafidh of the Holy Quran with extensive experience coaching Hifdh students to complete full revision cycles.",
    approach: "Encouraging and consistent, building sustainable daily revision habits, retention techniques, and vocal confidence.",
    expertise: ["Quran Memorization", "Muraja'ah Systems", "Recitation Mastery"],
    initials: "AH",
  },
  {
    id: "ustadha-mariam",
    name: "Ustadha Mariam Siddiq",
    specialization: "Islamic Studies & Tajweed",
    languages: ["English", "Arabic"],
    level: "Children & teens",
    availability: "Weekdays (Mornings & Afternoons)",
    introduction: "Passionate educator specializing in child pedagogy, foundational Tajweed, and interactive Islamic studies.",
    approach: "Warm, engaging, and designed to inspire curious young minds and build a lasting love for the Book of Allah.",
    expertise: ["Islamic Studies", "Noorani Qaida", "Youth Mentorship"],
    initials: "MS",
  },
  // Fallback aliases for any legacy route links
  {
    id: "demo-quran-teacher",
    name: "Ustadh Tariq Al-Mansoor",
    specialization: "Quran reading & Tajweed",
    languages: ["English", "Arabic"],
    level: "All levels",
    availability: "Mon – Thu (Afternoons & Evenings)",
    introduction: "Certified Qari with an Ijazah in Hafs 'an 'Asim and over 12 years of experience guiding learners of all ages.",
    approach: "Patient, structured, and responsive to each learner's starting point with systematic phonetic correction.",
    expertise: ["Quran Reading", "Quran with Tajweed"],
    initials: "TA",
  },
  {
    id: "demo-memorization-teacher",
    name: "Sheikh Ahmad Al-Husseini",
    specialization: "Memorization & Recitation",
    languages: ["English", "Urdu"],
    level: "Beginner to advanced",
    availability: "Flexible weekdays & weekends",
    introduction: "Hafidh of the Holy Quran with extensive experience coaching Hifdh students to complete revision cycles.",
    approach: "Encouraging and consistent, with a focus on sustainable daily practice.",
    expertise: ["Quran Memorization", "Recitation Mastery"],
    initials: "AH",
  },
  {
    id: "demo-studies-teacher",
    name: "Ustadha Mariam Siddiq",
    specialization: "Islamic Studies",
    languages: ["English", "Arabic"],
    level: "Children & teens",
    availability: "Weekdays (Mornings & Afternoons)",
    introduction: "Passionate educator specializing in child pedagogy, foundational Tajweed, and interactive Islamic studies.",
    approach: "Warm, clear, and designed to make space for thoughtful questions.",
    expertise: ["Islamic Studies", "Translation & Tafseer"],
    initials: "MS",
  },
];

export const innerFaqs = [
  ["Are class schedules flexible?", "Yes. All lessons are conducted one-on-one and scheduled around your availability, accommodating busy work, school, and family routines."],
  ["How does the free trial lesson work?", "Book a complimentary trial with no obligation. You will meet with a certified teacher, discuss your learning objectives, and receive a personal curriculum roadmap."],
  ["Can I choose a male or female teacher?", "Yes. Noor Academy provides both qualified male and female teachers, and you can specify your preference when requesting a trial or enrolling."],
];

export const teacherFaqs = [
  ["What qualifications do Noor Academy teachers possess?", "All teachers hold authentic Ijazah certifications with sanad (chains of transmission), graduated from renowned Islamic institutions, and undergo rigorous background screening."],
  ["Can I request a specific teacher?", "Yes. You can select your preferred instructor from our directory or request specific language and teaching style preferences during enrollment."],
];
