"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@/shared/ui/Card";
import { energySourceTrendData } from "@/entities/energy/model/mockData";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

const SOURCE_COLORS = {
  electricity: "#3b82f6",
  gas: "#f59e0b",
  heat: "#e11d48",
};

export function EnergySourceTrendWidget() {
  return (
    <Card title='최근 7일간 에너지원별 추세'>
      <div className='flex-1 min-h-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={energySourceTrendData}
            margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#1e293b'
              vertical={false}
            />
            <XAxis
              dataKey='day'
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
              label={{
                value: "TOE",
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
              itemStyle={{ fontFamily: "var(--font-jetbrains-mono)" }}
              formatter={(value: ValueType | undefined) =>
                typeof value === "number" ? value.toLocaleString("ko-KR") : ""
              }
              cursor={{ fill: "#1e293b" }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <Bar
              dataKey='electricity'
              name='Electricity'
              stackId='a'
              fill={SOURCE_COLORS.electricity}
              isAnimationActive={false}
            />
            <Bar
              dataKey='gas'
              name='Gas'
              stackId='a'
              fill={SOURCE_COLORS.gas}
              isAnimationActive={false}
            />
            <Bar
              dataKey='heat'
              name='Heat'
              stackId='a'
              fill={SOURCE_COLORS.heat}
              isAnimationActive={false}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
