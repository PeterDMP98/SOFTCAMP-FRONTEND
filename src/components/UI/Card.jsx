const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  className = "",
  padding = true,
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md ${className}`}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
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
    <div className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {trend && <p className={`text-xs ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
          {trend > 0 ? "+" : ""}{trend}% vs mes anterior
        </p>}
      </div>
    </div>
  );
};

export default Card;