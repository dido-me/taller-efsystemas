import React from "react"
// import logo from "../../public/assets/logo.svg"
import "../../public/css/navbar.css"

function Navbar() {
  return (
    <nav className="nav-custom">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">EF SYSTEMAS</label>
      <ul className="navbar-custom">
        <li className="navbar-item">
          <a className="navbar-link active" href="#">
            Buscar
          </a>
        </li>
        <li className="navbar-item">
          <a className="navbar-link" href="#">
            Pagina Principal
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
