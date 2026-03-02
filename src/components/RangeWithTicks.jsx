function getPercent(value, min, max) {
  if (max <= min) return 0;
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

function RangeWithTicks({
  id,
  label,
  hint,
  value,
  min = 0,
  max = 100,
  onChange,
}) {
  const percent = getPercent(value, min, max);

  return (
    <label className="space-y-2">
      <div className="flex items-center justify-between text-base text-slate-700">
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      {hint ? <p className="text-sm text-slate-500">{hint}</p> : null}
      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="range-base"
          style={{ "--range-value": `${percent}%` }}
        />
        <span
          className="pointer-events-none absolute left-[var(--range-value)] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 px-2 py-0.5 text-sm font-semibold text-slate-700 shadow-sm"
          aria-hidden="true"
        >
          {value}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>0</span>
        <span>100</span>
      </div>
    </label>
  );
}

export default RangeWithTicks;
