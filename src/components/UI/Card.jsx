const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  className = "",
  padding = true,
}) => {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#191622] shadow-[0_18px_50px_rgba(0,0,0,0.22)] ${className}`}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={padding ? "p-4" : ""}>{children}</div>
    </div>
  );
};

export const CardStats = ({ icon: Icon, label, value, trend, color = "green" }) => {
  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#191622] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)] flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {trend && <p className={`text-xs ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
          {trend > 0 ? "+" : ""}{trend}% vs mes anterior
        </p>}
      </div>
    </div>
  );
};

export default Card;