const express = require("express");
const cors = require("cors");
const db = require("./db"); // Importa la conexion desde db.js

const app = express();
app.use(cors());
app.use(express.json());

// ================== RUTAS ================== //

// Obtener todos los productos
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Insertar un producto
app.post("/productos", (req, res) => {
  const { nombre, precio, cantidad } = req.body;
  if (!nombre || !precio || !cantidad) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  db.query(
    "INSERT INTO productos (nombre, precio, cantidad) VALUES (?, ?, ?)",
    [nombre, precio, cantidad],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, nombre, precio, cantidad });
    }
  );
});

// Actualizar un producto por ID
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad } = req.body;

  db.query(
    "UPDATE productos SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?",
    [nombre, precio, cantidad, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ message: "Producto actualizado correctamente" });
    }
  );
});

// Eliminar un producto por ID
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  });
});

// ================== SERVIDOR ================== //
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
