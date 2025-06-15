// components/atoms/Button/index.tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function Button({ children, onClick, type = 'button', className = '' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}