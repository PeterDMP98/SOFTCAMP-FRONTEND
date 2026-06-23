import { useState, useMemo } from "react";
import { ShoppingCart, Package, Search } from "lucide-react";
import { useCatalogo } from "../../hooks/useCatalogo";
import Button from "../../components/UI/Button";
import Badge from "../../components/UI/Badge";

const CompradorCatalogo = () => {
  const { productos, loading } = useCatalogo();
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const categorias = useMemo(() => {
    const set = new Set(productos.map((p) => p.categoria).filter(Boolean));
    return [...set].sort();
  }, [productos]);

  const filtrados = useMemo(() => {
    let resultado = productos;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      resultado = resultado.filter(
        (p) =>
          p.nombre?.toLowerCase().includes(q) ||
          p.descripcion?.toLowerCase().includes(q)
      );
    }
    if (categoriaFiltro) {
      resultado = resultado.filter((p) => p.categoria === categoriaFiltro);
    }
    return resultado;
  }, [productos, busqueda, categoriaFiltro]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Catálogo de Productos</h1>
        <p className="mt-1 text-sm text-slate-400">
          Explora los productos disponibles de los campesinos
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-sky-500/40"
          />
        </div>
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500/40 sm:w-48"
        >
          <option value="" className="bg-[#111019]">
            Todas las categorías
          </option>
          {categorias.map((cat) => (
            <option key={cat} value={cat} className="bg-[#111019]">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500/30 border-t-sky-400" />
        </div>
      ) : filtrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-sm text-slate-400">
          <Package size={48} className="mb-3 text-slate-600" />
          <p>{busqueda || categoriaFiltro ? "No hay productos que coincidan" : "No hay productos disponibles"}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((p) => (
            <div
              key={p.id_producto}
              className="group rounded-[1.5rem] border border-white/10 bg-[#13111a] p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:border-sky-500/20"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-semibold text-white">{p.nombre}</h3>
                <Badge variant="info">{p.categoria}</Badge>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-300">
                {p.descripcion || "Sin descripción"}
              </p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-lg font-bold text-sky-300">
                  ${p.precio_unitario?.toFixed(2)}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    /{p.unidad_medida}
                  </span>
                </span>
                <Button
                  size="sm"
                  className="flex items-center gap-2 !bg-sky-500/20 !text-sky-300 hover:!bg-sky-500/30"
                >
                  <ShoppingCart size={16} />
                  Agregar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompradorCatalogo;
