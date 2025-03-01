import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./(dashboard)/component/AppSidebar";
import NotificationsBell from "@/components/NotificationsBell";
import Link from "next/link";
import { File, LogOut } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="overflow-hidden">
      <AppSidebar />

      <main className="w-full flex-1 max-h-screen overflow-auto">
        <div className="flex items-center justify-between px-4 py-2">
          <SidebarTrigger />
          <NotificationsBell />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
