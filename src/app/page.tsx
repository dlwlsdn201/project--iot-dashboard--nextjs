"use client";

import { LiveEnergyChart } from "@/widgets/LiveEnergyChart";
import { EnergySourceTrendWidget } from "@/widgets/EnergySourceTrendWidget";
import { CarbonEmissionWidget } from "@/widgets/CarbonEmissionWidget";
import { LoadGaugeWidget } from "@/widgets/LoadGaugeWidget";
import { EventAlertsWidget } from "@/widgets/EventAlertsWidget";
import { YoYComparisonWidget } from "@/widgets/YoYComparisonWidget";
import { PredictionChartWidget } from "@/widgets/PredictionChartWidget";
import { NotificationDropdown } from "@/shared/ui/NotificationDropdown";

export default function DashboardPage() {
  return (
    /*
      Mobile(< 768px) : body 스크롤 허용, main은 min-h-screen (자연 스크롤)
      Tablet+(≥ 768px): body height:100% overflow:hidden (globals.css)
                        main은 mobile:h-full → Header + Grid = 100vh, 스크롤 없음
    */
    <main className='min-h-screen flex flex-col bg-slate-950 mobile:h-full mobile:min-h-0'>
      {/* ── Header ── */}
      <header className='shrink-0 px-6 py-3 border-b border-slate-800 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
          <h1 className='text-sm font-semibold text-slate-100 tracking-wide'>
            SmartEnergy BEMS Dashboard
          </h1>
        </div>
        <div className='flex items-center gap-3'>
          <NotificationDropdown />
          <span className='font-mono text-xs text-slate-500 mobile:hidden tablet:block'>
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </header>

      {/*
        Mobile  : grid-cols-1, [grid-auto-rows:220px] → 카드 스택, body 스크롤
        Tablet+ : grid-cols-4,  grid-rows-3            → 3행이 남은 높이 균등 분할
        Desktop : grid-cols-12
      */}
      <div
        className='
        grid grow gap-4 p-4
        grid-cols-1 auto-rows-[19rem]
        tablet:grid-cols-4 tablet:grid-rows-3 tablet:overflow-hidden
        laptop:grid-cols-12
      '>
        <div className='col-span-1 laptop:col-span-2'>
          <LoadGaugeWidget />
        </div>

        <div className='col-span-1 tablet:col-span-3 laptop:col-span-7'>
          <LiveEnergyChart />
        </div>

        <div className='hidden laptop:block laptop:col-span-3'>
          <EventAlertsWidget />
        </div>

        <div className='col-span-1 tablet:col-span-2 laptop:col-span-4'>
          <EnergySourceTrendWidget />
        </div>

        <div className='col-span-1 tablet:col-span-2 laptop:col-span-4'>
          <CarbonEmissionWidget />
        </div>

        <div className='col-span-1 tablet:col-span-2 laptop:col-span-4'>
          <YoYComparisonWidget />
        </div>

        <div className='col-span-1 tablet:col-span-2 laptop:col-span-12'>
          <PredictionChartWidget />
        </div>
      </div>
    </main>
  );
}
