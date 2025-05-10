import { AppHeader } from "@/components/navigation/AppHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex flex-grow items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      <footer className="border-t bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          &copy; {new Date().getFullYear()} CabPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
