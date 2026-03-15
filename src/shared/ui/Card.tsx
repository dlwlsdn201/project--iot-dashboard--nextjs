import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: {
    container?: string;
    header?: string;
    content?: string;
  };
  title?: string;
  /** 카드 헤더 우측에 렌더링할 요소 (인터벌 셀렉터 등) */
  headerRight?: ReactNode;
}

export function Card({
  children,
  className = {
    container: "",
    header: "",
    content: "",
  },
  title,
  headerRight,
}: CardProps) {
  const hasHeader = title ?? headerRight;

  return (
    <div
      className={`
        h-full bg-slate-900/80 border border-slate-800 rounded-lg backdrop-blur-md
        text-slate-100 flex flex-col overflow-hidden
        ${className.container}
      `}>
      {hasHeader && (
        <div
          className={`shrink-0 px-4 pt-4 pb-2 border-b border-slate-800 flex items-center justify-between gap-2 ${className.header}`}>
          {title && (
            <h2 className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
              {title}
            </h2>
          )}
          {headerRight && <div className='ml-auto'>{headerRight}</div>}
        </div>
      )}
      <div
        className={`flex-1 min-h-0 flex flex-col p-4 scrollbar-w-4 ${className.content}`}>
        {children}
      </div>
    </div>
  );
}
