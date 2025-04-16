"use client";

export const Button = ({ appName, className }: { appName: string, className?: string }) => {
  return (
    <button
      className={` text-center py-2 px-3 rounded-lg text-amber-50 ${className}`}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      click
    </button>
  );
};