"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  roles: string[]; // Lista de roles dinámicos
};

export default function Select({ value, onChange, roles }: Props) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger className="flex items-center justify-between w-full border px-2 py-1 rounded text-sm">
        <SelectPrimitive.Value />
        <ChevronDown className="ml-2 h-4 w-4" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-white border rounded shadow-md z-50">
          <SelectPrimitive.Viewport>
            {roles.map((role) => (
              <SelectPrimitive.Item
                key={role}
                value={role}
                className="px-3 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
              >
                <SelectPrimitive.ItemIndicator>
                  <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{role}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}