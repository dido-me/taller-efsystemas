import React from "react"
import { Modal } from "react-bootstrap"
import { IconButton, TextField } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { useFormik } from "formik"
import * as Yup from "yup"
import { db } from "../../firebase"

const validate = Yup.object({
  nameMarca: Yup.string()
    .required("Ingrese el nombre de la marca")
    .matches(/^[a-zA-Z0-9_]*$/, "Solo valor alfanumerico"),
})

const ModalCus = ({ estadoModal, handleClose, marcas, setMarcas, title }) => {
  const formik = useFormik({
    initialValues: {
      nameMarca: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      console.log(data)
      agregar(data)
      handleClose()
    },
  })
  //   Accion
  const agregar = async (data) => {
    try {
      await db
        .collection("marcasProducto")
        .doc(data.nameMarca.toUpperCase())
        .set({
          name: data.nameMarca.toUpperCase(),
        })

      const arrayFiltrado = marcas.filter(
        (e) => e.id.toUpperCase() !== data.nameMarca.toUpperCase()
      )

      console.log(arrayFiltrado)
      const arrayNuevo = [
        ...arrayFiltrado,
        {
          id: data.nameMarca.toUpperCase(),
          name: data.nameMarca.toUpperCase(),
        },
      ]
      setMarcas(arrayNuevo)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Modal show={estadoModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>
            <h3 className="text-primary text-uppercase">{title}</h3>
          </Modal.Title>
          <IconButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container mb-3">
              <TextField
                id="nameMarca"
                name="nameMarca"
                label="Nombre de la Marca"
                value={formik.values.nameMarca}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nameMarca && Boolean(formik.errors.nameMarca)
                }
                helperText={formik.touched.nameMarca && formik.errors.nameMarca}
                fullWidth
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary btn-icon-split">
              <span className="icon text-white-50">
                <i className="fas fa-plus-square"></i>
              </span>
              <span className="text">Agregar</span>
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default ModalCus
