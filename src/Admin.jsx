import React from "react"
import "../assets/admin/css/sb-admin-2.css"
import "../assets/admin/js/sb-admin-2"
import Main from "./components/admin/Main"
import Sidebar from "./components/admin/Sidebar"
import ModalLogout from "./components/admin/ModalLogout"

const Admin = () => {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <Main />
      </div>
      {/*  <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
      <ModalLogout />
    </>
  )
}

export default Admin
