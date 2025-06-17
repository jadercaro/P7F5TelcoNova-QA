import * as React from "react";
import { Trello, User, FileClock } from "lucide-react";
import { SidebarOptions } from "@/components/molecules/SidebarOptions";
import { UserNav } from "@/components/molecules/UserNav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  username: string
};

export function AppSidebar({ username, ...props }: AppSidebarProps) {
  const data = {
    user: {
      name: username,
      avatar: "",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/incidents/dashboard",
        icon: Trello,
        isActive: true,
      },
      {
        title: "Usuarios",
        url: "/users",
        icon: User,
      },
      {
        title: "Historial",
        url: "/incidents/history",
        icon: FileClock,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src="/logo.png" alt="Telconova SupportSuite" className="mx-auto" />
      </SidebarHeader>
      <SidebarContent className="flex align-items justify-center">
        <SidebarOptions items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}