"use client";

import { useState } from "react";

export interface TabItem<T extends string = string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function Tabs<T extends string>({
  items,
  value,
  onChange,
}: TabsProps<T>) {
  return (
    <div role='tablist' className='flex bg-slate-950 rounded-md w-fit shrink-0'>
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            role='tab'
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={`
              px-3 p-1 rounded cursor-pointer text-xs font-semibold transition-all duration-150
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }
            `}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
