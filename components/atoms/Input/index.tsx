// components/atoms/Input/index.tsx
type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      className="border px-3 py-2 rounded w-full"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
