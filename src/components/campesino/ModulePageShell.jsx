import { Sparkles } from "lucide-react";

const accentMap = {
  green: {
    ring: "ring-emerald-500/30",
    pill: "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
    stat: "from-emerald-500/30 to-lime-400/10",
  },
  blue: {
    ring: "ring-sky-500/30",
    pill: "bg-sky-500/15 text-sky-200 border-sky-500/20",
    stat: "from-sky-500/30 to-cyan-400/10",
  },
  amber: {
    ring: "ring-amber-500/30",
    pill: "bg-amber-500/15 text-amber-200 border-amber-500/20",
    stat: "from-amber-500/30 to-orange-400/10",
  },
};

const ModulePageShell = ({
  eyebrow,
  title,
  description,
  accent = "green",
  actions,
  stats = [],
  children,
}) => {
  const theme = accentMap[accent] || accentMap.green;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111019] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_30%)]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${theme.pill}`}>
              <Sparkles size={14} />
              {eyebrow}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              {description}
            </p>
          </div>

          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      </div>

      {stats.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border border-white/10 bg-[#191622] p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] ring-1 ${theme.ring}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                </div>
                {stat.icon && (
                  <div className={`rounded-2xl bg-gradient-to-br ${theme.stat} p-3 text-white`}>
                    {stat.icon}
                  </div>
                )}
              </div>
              {stat.hint && <p className="mt-3 text-sm text-slate-400">{stat.hint}</p>}
              {stat.children}
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
};

export default ModulePageShell;
