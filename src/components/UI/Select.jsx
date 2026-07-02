const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Seleccionar...",
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none transition-colors duration-200
          ${error
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : ""
          }
          ${disabled ? "bg-white/5 cursor-not-allowed" : "bg-[#0d0f15]"}
          text-white ring-0`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Select;