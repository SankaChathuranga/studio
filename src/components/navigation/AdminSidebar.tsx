"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Car, BookMarked, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/ui/AppLogo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const adminNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/users", label: "Manage Users", icon: Users },
  { href: "/dashboard/drivers", label: "Manage Drivers", icon: Car },
  { href: "/dashboard/bookings", label: "Manage Bookings", icon: BookMarked },
  { href: "/profile", label: "Profile Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r bg-card fixed top-0 left-0 h-full z-40 pt-16">
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
            <Link href="/dashboard" className="flex items-center gap-2 mb-6 px-2">
                <AppLogo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">CabPro Admin</span>
            </Link>
            <nav className="space-y-1">
            {adminNavItems.map((item) => (
                <Button
                key={item.label}
                variant={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)) ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
                >
                <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </Link>
                </Button>
            ))}
            </nav>
        </div>
        <Separator className="my-4" />
        <div className="p-4">
             <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-destructive"
                asChild
                >
                <Link href="/login"> {/* Simplified logout */}
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Link>
            </Button>
        </div>
      </div>
    </aside>
  );
}
