'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Card } from '@/shared/ui/Card';
import { predictionData } from '@/entities/energy/model/mockData';

export function PredictionChartWidget() {
  return (
    <Card title="5-Year Prediction — MWh" className="h-full">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={predictionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)', fill: '#64748b' }}
            tickLine={false}
          />
          <YAxis
            domain={[3000, 4200]}
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)', fill: '#64748b' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, fontSize: 12 }}
            itemStyle={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
          <ReferenceLine x="2025" stroke="#334155" strokeDasharray="4 2" label={{ value: 'Now', fill: '#64748b', fontSize: 10 }} />
          {/* 과거 실측 (실선) */}
          <Line
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3, fill: '#3b82f6' }}
            connectNulls={false}
            isAnimationActive={false}
          />
          {/* 미래 예측 (점선) */}
          <Line
            type="monotone"
            dataKey="forecast"
            name="Forecast"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: '#10b981' }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
