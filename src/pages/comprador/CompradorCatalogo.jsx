import { ShoppingCart } from "lucide-react";
import { useCatalogo } from "../../hooks/useCatalogo";
import Button from "../../components/UI/Button";
import Badge from "../../components/UI/Badge";

const CompradorCatalogo = () => {
  const { productos, loading } = useCatalogo();

  return (
    <div>
      <h1 className="text-2xl text-blue-700 mb-2">Catálogo de Productos</h1>
      <p className="text-sm text-gray-600 mb-6">Explora los productos disponibles de los campesinos</p>
      
      {loading ? (
        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productos.map((p) => (
            <div key={p.id_producto} className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{p.nombre}</h3>
                <Badge variant="info">{p.categoria}</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">{p.descripcion || "Sin descripción"}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">${p.precio_unitario?.toFixed(2)} <span className="text-sm text-gray-500">/{p.unidad_medida}</span></span>
                <Button size="sm" className="flex items-center gap-2"><ShoppingCart size={16} />Agregar</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && productos.length === 0 && <p className="text-center text-gray-500 py-10">No hay productos disponibles</p>}
    </div>
  );
};

export default CompradorCatalogo;