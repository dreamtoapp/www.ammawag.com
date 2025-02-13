// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-100 text-gray-800">
      {/* Header */}
      <SidebarHeader className="p-4 border-b">
        <h1 className="text-lg font-bold">Amwag Dashboard</h1>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-4 space-y-4">
        {/* Group 1: Main Navigation */}
        <SidebarGroup>
          <h2 className="text-sm font-semibold mb-2">Main</h2>
          <Link href="/dashboard/suppliers">
            <Button variant="ghost" className="w-full justify-start">
              Suppliers
            </Button>
          </Link>
          <Link href="/dashboard/porductmangment">
            <Button variant="ghost" className="w-full justify-start">
              Products
            </Button>
          </Link>
          <Link href="/dashboard/orders">
            <Button variant="ghost" className="w-full justify-start">
              Orders
            </Button>
          </Link>
        </SidebarGroup>

        {/* Group 2: Management */}
        <SidebarGroup>
          <h2 className="text-sm font-semibold mb-2">Management</h2>
          <Link href="/dashboard/drivers">
            <Button variant="ghost" className="w-full justify-start">
              Drivers
            </Button>
          </Link>
          <Link href="/dashboard/promotions">
            <Button variant="ghost" className="w-full justify-start">
              Promotions
            </Button>
          </Link>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t">
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
