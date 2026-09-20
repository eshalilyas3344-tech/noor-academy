import { StudentPortal } from "@/components/student/StudentPortal";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudentPortal section="course-detail" courseId={id} />;
}
