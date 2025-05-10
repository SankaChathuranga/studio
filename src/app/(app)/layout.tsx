import { AppHeader } from "@/components/navigation/AppHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        {children}
      </main>
      <footer className="border-t bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          &copy; {new Date().getFullYear()} CabPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
