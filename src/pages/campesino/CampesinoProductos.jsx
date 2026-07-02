import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Package2, Warehouse, PlusCircle, AlertTriangle, Eye, ListTodo } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useProducto } from "../../hooks/useProducto";
import { useStock } from "../../hooks/useStock";
import { useTarea } from "../../hooks/useTarea";
import { useEmpleado } from "../../hooks/useEmpleado";
import ModulePageShell from "../../components/campesino/ModulePageShell";
import ExpandableSection from "../../components/campesino/ExpandableSection";
import ProductoForm from "../../components/campesino/ProductoForm";
import ProductoTable from "../../components/campesino/ProductoTable";
import StockForm from "../../components/campesino/StockForm";
import StockTable from "../../components/campesino/StockTable";
import TareaForm from "../../components/campesino/TareaForm";
import TareaTable from "../../components/campesino/TareaTable";
import Modal from "../../components/UI/Modal";

const actionButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10";

const miniButtonClass =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10";

const CampesinoProductos = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const productos = useProducto();
  const stock = useStock();
  const { tareas, loading: loadT, showModal: showTareaFormModal, setShowModal: setShowTareaFormModal, editData: tareaEditData, setEditData: setTareaEditData, guardarTarea, borrarTarea } = useTarea();
  const { empleados } = useEmpleado();

  const [showProductosAgotadosModal, setShowProductosAgotadosModal] = useState(false);
  const [showStockAgotadoModal, setShowStockAgotadoModal] = useState(false);
  const [showTareasModal, setShowTareasModal] = useState(false);

  const stockDisponible = stock.stocks.filter(s => s.estado === "disponible");
  const productosAgotados = productos.productos.filter(p => (p.cantidad_total || 0) <= 0);
  const stockAgotado = stock.stocks.filter(s => (s.cantidad_stock || 0) <= 0 || s.estado === "agotado");
  const tareasProductoStock = tareas.filter(t => t.estado !== "completada" && (t.tipo_referencia === "producto" || t.tipo_referencia === "stock"));

  const stats = [
    {
      label: "Productos",
      value: productos.productos.length,
      hint: "Productos agregados por el campesino",
      icon: <Package2 size={18} />,
    },
    {
      label: "Stock",
      value: stockDisponible.length,
      hint: "Productos a la venta",
      icon: <Warehouse size={18} />,
    },
    {
      label: "Productos agotándose",
      value: productosAgotados.length,
      hint: "Sin existencias disponibles",
      icon: <AlertTriangle size={18} />,
      children: (
        <button
          type="button"
          className={miniButtonClass}
          onClick={() => setShowProductosAgotadosModal(true)}
        >
          <Eye size={14} />
          Ver productos agotados
        </button>
      ),
    },
    {
      label: "Stock agotándose",
      value: stockAgotado.length,
      hint: "Stock sin disponibilidad",
      icon: <AlertTriangle size={18} />,
      children: (
        <button
          type="button"
          className={miniButtonClass}
          onClick={() => setShowStockAgotadoModal(true)}
        >
          <Eye size={14} />
          Ver stock agotado
        </button>
      ),
    },
    {
      label: "Tareas pendientes",
      value: tareasProductoStock.length,
      hint: "Relacionadas con productos y stock",
      icon: <ListTodo size={18} />,
      children: (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={miniButtonClass}
            onClick={() => setShowTareasModal(true)}
          >
            <Eye size={14} />
            Ver tareas
          </button>
          <button
            type="button"
            className={miniButtonClass}
            onClick={() => { setShowTareaFormModal(true); setTareaEditData(null); }}
          >
            <PlusCircle size={14} />
            Agregar tarea
          </button>
        </div>
      ),
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

      {showProductosAgotadosModal && (
        <Modal isOpen={true} onClose={() => setShowProductosAgotadosModal(false)} title="Productos agotados" size="xl">
          <ProductoTable
            productos={productosAgotados}
            onEdit={(item) => {
              productos.setEditData(item);
              productos.setShowModal(true);
              setShowProductosAgotadosModal(false);
            }}
            onDelete={productos.borrarProducto}
            onAdd={() => {
              productos.setShowModal(true);
              setShowProductosAgotadosModal(false);
            }}
          />
        </Modal>
      )}

      {showStockAgotadoModal && (
        <Modal isOpen={true} onClose={() => setShowStockAgotadoModal(false)} title="Stock agotado" size="xl">
          <StockTable
            stocks={stockAgotado}
            onEdit={(item) => {
              stock.setEditData(item);
              stock.setShowModal(true);
              setShowStockAgotadoModal(false);
            }}
            onAdd={() => {
              stock.setShowModal(true);
              setShowStockAgotadoModal(false);
            }}
          />
        </Modal>
      )}

      {showTareasModal && (
        <Modal isOpen={true} onClose={() => setShowTareasModal(false)} title="Tareas pendientes de productos y stock" size="xl">
          <TareaTable
            tareas={tareasProductoStock}
            onEdit={(item) => {
              setTareaEditData(item);
              setShowTareaFormModal(true);
              setShowTareasModal(false);
            }}
            onDelete={borrarTarea}
            onAdd={() => {
              setTareaEditData(null);
              setShowTareaFormModal(true);
              setShowTareasModal(false);
            }}
          />
        </Modal>
      )}

      {showTareaFormModal && (
        <TareaForm
          initialData={tareaEditData}
          onSubmit={guardarTarea}
          onClose={() => {
            setShowTareaFormModal(false);
            setTareaEditData(null);
          }}
          empleados={empleados}
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

      {(productos.loading || stock.loading || loadT) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-sky-400" />
        </div>
      )}
    </ModulePageShell>
  );
};

export default CampesinoProductos;
