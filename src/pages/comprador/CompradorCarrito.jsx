import { Trash2, Minus, Plus } from "lucide-react";
import { useCarrito } from "../../hooks/useCarrito";
import Button from "../../components/UI/Button";

const CompradorCarrito = () => {
  const { items, loading, actualizarCantidad, eliminarItem, limpiarCarrito, total } = useCarrito();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-blue-700 mb-1">Carrito de Compras</h1>
          <p className="text-sm text-gray-600">Productos seleccionados</p>
        </div>
        {items.length > 0 && <Button variant="danger" size="sm" onClick={limpiarCarrito}>Limpiar Carrito</Button>}
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Tu carrito está vacío</div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr><th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Producto</th><th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Precio</th><th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Cantidad</th><th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Subtotal</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id_item} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="font-medium text-gray-800">{item.producto_nombre}</div><div className="text-sm text-gray-500">{item.campesino_nombre}</div></td>
                  <td className="px-4 py-3 text-center">${item.precio_unitario?.toFixed(2)}</td>
                  <td className="px-4 py-3"><div className="flex items-center justify-center gap-2"><button onClick={() => actualizarCantidad(item.id_item, item.cantidad - 1)} className="p-1 hover:bg-gray-100 rounded"><Minus size={16} /></button><span className="w-8 text-center">{item.cantidad}</span><button onClick={() => actualizarCantidad(item.id_item, item.cantidad + 1)} className="p-1 hover:bg-gray-100 rounded"><Plus size={16} /></button></div></td>
                  <td className="px-4 py-3 text-right font-medium">${(item.precio_unitario * item.cantidad).toFixed(2)}</td>
                  <td className="px-4 py-3"><button onClick={() => eliminarItem(item.id_item)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompradorCarrito;