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
  Cell,
} from "recharts";
import { Card } from "@/shared/ui/Card";
import { Tabs } from "@/shared/ui/Tabs";
import { carbonEmissionData } from "@/entities/energy/model/mockData";

type Period = "weekly" | "monthly" | "yearly";

const PERIOD_TABS = [
  { label: "Week", value: "weekly" as Period },
  { label: "Month", value: "monthly" as Period },
  { label: "Year", value: "yearly" as Period },
];

export function CarbonEmissionWidget() {
  const [period, setPeriod] = useState<Period>("monthly");
  const data = carbonEmissionData[period];

  return (
    <Card
      title='Carbon Emission — tCO₂'
      headerRight={
        <div className='shrink-0 mb-3'>
          <Tabs items={PERIOD_TABS} value={period} onChange={setPeriod} />
        </div>
      }>
      <div className='flex-1 min-h-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
              tickLine={false}
            />
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
              cursor={{ fill: "#1e293b" }}
            />
            <Bar
              dataKey='tCO2'
              name='tCO₂'
              isAnimationActive={false}
              radius={[3, 3, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill='#10b981'
                  fillOpacity={0.7 + (index / data.length) * 0.3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
