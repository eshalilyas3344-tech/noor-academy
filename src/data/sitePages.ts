export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export const demoBlogPosts: BlogPost[] = [
  {
    slug: "building-a-consistent-quran-routine",
    category: "Learning habits",
    title: "Building a consistent Quran learning routine",
    excerpt: "Practical strategies for integrating meaningful, sustainable daily recitation into a demanding family or work schedule.",
    date: "September 12, 2026",
    readTime: "4 min read",
  },
  {
    slug: "choosing-the-right-learning-path",
    category: "Guidance",
    title: "Choosing the right learning path",
    excerpt: "A structured guide on assessing your current level—from Noorani Qaida foundations to advanced Tajweed and Hifdh.",
    date: "August 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "learning-as-a-family",
    category: "Families",
    title: "Making space for learning as a family",
    excerpt: "How parents can cultivate an encouraging, barakah-filled learning sanctuary for their children at home.",
    date: "August 15, 2026",
    readTime: "5 min read",
  },
  {
    slug: "the-value-of-patient-practice",
    category: "Reflection",
    title: "The value of patient practice in Quran recitation",
    excerpt: "The spiritual and cognitive benefits of gradual progress, precise phonetics, and compassionate teacher guidance.",
    date: "July 30, 2026",
    readTime: "5 min read",
  },
  {
    slug: "a-welcoming-first-lesson",
    category: "Getting started",
    title: "What makes a welcoming first lesson",
    excerpt: "What students and parents can expect during their introductory session with a certified Noor Academy teacher.",
    date: "July 14, 2026",
    readTime: "3 min read",
  },
  {
    slug: "learning-across-time-zones",
    category: "Global learning",
    title: "Learning across time zones with certified scholars",
    excerpt: "How our virtual classroom connects global students seamlessly with native Arabic speakers and Ijaza holders.",
    date: "June 25, 2026",
    readTime: "4 min read",
  },
];

export const blogPosts = demoBlogPosts;
export const blogCategories = [...new Set(demoBlogPosts.map((post) => post.category))];
