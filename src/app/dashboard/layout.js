import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return <section className="flex min-h-screen">
    <DashboardSidebar></DashboardSidebar>
    <main className="flex-1 p-6">{children}</main>
</section>
}