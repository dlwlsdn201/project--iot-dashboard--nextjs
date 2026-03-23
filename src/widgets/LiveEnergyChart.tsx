"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@/shared/ui/Card";
import { energyDataAtom } from "@/entities/energy/model/energyStore";
import { useSocketMock } from "@/features/websocket/useSocketMock";
import { useWindowWidth } from "@/shared/lib/useWindowWidth";

const INTERVAL_OPTIONS = [
  { label: "1초", value: 1000 },
  { label: "5초", value: 5000 },
  { label: "1분", value: 60000 },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

function formatTimestamp(ts: number, showSeconds: boolean): string {
  const d = new Date(ts);
  const base = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return showSeconds ? `${base}:${pad(d.getSeconds())}` : base;
}

export function LiveEnergyChart() {
  const [intervalMs, setIntervalMs] = useState<
    (typeof INTERVAL_OPTIONS)[number]["value"]
  >(INTERVAL_OPTIONS[0].value);
  useSocketMock(intervalMs);

  const windowWidth = useWindowWidth();
  /** 화면 너비별 X축 최대 tick 수: mobile<600 → 5, tablet<1000 → 7, desktop → 10 */
  const tickCount = windowWidth < 600 ? 5 : windowWidth < 1000 ? 7 : 10;

  const data = useAtomValue(energyDataAtom);
  const showSeconds = intervalMs < 60000;

  const chartData = data.slice(-tickCount).map((point) => ({
    t: formatTimestamp(point.timestamp, showSeconds),
    kw: point.powerKw,
  }));

  const latest = data.at(-1);

  const intervalSelect = (
    <select
      value={intervalMs}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setIntervalMs(
          Number(e.target.value) as (typeof INTERVAL_OPTIONS)[number]["value"],
        )
      }
      className='bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 px-2 py-1 font-mono focus:outline-none focus:border-blue-500 cursor-pointer'>
      {INTERVAL_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );

  return (
    <Card title='실시간 전력 사용량' headerRight={intervalSelect}>
      <div className='shrink-0 flex items-baseline gap-2 mb-3'>
        <span className='font-mono text-3xl font-bold text-blue-400'>
          {latest ? latest.powerKw.toFixed(0) : "—"}
        </span>
        <span className='text-slate-400 text-sm'>kW</span>
        <span className='ml-auto flex items-center gap-1.5 text-xs text-emerald-400'>
          <span className='inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
          LIVE
        </span>
      </div>
      <div className='flex-1 min-h-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={chartData}
            margin={{ top: 0, right: 30, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
            <XAxis
              dataKey='t'
              tick={{
                fontSize: 10,
                fontFamily: "var(--font-jetbrains-mono)",
                fill: "#64748b",
              }}
              tickLine={false}
              interval='preserveStartEnd'
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{
                fontSize: 10,
                fontFamily: "var(--font-jetbrains-mono)",
                fill: "#64748b",
              }}
              label={{
                value: "kW",
                fontSize: 10,
                fontFamily: "var(--font-ui)",
                fill: "#64748b",
                position: "left",
                offset: -20,
                angle: -90,
              }}
              tickLine={false}
              tickFormatter={(v: number) => v.toLocaleString("ko-KR")}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 6,
                fontSize: 12,
              }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{
                color: "#60a5fa",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
              formatter={(v) =>
                typeof v === "number" ? v.toLocaleString("ko-KR") : v
              }
            />
            <Line
              type='monotone'
              dataKey='kw'
              stroke='#3b82f6'
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
