import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { CertificatesDashboard } from "@/components/certificates-dashboard";
import { waitForLoadingWindow } from "@/lib/loading-delay";

export default async function CertificatesDashboardPage() {
  const [session] = await Promise.all([getSession(), waitForLoadingWindow()]);

  if (!session.isLoggedIn) {
    redirect("/certificates/login");
  }

  return <CertificatesDashboard username={session.username || "admin"} />;
}
