import UserRow from '@/components/molecules/UserRow';
import { useState } from 'react';

const initialUsers = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@telconova.co.com`,
  role: i % 2 === 0 ? "admin" : "user",
}));

export default function UserTable() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(initialUsers);
  const [hasChanges, setHasChanges] = useState(false);
  const [showRoleChangeSuccess, setShowRoleChangeSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleSearch = () => {
    const results = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleRoleChange = (id: number, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
    setHasChanges(true);
  };

  const confirmDeleteUser = (id: number) => {
    setUserToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleDeleteUser = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
    setSearchResults((prevResults) => prevResults.filter((user) => user.id !== userToDelete));
    setShowConfirmationModal(false);
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 5000);
  };

  const handleSaveChanges = () => {
    console.log("Cambios guardados exitosamente");
    setHasChanges(false);
    setShowRoleChangeSuccess(true);
    setTimeout(() => setShowRoleChangeSuccess(false), 5000);
  };

  return (
    <div className="bg-white rounded shadow-md p-6 w-full mx-auto">

      {/* Campo de búsqueda */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por correo electrónico"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-[#0F172A] text-white px-6 py-2 rounded hover:bg-[#4c4c4e]"
        >
          Buscar
        </button>
      </div>

      {/* Encabezado de tabla */}
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,80px)] font-semibold text-gray-600 px-4 py-2 border-b bg-gray-50 rounded-t">
        <span>Usuario</span>
        <span>Rol</span>
        <span>Eliminar</span>
      </div>

      {/* Lista de usuarios */}
      {searchResults.map((user) => (
        <UserRow
          key={user.id}
          name={user.name}
          email={user.email}
          role={user.role}
          onRoleChange={(newRole) => handleRoleChange(user.id, newRole)}
          onDelete={() => confirmDeleteUser(user.id)}
        />
      ))}

      {/* Botón de guardar cambios */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSaveChanges}
          className={`px-6 py-2 rounded ${
            hasChanges
              ? "bg-[#0F172A] hover:bg-[#4c4c4e] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!hasChanges}
        >
          Guardar Cambios
        </button>
      </div>

      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo oscuro */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Modal */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center z-10">
            <h2 className="text-lg font-bold">Confirmación</h2>
            <p className="mt-2">¿Desea eliminar este usuario?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-[#0F172A] text-white rounded hover:bg-[#4c4c4e]"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito de cambio de rol */}
      {showRoleChangeSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo oscuro */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Modal */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center z-10">
            <h2 className="text-lg font-bold">Operación Exitosa</h2>
            <p className="mt-2">Rol actualizado exitosamente</p>
            <button
              onClick={() => setShowRoleChangeSuccess(false)}
              className="mt-4 bg-[#0F172A] text-white px-4 py-2 rounded hover:bg-[#4c4c4e]"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}


      {/* Mensaje de éxito de eliminación */}
      {showDeleteSuccess && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Fondo oscuro translúcido */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Contenido del modal */}
        <div className="relative bg-white p-6 rounded-lg shadow-lg text-center z-10">
          <h2 className="text-lg font-semibold mb-2">Operación Exitosa</h2>
          <p className="text-sm text-gray-600 mb-4">Usuario eliminado exitosamente</p>
          <button
            onClick={() => setShowDeleteSuccess(false)}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Aceptar
          </button>
        </div>
      </div>
    )}

    </div>
  );
}
