// export default ProductoInfo
// Imports
import React from "react"
// Material UI
import { Button } from "@material-ui/core"
// Componentes
import CrearInfoProducto from "./modal/CrearInfoProducto"

// --------------------------------------------------------
// Logica del Componenete
const ProductoInfo = ({ steps, activeStep, handleBack, handleNext }) => {
  // Modal
  const [show, setShow] = React.useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      {/* Modales */}
      {show && <CrearInfoProducto show={show} handleClose={handleClose} />}

      {/* Fin de Modal */}
      <div className="row mt-3 text-center ">
        <div className="col-md-12">
          <h3 className="text-dark">Productos</h3>
        </div>
        <div className="col-md-12 mt-3">
          <button
            className="btn btn-success btn-icon-split"
            type="button"
            onClick={() => {
              handleShow()
            }}
          >
            <span className="icon text-white">
              <i className="fas fa-plus-circle"></i>
            </span>
            <span className="text">AGREGAR</span>
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default ProductoInfo
