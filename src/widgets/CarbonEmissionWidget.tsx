"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card } from "@/shared/ui/Card";
import { Tabs } from "@/shared/ui/Tabs";
import { carbonEmissionData } from "@/entities/energy/model/mockData";

type Period = "weekly" | "monthly" | "yearly";

const PERIOD_TABS = [
  { label: "주간", value: "weekly" as Period },
  { label: "월간", value: "monthly" as Period },
  { label: "연간", value: "yearly" as Period },
];

export function CarbonEmissionWidget() {
  const [period, setPeriod] = useState<Period>("monthly");
  const data = carbonEmissionData[period];

  return (
    <Card
      title='탄소(CO₂) 배출량'
      headerRight={
        <Tabs items={PERIOD_TABS} value={period} onChange={setPeriod} />
      }>
      <div className='flex-1 min-h-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#1e293b'
              vertical={false}
            />
            <XAxis
              dataKey='label'
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
                value: "tCO₂-eq",
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
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 6,
                fontSize: 12,
              }}
              itemStyle={{
                fontFamily: "var(--font-jetbrains-mono)",
                color: "#10b981",
              }}
              formatter={(v) => (typeof v === 'number' ? v.toLocaleString('ko-KR') : v)}
              cursor={{ fill: "#1e293b" }}
            />
            <Bar
              dataKey='tCO2'
              name='tCO₂'
              // Recharts 기본 fill을 사용해 불필요한 Cell 의존을 제거한다.
              fill='#10b981'
              fillOpacity={0.9}
              isAnimationActive={false}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
