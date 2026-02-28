interface SendButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function SendButton({ onClick, disabled = false }: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-lg bg-primary hover:bg-secondary text-white transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Send message"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    </button>
  );
}
