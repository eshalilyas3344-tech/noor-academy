import { getCurrentUser } from "@/lib/auth/session";
import { listAttendance, listClasses, listCourses, listUsers } from "@/lib/db";

function escapePdfText(value: string) {
  return value.replace(/[\\()]/g, "\\$&").replace(/[^\x20-\x7E]/g, "?");
}

function makePdf(title: string, rows: string[]) {
  const lines = ["Noor Academy", title, `Generated: ${new Date().toISOString()}`, "", ...rows];
  const content = ["BT", "/F1 11 Tf", "50 780 Td", ...lines.flatMap((line, index) => [index ? "0 -18 Td" : "", `(${escapePdfText(line)}) Tj`]), "ET"].filter(Boolean).join("\n");
  const objects = [`<< /Type /Catalog /Pages 2 0 R >>`, `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `).join("\n")}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Uint8Array(Buffer.from(pdf, "binary"));
}

export async function GET(request: Request) {
  const auth = await getCurrentUser();
  if (!auth || auth.user.role !== "admin") return new Response("Administrator access required.", { status: 403 });
  const type = new URL(request.url).searchParams.get("type") ?? "overview";
  const rows = type === "attendance"
    ? listAttendance().map((item) => `${item.date} | ${item.student_name ?? "Student"} | ${item.class_title ?? "Class"} | ${item.status}`)
    : type === "students"
      ? listUsers("student").map((item) => `${item.full_name} | ${item.email} | ${item.status ?? "Active"}`)
      : type === "teachers"
        ? listUsers("teacher").map((item) => `${item.full_name} | ${item.email} | ${item.status ?? "Active"}`)
        : type === "courses"
          ? listCourses().map((item) => `${item.name} | ${item.level} | ${item.status}`)
          : listClasses().map((item) => `${item.title} | ${item.student_name ?? "Student"} | ${item.starts_at}`);
  const pdf = makePdf(`${type[0].toUpperCase()}${type.slice(1)} Report`, rows.length ? rows : ["No records available."]);
  return new Response(pdf, { headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="noor-academy-${type}-report.pdf"` } });
}
