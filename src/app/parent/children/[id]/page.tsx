import { ParentPortal } from "@/components/parent/ParentPortal";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ParentPortal section="child-detail" childId={id} />;
}
