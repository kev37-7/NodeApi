import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <div className="brand-text">
            <h1 className="brand-title">InventoryPro</h1>
            <p className="brand-subtitle">Sistema de Gestión</p>
          </div>
        </div>

        <nav className="nav-desktop">
          <a href="#productos" className="nav-link active">Productos</a>
          <a href="#inventario" className="nav-link">Inventario</a>
          <a href="#reportes" className="nav-link">Reportes</a>
        </nav>

      </div>
    </header>
  );
}
