import React from "react"
import { Modal, Button, Tab, Row, Col, Nav } from "react-bootstrap"
import { IconButton } from "@material-ui/core"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import { useFormik } from "formik"
// Componentes
import InfoProducto from "./components/infoProductoModal"
// Validacion del formulario
import * as Yup from "yup"
import CustodiaModel from "./components/CustodiaModel"
import FallasModal from "./components/FallasModal"
// nanoid
import { nanoid } from "nanoid"
import ServicioModal from "./components/ServicioModal"

// ====================================================

// Validacion
const validate = Yup.object({
  marcaProducto: Yup.string().required("Selecione Marca del Producto"),
  tipoProducto: Yup.string().required("Selecione Tipo del Producto"),
  modeloProducto: Yup.string().required("Selecione Modelo del Producto"),
  fallas: Yup.array().min(1, "Ingrese una falla como minimo"),
  servicios: Yup.object().shape({
    total: Yup.number().min(0.1).required("Ingrese un servicio como minimo"),
  }),
})

const CrearInfoProducto = ({ show, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      uid: nanoid(),
      marcaProducto: "",
      tipoProducto: "",
      modeloProducto: "",
      custodia: [],
      fallas: [],
      servicios: {},
    },
    validationSchema: validate,
    onSubmit: (data) => {
      const cliente = JSON.parse(localStorage.getItem("cliente"))
      const dataFull = { ...data, cliente }
      console.log(dataFull)
    },
  })

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} size="lg">
        <Modal.Header>
          <Modal.Title className="text-primary">AGREGAR PRODUCTO</Modal.Title>
          <Modal.Title>
            <IconButton
              color="secondary"
              aria-label="close"
              onClick={() => {
                handleClose()
                formik.resetForm()
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Tab.Container id="infoProducto" defaultActiveKey="infoProd">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="infoProd">Info. Producto</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="custodia">Custodia</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fallas">Fallas</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="servicio">Servicio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="recomend">Recomendaciones</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="infoProd">
                      <InfoProducto formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="custodia">
                      <CustodiaModel formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fallas">
                      <FallasModal formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="servicio">
                      <ServicioModal formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="recomend">
                      <h3>Recomendaciones</h3>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Terminar Registro
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default CrearInfoProducto
