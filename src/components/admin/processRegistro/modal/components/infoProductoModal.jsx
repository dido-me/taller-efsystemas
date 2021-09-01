import React from "react"
import { Row, Col, Spinner } from "react-bootstrap"
import { Autocomplete } from "@material-ui/lab"
import { TextField, IconButton } from "@material-ui/core"
// Firebase
import { db } from "../../../../../firebase"

const infoProductoModal = ({ formik }) => {
  // Spinner
  const [spiner, setSpiner] = React.useState(false)
  // Modelo
  const [addModelo, setAddModelo] = React.useState(false)
  const [modelo, setModelo] = React.useState("")
  const [modelos, setModelos] = React.useState([])

  // Tipo de Producto
  const [addTipoProducto, setAddTipoProducto] = React.useState(false)
  const [tipoProducto, setTipoProducto] = React.useState("")
  const [tiposProducto, setTiposProducto] = React.useState([])

  // Marcas
  const [inAddMarca, setInAddMarca] = React.useState(false)
  const [marca, setMarca] = React.useState("")
  const [marcasProductos, setMarcasProductos] = React.useState([])
  // Errores
  const [errorInput, setErrorInput] = React.useState(null)
  // Agregar Marca
  const agregar = async () => {
    if (!marca.trim()) {
      setErrorInput("Campo Vacio")
      return
    }

    try {
      setSpiner(true)
      await db.collection("marcasProducto").doc(marca.toUpperCase()).set({
        name: marca.toUpperCase(),
      })
      const arrayFiltrado = marcasProductos.filter(
        (e) => e.id.toUpperCase() !== marca.toUpperCase()
      )
      const arrayNuevo = [
        ...arrayFiltrado,
        {
          id: marca.toUpperCase(),
          name: marca.toUpperCase(),
        },
      ]
      setMarcasProductos(arrayNuevo)
      setMarca("")
      setErrorInput(null)
      setSpiner(false)
      setInAddMarca(false)
      formik.setFieldTouched("marcaProducto", false)
    } catch (error) {
      console.log(error)
    }
  }
  // Agregar Tipo de Producto
  const agregarTipoProducto = async () => {
    if (!tipoProducto.trim()) {
      setErrorInput("Campo Vacio")
      return
    }
    try {
      setSpiner(true)
      await db.collection("tiposProducto").doc(tipoProducto.toUpperCase()).set({
        name: tipoProducto.toUpperCase(),
      })
      const arrayFiltrado = tiposProducto.filter(
        (e) => e.id.toUpperCase() !== tipoProducto.toUpperCase()
      )
      const arrayNuevo = [
        ...arrayFiltrado,
        {
          id: tipoProducto.toUpperCase(),
          name: tipoProducto.toUpperCase(),
        },
      ]
      setTiposProducto(arrayNuevo)
      setTipoProducto("")
      setErrorInput(null)
      setSpiner(false)
      setAddTipoProducto(false)
      formik.setFieldTouched("tipoProducto", false)
    } catch (error) {
      console.log(error)
    }
  }
  // Agregar Modelo
  const agregarModelo = async () => {
    if (!modelo.trim()) {
      setErrorInput("Campo Vacio")
      return
    }
    try {
      setSpiner(true)
      await db.collection("modelosProducto").doc(modelo.toUpperCase()).set({
        name: modelo.toUpperCase(),
      })
      const arrayFiltrado = modelos.filter(
        (e) => e.id.toUpperCase() !== modelo.toUpperCase()
      )

      const arrayNuevo = [
        ...arrayFiltrado,
        {
          id: modelo.toUpperCase(),
          name: modelo.toUpperCase(),
        },
      ]

      setModelos(arrayNuevo)
      setModelo("")
      setErrorInput(null)
      setSpiner(false)
      setAddModelo(false)
      formik.setFieldTouched("modeloProducto", false)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const getMarcasProducto = async () => {
      try {
        const dataMarcasProductos = await db.collection("marcasProducto").get()
        const arrayMarcasProductos = dataMarcasProductos.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setMarcasProductos(arrayMarcasProductos)
      } catch (error) {
        console.log(error)
      }
    }
    const getTiposProducto = async () => {
      try {
        const dataTiposProductos = await db.collection("tiposProducto").get()
        const arrayTiposProductos = dataTiposProductos.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setTiposProducto(arrayTiposProductos)
      } catch (error) {
        console.log(error)
      }
    }

    const getModelosProducto = async () => {
      try {
        const dataModelosProducto = await db.collection("modelosProducto").get()
        const arrayModelosProducto = dataModelosProducto.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setModelos(arrayModelosProducto)
      } catch (error) {
        console.log(error)
      }
    }

    getModelosProducto()
    getTiposProducto()
    getMarcasProducto()
  }, [])
  return (
    <>
      <Row className="mt-4">
        <Col sm={10}>
          {addTipoProducto ? (
            <TextField
              fullWidth
              id="agregarTipoProducto"
              label="Agregue Tipo de Producto"
              value={tipoProducto}
              onChange={(e) => setTipoProducto(e.target.value)}
              error={Boolean(errorInput)}
              helperText={errorInput && errorInput}
              disabled={spiner}
            />
          ) : (
            <Autocomplete
              id="tipoProducto"
              name="tipoProducto"
              options={tiposProducto}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(e, value) =>
                formik.setFieldValue("tipoProducto", value?.id || "")
              }
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    formik.touched.tipoProducto && formik.errors.tipoProducto
                  )}
                  helperText={
                    formik.touched.tipoProducto && formik.errors.tipoProducto
                  }
                  label="Tipo de Producto"
                  variant="outlined"
                />
              )}
            />
          )}
        </Col>
        <Col sm={2} className={addTipoProducto && "d-flex align-items-center"}>
          {addTipoProducto ? (
            spiner ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <>
                <IconButton
                  aria-label="agregarTipoProducto"
                  style={{ color: "#1cc88a" }}
                  size={"small"}
                  onClick={agregarTipoProducto}
                >
                  <i className="fas fa-file-signature"></i>
                </IconButton>

                <IconButton
                  aria-label="Return"
                  color="secondary"
                  size={"small"}
                  onClick={() => {
                    setErrorInput(null)
                    setAddTipoProducto(false)
                  }}
                  className="ml-1"
                >
                  <i className="fas fa-undo-alt"></i>
                </IconButton>
              </>
            )
          ) : (
            <IconButton
              aria-label="agregarTipoProductoModal"
              style={
                inAddMarca || addModelo
                  ? { color: "#c3c3c3" }
                  : { color: "#1cc88a" }
              }
              onClick={() => setAddTipoProducto(true)}
              disabled={inAddMarca || (addModelo && true)}
            >
              <i className="fas fa-plus-circle"></i>
            </IconButton>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm={10}>
          {inAddMarca ? (
            <TextField
              fullWidth
              id="agregarMarcar"
              label="Agregue una Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              error={Boolean(errorInput)}
              helperText={errorInput && errorInput}
              disabled={spiner}
            />
          ) : (
            <Autocomplete
              id="marcaProducto"
              name="marcaProducto"
              options={marcasProductos}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(e, value) =>
                formik.setFieldValue("marcaProducto", value?.id || "")
              }
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    formik.touched.marcaProducto && formik.errors.marcaProducto
                  )}
                  helperText={
                    formik.touched.marcaProducto && formik.errors.marcaProducto
                  }
                  label="Marca de Producto"
                  variant="outlined"
                />
              )}
            />
          )}
        </Col>
        <Col sm={2} className={inAddMarca && "d-flex align-items-center"}>
          {inAddMarca ? (
            spiner ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <>
                <IconButton
                  aria-label="agregarMarca"
                  style={{ color: "#1cc88a" }}
                  size={"small"}
                  onClick={agregar}
                >
                  <i className="fas fa-file-signature"></i>
                </IconButton>
                <IconButton
                  aria-label="Return"
                  color="secondary"
                  size={"small"}
                  onClick={() => {
                    setErrorInput(null)
                    setInAddMarca(false)
                  }}
                  className="ml-1"
                >
                  <i className="fas fa-undo-alt"></i>
                </IconButton>
              </>
            )
          ) : (
            <IconButton
              aria-label="agregarMarcaEstado"
              style={
                addTipoProducto || addModelo
                  ? { color: "#c3c3c3" }
                  : { color: "#1cc88a" }
              }
              color="primary"
              onClick={() => setInAddMarca(true)}
              disabled={addTipoProducto || (addModelo && true)}
            >
              <i className="fas fa-plus-circle"></i>
            </IconButton>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm={10}>
          {addModelo ? (
            <TextField
              fullWidth
              id="agregarModelo"
              label="Agregue una Modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              error={Boolean(errorInput)}
              helperText={errorInput && errorInput}
              disabled={spiner}
            />
          ) : (
            <Autocomplete
              id="modeloProducto"
              name="modeloProducto"
              options={modelos}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(e, value) =>
                formik.setFieldValue("modeloProducto", value?.id || "")
              }
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    formik.touched.modeloProducto &&
                      formik.errors.modeloProducto
                  )}
                  helperText={
                    formik.touched.modeloProducto &&
                    formik.errors.modeloProducto
                  }
                  label="Modelo del Producto"
                  variant="outlined"
                />
              )}
            />
          )}
        </Col>
        <Col sm={2} className={addModelo && "d-flex align-items-center"}>
          {addModelo ? (
            spiner ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <>
                <IconButton
                  aria-label="agregarModelo"
                  style={{ color: "#1cc88a" }}
                  size={"small"}
                  onClick={agregarModelo}
                >
                  <i className="fas fa-file-signature"></i>
                </IconButton>
                <IconButton
                  aria-label="Return"
                  color="secondary"
                  size={"small"}
                  onClick={() => {
                    setErrorInput(null)
                    setAddModelo(false)
                  }}
                  className="ml-1"
                >
                  <i className="fas fa-undo-alt"></i>
                </IconButton>
              </>
            )
          ) : (
            <IconButton
              aria-label="agregarModeloEstado"
              style={
                addTipoProducto || inAddMarca
                  ? { color: "#c3c3c3" }
                  : { color: "#1cc88a" }
              }
              onClick={() => setAddModelo(true)}
              disabled={addTipoProducto || (inAddMarca && true)}
            >
              <i className="fas fa-plus-circle"></i>
            </IconButton>
          )}
        </Col>
      </Row>
    </>
  )
}

export default infoProductoModal
