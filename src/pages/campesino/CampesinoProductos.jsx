import { Navigate } from "react-router-dom";
import { Package2, Warehouse, PlusCircle, Boxes } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useProducto } from "../../hooks/useProducto";
import { useStock } from "../../hooks/useStock";
import ModulePageShell from "../../components/campesino/ModulePageShell";
import ExpandableSection from "../../components/campesino/ExpandableSection";
import ProductoForm from "../../components/campesino/ProductoForm";
import ProductoTable from "../../components/campesino/ProductoTable";
import StockForm from "../../components/campesino/StockForm";
import StockTable from "../../components/campesino/StockTable";

const actionButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10";

const CampesinoProductos = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const productos = useProducto();
  const stock = useStock();

  const stats = [
    {
      label: "Productos",
      value: productos.productos.length,
      hint: "Catalogo visible para venta",
      icon: <Package2 size={18} />,
    },
    {
      label: "Stock",
      value: stock.stocks.length,
      hint: "Inventario disponible por producto",
      icon: <Warehouse size={18} />,
    },
    {
      label: "Inventario",
      value: "Consolidado",
      hint: "Producto y stock en la misma vista",
      icon: <Boxes size={18} />,
    },
    {
      label: "Estado",
      value: productos.loading || stock.loading ? "Cargando" : "Listo",
      hint: "Actualizacion en tiempo real",
      icon: <PlusCircle size={18} />,
    },
  ];

  return (
    <ModulePageShell
      eyebrow="Catalogo e inventario"
      title="Productos y stock en un solo panel"
      description="Agrupamos el catalogo de productos y el inventario para que puedas editar la oferta, revisar existencias y mover stock desde una sola pantalla."
      accent="blue"
      stats={stats}
      actions={
        <>
          <button type="button" className={actionButtonClass} onClick={() => productos.setShowModal(true)}>
            <PlusCircle size={16} />
            Nuevo producto
          </button>
          <button type="button" className={actionButtonClass} onClick={() => stock.setShowModal(true)}>
            <PlusCircle size={16} />
            Nuevo stock
          </button>
        </>
      }
    >
      {productos.showModal && (
        <ProductoForm
          initialData={productos.editData}
          onSubmit={productos.guardarProducto}
          onClose={() => {
            productos.setShowModal(false);
            productos.setEditData(null);
          }}
        />
      )}

      {stock.showModal && (
        <StockForm
          initialData={stock.editData}
          onSubmit={stock.guardarStock}
          onClose={() => {
            stock.setShowModal(false);
            stock.setEditData(null);
          }}
          productos={productos.productos}
        />
      )}

      <div className="space-y-4">
        <ExpandableSection
          title="Catalogo de productos"
          subtitle="Gestiona lo que el campesino ofrece al mercado."
          badge="Venta"
          defaultOpen
          action={
            <button type="button" className={actionButtonClass} onClick={() => productos.setShowModal(true)}>
              <PlusCircle size={16} />
              Agregar producto
            </button>
          }
        >
          <ProductoTable
            productos={productos.productos}
            onEdit={(item) => {
              productos.setEditData(item);
              productos.setShowModal(true);
            }}
            onDelete={productos.borrarProducto}
            onAdd={() => productos.setShowModal(true)}
          />
        </ExpandableSection>

        <ExpandableSection
          title="Inventario y stock"
          subtitle="Ajusta cantidades sin salir del panel de productos."
          badge="Bodega"
          action={
            <button type="button" className={actionButtonClass} onClick={() => stock.setShowModal(true)}>
              <PlusCircle size={16} />
              Agregar stock
            </button>
          }
        >
          <StockTable
            stocks={stock.stocks}
            onEdit={(item) => {
              stock.setEditData(item);
              stock.setShowModal(true);
            }}
            onAdd={() => stock.setShowModal(true)}
          />
        </ExpandableSection>
      </div>

      {(productos.loading || stock.loading) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-sky-400" />
        </div>
      )}
    </ModulePageShell>
  );
};

export default CampesinoProductos;
