import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductosList.css";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "", cantidad: "" });
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");

  // URL del backend
  const API_URL = "http://localhost:3001/productos";

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar productos");
    }
  };

  // Agregar producto
  const handleAdd = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.cantidad) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      await axios.post(API_URL, {
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio),
        cantidad: parseInt(nuevoProducto.cantidad)
      });
      fetchProductos();
      setNuevoProducto({ nombre: "", precio: "", cantidad: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al agregar producto");
    }
  };

  // Preparar edicion
  const handleEdit = (producto) => {
    setEditando(producto.id);
    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio.toString(),
      cantidad: producto.cantidad.toString()
    });
  };

  // Guardar cambios
  const handleUpdate = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.cantidad) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      await axios.put(`${API_URL}/${editando}`, {
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio),
        cantidad: parseInt(nuevoProducto.cantidad)
      });
      fetchProductos();
      setEditando(null);
      setNuevoProducto({ nombre: "", precio: "", cantidad: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al actualizar producto");
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProductos();
      } catch (err) {
        console.error(err);
        setError("Error al eliminar producto");
      }
    }
  };

  // Cancelar edicion
  const cancelEdit = () => {
    setEditando(null);
    setNuevoProducto({ nombre: "", precio: "", cantidad: "" });
    setError("");
  };

  // Formato en pesos colombianos
  const formatCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(valor);

  const calcularTotal = () => {
    return productos.reduce((total, p) => total + (p.precio * p.cantidad), 0);
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h2 className="titulo">Gestión de Productos</h2>
        <div className="estadisticas">
          <div className="estadistica">
            <span>Total productos:</span>
            <strong>{productos.length}</strong>
          </div>
          <div className="estadistica">
            <span>Valor inventario:</span>
            <strong>{formatCOP(calcularTotal())}</strong>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="formulario-container">
        <h3>{editando ? "Editar Producto" : "Nuevo Producto"}</h3>
        {error && <div className="error">{error}</div>}

        <div className="formulario">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio (COP)"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={nuevoProducto.cantidad}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
          />
        </div>

        <div className="form-buttons">
          {editando ? (
            <>
              <button className="btn actualizar" onClick={handleUpdate}>Actualizar</button>
              <button className="btn cancelar" onClick={cancelEdit}>Cancelar</button>
            </>
          ) : (
            <button className="btn agregar" onClick={handleAdd}>Agregar Producto</button>
          )}
        </div>
      </div>

      {/* Lista de productos */}
      <div className="lista-container">
        <h3>Lista de Productos</h3>
        {productos.length === 0 ? (
          <div className="vacio">No hay productos registrados</div>
        ) : (
          <div className="lista-productos">
            {productos.map((p) => (
              <div key={p.id} className="producto-card">
                <div>
                  <h4>{p.nombre}</h4>
                  <p>Precio: {formatCOP(p.precio)}</p>
                  <p>Stock: {p.cantidad} unidades</p>
                  <p>Total: {formatCOP(p.precio * p.cantidad)}</p>
                </div>
                <div className="acciones">
                  <button className="btn editar" onClick={() => handleEdit(p)} disabled={editando !== null}>Editar</button>
                  <button className="btn eliminar" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
