import React from "react";

export function ShimmerButton({ 
  children, 
  className = "",
  disabled = false,
  onClick,
  ...props 
}) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[calc(100%-4px)] w-[calc(100%-4px)] rounded-md bg-gradient-to-t from-[rgba(255,255,255,0.15)] to-transparent"></div>
      </div>
      <div className="absolute -inset-[100%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="z-10">{children}</div>
    </button>
  );
}