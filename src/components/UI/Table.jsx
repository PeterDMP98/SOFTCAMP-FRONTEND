const Table = ({
  columns,
  data,
  onSort,
  sortColumn,
  sortDirection,
  emptyMessage = "No hay datos",
  className = "",
}) => {
  return (
    <div className={`overflow-x-auto rounded-xl border border-white/10  ${className}`}>
      <table className="w-full">
        <thead className="bg-[#111019] shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-sm font-medium text-slate-300
                  ${col.sortable ? "cursor-pointer hover:bg-white/5" : ""}`}
                onClick={() => col.sortable && onSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortColumn === col.key && (
                    <span className="text-green-600">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row.id || idx} className="hover:bg-white/5 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-slate-200">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;