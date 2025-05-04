import {AppSidebar} from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          {/* <Navbar /> */}
          <div className="px-4">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
