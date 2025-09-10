import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        <div className="footer-section">
          <h3>InventoryPro</h3>
          <p>Sistema de inventario moderno, rápido y confiable.</p>
        </div>

        <div className="footer-section">
          <h3>Enlaces rápidos</h3>
          <a href="#productos">Productos</a><br />
          <a href="#inventario">Inventario</a><br />
          <a href="#reportes">Reportes</a><br />
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Popayán, Cauca - Colombia</p>
          <p>contacto@inventorypro.com</p>
          <p>+57 312 456 7890</p>
        </div>

        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-links">
            <a href="#"><span>IG</span></a>
            <a href="#"><span>FB</span></a>
            <a href="#"><span>X</span></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
         InventoryPro - Todos los derechos reservados.
      </div>
    </footer>
  );
}
