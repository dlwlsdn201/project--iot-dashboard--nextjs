'use client';

import { useAtomValue } from 'jotai';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Card } from '@/shared/ui/Card';
import { energyDataAtom } from '@/entities/energy/model/energyStore';

export function LiveEnergyChart() {
  const data = useAtomValue(energyDataAtom);

  const chartData = data.map((point) => ({
    t: new Date(point.timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    kw: point.powerKw,
  }));

  const latest = data.at(-1);

  return (
    <Card title="Live Energy — Real-time Power" className="h-full">
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-mono text-3xl font-bold text-blue-400">
          {latest ? latest.powerKw.toFixed(0) : '—'}
        </span>
        <span className="text-slate-400 text-sm">kW</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="t"
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)', fill: '#64748b' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)', fill: '#64748b' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, fontSize: 12 }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color: '#60a5fa', fontFamily: 'var(--font-jetbrains-mono)' }}
          />
          <Line
            type="monotone"
            dataKey="kw"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
