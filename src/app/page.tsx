'use client';

import { useSocketMock } from '@/features/websocket/useSocketMock';
import { LiveEnergyChart } from '@/widgets/LiveEnergyChart';
import { EnergySourceTrendWidget } from '@/widgets/EnergySourceTrendWidget';
import { CarbonEmissionWidget } from '@/widgets/CarbonEmissionWidget';
import { LoadGaugeWidget } from '@/widgets/LoadGaugeWidget';
import { EventAlertsWidget } from '@/widgets/EventAlertsWidget';
import { YoYComparisonWidget } from '@/widgets/YoYComparisonWidget';
import { PredictionChartWidget } from '@/widgets/PredictionChartWidget';

export default function DashboardPage() {
  useSocketMock();

  return (
    <main className="min-h-screen bg-slate-950 overflow-y-auto">
      {/* Header */}
      <header className="px-6 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h1 className="text-sm font-semibold text-slate-100 tracking-wide">
            SmartEnergy BEMS Dashboard
          </h1>
        </div>
        <span className="font-mono text-xs text-slate-500">
          {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </header>

      {/* 12-column grid */}
      <div className="grid grid-cols-12 gap-4 p-4">

        {/* Row 1: W4 Gauge | W1 Live Chart | W5 Alerts */}
        <div className="col-span-2">
          <LoadGaugeWidget />
        </div>
        <div className="col-span-7">
          <LiveEnergyChart />
        </div>
        <div className="col-span-3">
          <EventAlertsWidget />
        </div>

        {/* Row 2: W2 7-Day Trend | W3 Carbon | W6 YoY */}
        <div className="col-span-4">
          <EnergySourceTrendWidget />
        </div>
        <div className="col-span-4">
          <CarbonEmissionWidget />
        </div>
        <div className="col-span-4">
          <YoYComparisonWidget />
        </div>

        {/* Row 3: W7 Prediction (full width) */}
        <div className="col-span-12">
          <PredictionChartWidget />
        </div>

      </div>
    </main>
  );
}
