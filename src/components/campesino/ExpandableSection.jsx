import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ExpandableSection = ({
  title,
  subtitle,
  badge,
  defaultOpen = false,
  action,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[#17141f] p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] md:p-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            {badge && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {action}
          <span className="rounded-full bg-white/5 p-2 text-slate-200">
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </div>
      </button>

      {open && (
        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[#110f17] p-4 md:p-5">
          {children}
        </div>
      )}
    </section>
  );
};

export default ExpandableSection;
