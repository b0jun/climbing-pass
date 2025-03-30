'use client';

interface PassActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function PassIconButton({ icon, onClick, disabled = false }: PassActionButtonProps) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-md p-1 transition-colors duration-200 hover:bg-gray-200"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
