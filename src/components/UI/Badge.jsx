const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const variants = {
    default: "bg-white/10 text-slate-300",
    success: "bg-emerald-500/15 text-emerald-200",
    warning: "bg-yellow-500/15 text-yellow-200",
    danger: "bg-red-500/15 text-red-200",
    info: "bg-blue-500/15 text-blue-200",
    purple: "bg-purple-500/15 text-purple-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;