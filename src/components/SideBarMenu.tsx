import { NavLink } from "react-router-dom";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu as Menu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import React from "react";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ElementType; 
};

export default function SideBarMenu({ items }: { items: MenuItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/70">
        Navigation
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <Menu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-sidebar-accent  font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </Menu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
