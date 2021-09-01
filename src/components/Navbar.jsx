import React from "react"
import logo from "../../public/assets/logo.svg"
import "../../public/css/navbar.css"

function Navbar() {
  return (
    <nav className="navbar-c">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars" id="btn"></i>
      </label>
      <a href="#">
        <img src={logo} alt="Logo" />
      </a>
      <ul className="navbar-c-container">
        <li className="navbar-c-item">
          <a href="#" className="active navbar-c-link ">
            Buscar
          </a>
        </li>
        <li className="navbar-c-item">
          <a href="#" className="navbar-c-link">
            Pagina Principal
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
