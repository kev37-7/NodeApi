const mysql = require("mysql2");

// Configuracion de conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",     // cambia si tu usuario es distinto
  password: "",     // pon tu contraseña si tienes
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
