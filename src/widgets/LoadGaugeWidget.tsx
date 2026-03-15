'use client';

import { useAtomValue } from 'jotai';
import { energyDataAtom } from '@/entities/energy/model/energyStore';
import { Card } from '@/shared/ui/Card';

const PEAK_LOAD_KW = 800;
const WARN_THRESHOLD = 0.75;
const DANGER_THRESHOLD = 0.9;

/** SVG 반원형 게이지 arc path 생성 */
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

export function LoadGaugeWidget() {
  const data = useAtomValue(energyDataAtom);
  const latest = data.at(-1);
  const currentKw = latest?.powerKw ?? 0;
  const ratio = Math.min(currentKw / PEAK_LOAD_KW, 1);

  const color =
    ratio >= DANGER_THRESHOLD
      ? '#e11d48'
      : ratio >= WARN_THRESHOLD
      ? '#f59e0b'
      : '#3b82f6';

  // 반원 180° — -180°(왼쪽) to 0°(오른쪽), center 아래
  const START_DEG = 180;
  const END_DEG   = 360;
  const fillDeg   = START_DEG + ratio * 180;

  const CX = 80, CY = 72, R = 60;

  return (
    <Card title="Load Gauge — kW" className="h-full">
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <svg width={160} height={90} viewBox="0 0 160 90">
          {/* Track */}
          <path
            d={describeArc(CX, CY, R, START_DEG, END_DEG)}
            fill="none"
            stroke="#1e293b"
            strokeWidth={12}
            strokeLinecap="round"
          />
          {/* Fill */}
          {ratio > 0 && (
            <path
              d={describeArc(CX, CY, R, START_DEG, fillDeg)}
              fill="none"
              stroke={color}
              strokeWidth={12}
              strokeLinecap="round"
            />
          )}
          {/* Center value */}
          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            fontSize={18}
            fontFamily="var(--font-jetbrains-mono)"
            fontWeight="bold"
            fill={color}
          >
            {currentKw.toFixed(0)}
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize={10} fill="#64748b">
            kW
          </text>
        </svg>

        <div className="flex justify-between w-full text-xs text-slate-400 px-1">
          <span>0</span>
          <span className="font-mono text-slate-300">
            PEAK <span style={{ color }}>{(ratio * 100).toFixed(0)}%</span>
          </span>
          <span className="font-mono">{PEAK_LOAD_KW}</span>
        </div>

        <div className="mt-2 text-center">
          <p className="text-xs text-slate-500">Day Peak</p>
          <p className="font-mono text-sm text-amber-400">724 kW</p>
        </div>
      </div>
    </Card>
  );
}
