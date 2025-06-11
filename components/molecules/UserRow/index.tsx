import Select from '@/components/atoms/Select';
import { useState } from 'react';

type UserRowProps = {
  name: string;
  email: string;
  role: string;
  onRoleChange: (newRole: string) => void;
  onDelete: () => void;
};

export default function UserRow({ name, email, role, onRoleChange, onDelete }: UserRowProps) {
  const [currentRole, setCurrentRole] = useState(role);
  const roles = ["admin", "user", "tecnico"];

  const handleRoleChange = (newRole: string) => {
    setCurrentRole(newRole);
    onRoleChange(newRole);
  };

  return (
    <div className="grid grid-cols-4 items-center px-4 py-3 border-b hover:bg-gray-50 transition text-sm">
      <div className="font-medium">{name}</div>

      <div className="text-gray-700">{email}</div>

      <div>
        <Select
          value={currentRole}
          roles={roles}
          onChange={handleRoleChange}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={onDelete}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
          title="Eliminar usuario"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3m-4 0h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
