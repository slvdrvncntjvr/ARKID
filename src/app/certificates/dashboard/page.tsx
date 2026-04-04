import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { CertificatesDashboard } from "@/components/certificates-dashboard";

export default async function CertificatesDashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/certificates/login");
  }

  return <CertificatesDashboard username={session.username || "admin"} />;
}
