"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";


export function UserNav({
  user,
}: Readonly<{
  user: {
    name: string;
    avatar: string;
  };
}>) {
  const router = useRouter();
  const [_currentRole, setCurrentRole] = useState("user");

useEffect(() => {
  const regex = /role=([^;]+)/;
  const result = regex.exec(document.cookie);

  if (result?.[1]) {
    setCurrentRole(result[1]);
  }
}, []);


  const logOut = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            {/* <span className="truncate text-xs">{user.email}</span> */}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        {/* Selector de roles en el área central */}
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={logOut} className="cursor-pointer">
          <LogOut className="mr-2" />
          Cerrar sesión
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}