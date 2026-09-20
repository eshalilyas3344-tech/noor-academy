import { notFound } from "next/navigation";
import { TeacherDetailPage } from "@/components/public/TeacherDetailPage";
import { teachers } from "@/data/publicPages";

export function generateStaticParams() {
  return teachers.map((teacher) => ({ id: teacher.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teacher = teachers.find((item) => item.id === id);
  if (!teacher) notFound();
  return <TeacherDetailPage teacher={teacher} />;
}
