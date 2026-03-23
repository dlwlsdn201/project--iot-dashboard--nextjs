"use client";

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
} from "recharts";
import { Card } from "@/shared/ui/Card";
import {
  predictionData,
  predictionCurrentYearLabel,
} from "@/entities/energy/model/mockData";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

export function PredictionChartWidget() {
  return (
    <Card title='과거 5년 기반의 내년 전력 사용량 예측'>
      <div className='flex-1 min-h-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={predictionData}
            margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
            <XAxis
              dataKey='year'
              tick={{
                fontSize: 10,
                fontFamily: "var(--font-jetbrains-mono)",
                fill: "#64748b",
              }}
              tickLine={false}
            />
            <YAxis
              domain={[3000, 4200]}
              tick={{
                fontSize: 10,
                fontFamily: "var(--font-jetbrains-mono)",
                fill: "#64748b",
              }}
              tickLine={false}
              label={{
                value: "MWh",
                fontSize: 10,
                fontFamily: "var(--font-ui)",
                fill: "#64748b",
                position: "left",
                offset: -12,
                angle: -90,
              }}
              tickFormatter={(v: number) => v.toLocaleString("ko-KR")}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 6,
                fontSize: 12,
              }}
              itemStyle={{ fontFamily: "var(--font-jetbrains-mono)" }}
              formatter={(value: ValueType | undefined) =>
                typeof value === "number" ? value.toLocaleString("ko-KR") : ""
              }
            />
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <ReferenceLine
              x={predictionCurrentYearLabel}
              stroke='#334155'
              strokeDasharray='4 2'
              label={{ value: "현재", fill: "#64748b", fontSize: 10 }}
            />
            <Line
              type='monotone'
              dataKey='actual'
              name='실제'
              stroke='#3b82f6'
              strokeWidth={2}
              dot={{ r: 3, fill: "#3b82f6" }}
              connectNulls={false}
              isAnimationActive={false}
            />
            <Line
              type='monotone'
              dataKey='forecast'
              name='예측'
              stroke='#f59e0b'
              strokeWidth={2}
              strokeDasharray='6 3'
              dot={{ r: 3, fill: "#f59e0b" }}
              connectNulls={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
