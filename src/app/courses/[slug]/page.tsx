import { notFound } from "next/navigation";
import { CourseDetailPage } from "@/components/public/CourseDetailPage";
import { courses } from "@/data/publicPages";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();
  return <CourseDetailPage course={course} />;
}
