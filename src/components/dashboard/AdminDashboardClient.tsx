"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Car, BookMarked, ArrowRight } from "lucide-react";
import { mockUsers, mockDrivers, mockBookings } from "@/lib/mockData";
import { useEffect, useState } from "react";

interface Stats {
  totalUsers: number;
  totalDrivers: number;
  pendingBookings: number;
  activeBookings: number;
}

export function AdminDashboardClient() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDrivers: 0,
    pendingBookings: 0,
    activeBookings: 0,
  });

  useEffect(() => {
    // Simulate fetching stats
    const pending = mockBookings.filter(b => b.status === "Pending").length;
    const active = mockBookings.filter(b => b.status === "Assigned" || b.status === "InProgress").length;
    setStats({
      totalUsers: mockUsers.length,
      totalDrivers: mockDrivers.length,
      pendingBookings: pending,
      activeBookings: active,
    });
  }, []);

  const dashboardCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Manage all registered users.",
      link: "/dashboard/users",
      color: "text-sky-500",
      bgColor: "bg-sky-50",
    },
    {
      title: "Total Drivers",
      value: stats.totalDrivers,
      icon: Car,
      description: "View and manage driver profiles.",
      link: "/dashboard/drivers",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: BookMarked,
      description: "Assign drivers to new requests.",
      link: "/dashboard/bookings",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
     {
      title: "Active Bookings",
      value: stats.activeBookings,
      icon: BookMarked,
      description: "Monitor ongoing rides.",
      link: "/dashboard/bookings", // Can filter on booking page for active
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Card key={card.title} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-xs text-muted-foreground pt-1">{card.description}</p>
            </CardContent>
            <CardContent className="pt-0">
                 <Button variant="outline" size="sm" asChild className="w-full group">
                    <Link href={card.link}>
                        View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Perform common administrative tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                    <Link href="/dashboard/drivers/add"><Car className="mr-2 h-4 w-4"/> Add New Driver</Link>
                </Button>
                <Button asChild className="w-full justify-start">
                    <Link href="/dashboard/bookings"><BookMarked className="mr-2 h-4 w-4"/> Process Booking Queue</Link>
                </Button>
                 <Button asChild className="w-full justify-start">
                    <Link href="/dashboard/users"><Users className="mr-2 h-4 w-4"/> Review User Accounts</Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Recent Activity (Placeholder)</CardTitle>
                <CardDescription>Overview of recent platform events.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>New user 'John B.' registered.</li>
                    <li>Booking #B00124 completed by Driver 'Sarah M.'.</li>
                    <li>Driver 'Mike K.' updated their availability.</li>
                    <li>New booking request from 'Alice W.'.</li>
                </ul>
                 <Button variant="link" className="mt-4 px-0">View All Activity Logs</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
