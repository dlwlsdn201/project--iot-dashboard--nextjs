"use client";

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
} from "recharts";
import { Card } from "@/shared/ui/Card";
import {
  yoyComparisonData,
  yoyYearLabels,
} from "@/entities/energy/model/mockData";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

export function YoYComparisonWidget() {
  return (
    <Card title='전년 동월 대비 사용량'>
      <div className='flex-1 min-h-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            data={yoyComparisonData}
            margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#1e293b'
              vertical={false}
            />
            <XAxis
              dataKey='month'
              tick={{
                fontSize: 10,
                fontFamily: "var(--font-jetbrains-mono)",
                fill: "#64748b",
              }}
              tickLine={false}
            />
            <YAxis
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
                offset: -20,
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
              cursor={{ fill: "#1e293b" }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <Bar
              dataKey='thisYear'
              name={`${yoyYearLabels.thisYear} (This Year)`}
              fill='#3b82f6'
              fillOpacity={0.7}
              radius={[3, 3, 0, 0]}
              isAnimationActive={false}
            />
            <Line
              type='monotone'
              dataKey='lastYear'
              name={`${yoyYearLabels.lastYear} (Last Year)`}
              stroke='#f59e0b'
              strokeWidth={2}
              dot={{ r: 2, fill: "#f59e0b" }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
