const mysql = require("mysql2");

// Configuracion de conexion a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",     // cambia si el usuario es distinto
  password: "",     // se coloca contraseña si se tiene
  database: "tienda"
});

// Verificar conexion
db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

module.exports = db; // Exportamos la conexion
