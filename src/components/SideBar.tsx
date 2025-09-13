import { LogOut, TrendingUp, LayoutDashboard, ClipboardClock } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard /> },
  { title: "Backtester", url: "/backtester", icon: <TrendingUp /> },
  { title: "Results", url: "/results", icon: <ClipboardClock /> },
];

export default function CustomSidebar() {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
<Sidebar className="bg-black text-gray-200 border-r border-gray-800">
  <SidebarHeader className="bg-black text-gray-200 border-b border-gray-800">
<div className="flex items-center space-x-2">
  <TrendingUp className="h-8 w-8 text-green-500" />
  <span className="text-xl font-bold">Stratify</span>
</div>
  </SidebarHeader>

  <SidebarContent className="bg-black text-gray-200 flex-1 overflow-y-auto p-2">
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.url}>
          <SidebarMenuButton asChild>
            <a href={item.url} className="flex items-center gap-2">
              {item.icon}
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarContent>

  <SidebarFooter className="bg-black text-gray-200 border-t border-gray-800 p-4">
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="w-full flex items-center justify-center bg-gray-900 border border-gray-700 hover:bg-red-600 hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      <span className="ml-2">Logout</span>
    </Button>
  </SidebarFooter>
</Sidebar>

  );
}
