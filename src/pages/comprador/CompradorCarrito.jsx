import { Trash2, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCarrito } from "../../hooks/useCarrito";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";

const CompradorCarrito = () => {
  const navigate = useNavigate();
  const { items, loading, actualizarCantidad, eliminarItem, limpiarCarrito, total } = useCarrito();

  const cardClass =
    "rounded-[1.5rem] border border-white/10 bg-[#13111a] p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Carrito de Compras</h1>
          <p className="mt-1 text-sm text-slate-400">
            {items.length > 0
              ? `${items.length} producto${items.length !== 1 ? "s" : ""} seleccionado${items.length !== 1 ? "s" : ""}`
              : "Productos seleccionados"}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={limpiarCarrito}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-300 transition hover:bg-red-500/20"
          >
            <Trash2 size={14} />
            Limpiar carrito
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500/30 border-t-sky-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className={cardClass}>
            <ShoppingCart size={48} className="mx-auto mb-3 text-slate-600" />
            <p className="text-sm text-slate-400">Tu carrito está vacío</p>
            <button
              onClick={() => navigate("/comprador/catalogo")}
              className="mt-4 flex items-center gap-1.5 rounded-xl bg-sky-500/20 px-4 py-2.5 text-sm text-sky-300 transition hover:bg-sky-500/30"
            >
              <ArrowLeft size={14} />
              Explorar catálogo
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Items */}
          {items.map((item) => (
            <div key={item.id_item} className={cardClass}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15">
                  <ShoppingCart size={22} className="text-sky-300" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-white">
                    {item.producto_nombre}
                  </h3>
                  <p className="text-xs text-slate-400">{item.campesino_nombre}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-400">Precio</p>
                  <p className="text-sm font-semibold text-white">
                    ${item.precio_unitario?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.15em] text-slate-400">
                    Cant.
                  </span>
                  <button
                    onClick={() =>
                      actualizarCantidad(item.id_item, item.cantidad - 1)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-white">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() =>
                      actualizarCantidad(item.id_item, item.cantidad + 1)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Subtotal</p>
                    <p className="text-sm font-semibold text-sky-300">
                      ${(item.precio_unitario * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => eliminarItem(item.id_item)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-[#13111a] p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Total del carrito
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {items.length} producto{items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <span className="text-2xl font-bold text-sky-300">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompradorCarrito;
