// pages/users/index.tsx
import UserTable from '@/components/organisms/UserTable';
import { AppSidebar } from '@/components/organisms/AppSidebar';
import { SidebarInset } from '@/components/ui/sidebar';

export default function UsersPage() {
  return (
    <>
      {/* Reducir el ancho del sidebar */}
      <AppSidebar username="TELCONOVA USER" email="correo@telconova.com.co"/>
      <SidebarInset className="bg-white">
      {/* Expandir el contenido principal */}
        <div className="w-full max-w-6xl bg-white p-6 rounded shadow mx-auto">
          <h1 className="text-2xl text-black font-bold mb-4">Usuarios</h1>
          <UserTable />
        </div>
      </SidebarInset>
    </>
  );
}