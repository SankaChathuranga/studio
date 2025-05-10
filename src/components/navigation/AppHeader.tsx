"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Car } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/ui/AppLogo";

// Mock authentication state
const useMockAuth = () => {
  // Simulate different user states by changing this value
  // return { isAuthenticated: false, userRole: null }; // Logged out
  // return { isAuthenticated: true, userRole: "customer" }; // Logged in as customer
  return { isAuthenticated: true, userRole: "admin" }; // Logged in as admin (for testing all links)
  // To test customer: return { isAuthenticated: true, userRole: "customer" };
};


export function AppHeader() {
  const pathname = usePathname();
  const { isAuthenticated, userRole } = useMockAuth(); // Replace with actual auth logic

  const navLinks = [
    ...(isAuthenticated && userRole === "customer"
      ? [
          { href: "/book-cab", label: "Book a Cab" },
          { href: "/my-bookings", label: "My Bookings" },
          { href: "/profile", label: "Profile" },
        ]
      : []),
    ...(isAuthenticated && userRole === "admin"
      ? [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/users", label: "Manage Users" },
          { href: "/dashboard/drivers", label: "Manage Drivers" },
          { href: "/dashboard/bookings", label: "Manage Bookings" },
          { href: "/profile", label: "Profile" },
        ]
      : []),
  ];

  const authLinks = !isAuthenticated
    ? [
        { href: "/login", label: "Login", variant: "outline" as const },
        { href: "/register", label: "Register", variant: "default" as const },
      ]
    : [{ href: "/login", label: "Logout", variant: "destructive" as const }]; // Simplified logout to login page

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">CabPro</span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {authLinks.map((link) => (
            <Button key={link.href} asChild variant={link.variant} size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <AppLogo className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-foreground">CabPro</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === link.href ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2"/>
                {authLinks.map((link) => (
                  <Button key={link.href} asChild variant={link.variant} className="w-full">
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
