import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div
      className={`
        bg-slate-900/80 border border-slate-800 rounded-lg backdrop-blur-md
        text-slate-100 flex flex-col overflow-hidden
        ${className}
      `}
    >
      {title && (
        <div className="px-4 pt-4 pb-2 border-b border-slate-800">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {title}
          </h2>
        </div>
      )}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
