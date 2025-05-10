import { AppHeader } from "@/components/navigation/AppHeader";
import { AdminSidebar } from "@/components/navigation/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-grow p-6 lg:ml-64 mt-16"> {/* Added mt-16 for header height */}
          {children}
        </main>
      </div>
       {/* Footer could be omitted for admin panel or kept minimal */}
    </div>
  );
}
