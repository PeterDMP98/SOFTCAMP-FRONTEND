const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none transition-colors duration-200
          ${error
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : "focus:border-emerald-400/60"
          }
          ${disabled ? "bg-white/5 cursor-not-allowed" : "bg-[#0d0f15]"}
          text-white placeholder:text-slate-500 ring-0`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;