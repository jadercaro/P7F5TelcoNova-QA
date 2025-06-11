import * as React from "react";
import { Trello, User, FileClock } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  username: string,
  email: string
};

export function AppSidebar({ username, email, ...props }: AppSidebarProps) {
  const data = {
    user: {
      name: username,
      email: email,
      avatar: "/avatars/shadcn.jpg",
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
        url: "#",
        icon: FileClock,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" className="w-1/6 min-h-screen bg-gray-200" {...props}>
      <SidebarHeader>
        <img src="/logo.png" alt="Telconova SupportSuite" className="mx-auto" />
      </SidebarHeader>
      <SidebarContent className="flex align-items justify-center">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}