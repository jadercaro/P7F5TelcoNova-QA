// pages/users/index.tsx
import UserTable from '@/components/organisms/UserTable';
import { AppSidebar } from '@/components/app-sidebar';

export default function UsersPage() {
  return (
    <div className="flex h-screen">
      {/* Reducir el ancho del sidebar */}
      <AppSidebar username="TELCONOVA USER" email="correo@telconova.com.co" className="w-1/6" />

      {/* Expandir el contenido principal */}
      <main className="flex-grow bg-gray-100 p-6 overflow-y-auto">
        <div className="w-full max-w-6xl bg-white p-6 rounded shadow mx-auto">
          <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
          <UserTable />
        </div>
      </main>
    </div>
  );
}