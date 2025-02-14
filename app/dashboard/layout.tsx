import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./(dashboard)/component/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-200 w-full p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
