'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Card } from '@/shared/ui/Card';
import { yoyComparisonData } from '@/entities/energy/model/mockData';

export function YoYComparisonWidget() {
  return (
    <Card title="YoY Comparison — MWh" className="h-full">
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={yoyComparisonData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)', fill: '#64748b' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)', fill: '#64748b' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, fontSize: 12 }}
            itemStyle={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            cursor={{ fill: '#1e293b' }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
          <Bar
            dataKey="thisYear"
            name="2025 (This Year)"
            fill="#3b82f6"
            fillOpacity={0.7}
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="lastYear"
            name="2024 (Last Year)"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 2, fill: '#f59e0b' }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}
