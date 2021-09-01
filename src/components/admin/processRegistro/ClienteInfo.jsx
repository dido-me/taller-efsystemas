// Importaciones
import React from "react"
import { useFormik } from "formik"

// Agregar data
import SetFullName from "../../../renderInput/setInputFullName"

// Custom hooks
import useLocalStorage from "../../../hooks/useLocalStorage"

// Material UI
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
// Validacion del formulario
import * as Yup from "yup"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { getDniAction } from "../../../redux/tallerRegistroDucks"

// --------------------------------------------------------------------

// Logica del Componente

// Validacion del Formulario
const validate = Yup.object({
  DNI: Yup.number()
    .required("Ingrese DNI")
    .typeError("DNI Inválido")
    .min(10000000, "DNI Inválido")
    .max(99999999, "DNI Inválido"),
  fullName: Yup.string().required("Ingrese DNI para obtener datos"),
})

// Componete ClienteInfo
const ClienteInfo = ({ steps, activeStep, handleBack, handleNext }) => {
  // Variables useState
  const [btnDNI, setBtnDNI] = React.useState(false)
  const [spinner, setSpinner] = React.useState(false)
  const [dataClean, setDataClean] = React.useState()
  //   cutom hook

  // eslint-disable-next-line no-unused-vars
  const [cliente, setCliente] = useLocalStorage("cliente", null)
  // Variables Redux
  const dispatch = useDispatch()
  const dataDNI = useSelector((store) => store.registros)
  //   Inicializando Formik
  const formik = useFormik({
    initialValues: {
      DNI: "73497941",
      // DNI: "",
      fullName: "Esteban Villantoy Tineo",
      // fullName: "",
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      const dataClean = { DNI: data.DNI, fullName: data.fullName }

      setCliente(JSON.stringify(dataClean))
      // addRegistro(data)
      handleNext()
    },
  })

  //   Limpiar Imput
  const cleanInputDni = (setFieldValue, setFieldTouched) => {
    setFieldValue("DNI", "")
    setFieldTouched("DNI", false)
    setFieldValue("fullName", "")
    setFieldTouched("fullName", false)
    setBtnDNI(false)
    setDataClean()
  }
  // Funcion Llamar al Api
  const EnterRender = (e, valor, setFieldTouched) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!valor.trim() || !/^[0-9]{8,8}$/.test(valor)) {
        setFieldTouched("DNI", true)
        e.preventDefault()
        return
      }
      setSpinner(true)
      setBtnDNI(true)
      dispatch(getDniAction(valor))
      e.preventDefault()
    }
  }

  //   Use Efecct
  React.useEffect(() => {
    // Limpear localstorage
    localStorage.clear()
    const ocultarSpinner = () => {
      if (dataDNI) {
        setSpinner(false)
        setDataClean(dataDNI)
      }
    }

    ocultarSpinner()
  }, [dataDNI])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <SetFullName
          nombres={dataClean ? dataClean.data.nombres : null}
          apellido_paterno={dataClean ? dataClean.data.apellidoPaterno : null}
          apellido_materno={dataClean ? dataClean.data.apellidoMaterno : null}
          formikCustom={formik}
        />
        <h4 className="text-dark">Datos del Cliente</h4>
        <hr />
        <div className="form-row mt-4">
          <div className="form-group col-md-4 ">
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-address-card"></i>
                  </InputAdornment>
                ),
              }}
              label="DNI"
              variant="outlined"
              id="DNI"
              name="DNI"
              value={formik.values.DNI}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.DNI && Boolean(formik.errors.DNI)}
              helperText={formik.touched.DNI && formik.errors.DNI}
              inputProps={{ maxLength: 8 }}
              onKeyPress={(e) => {
                EnterRender(e, formik.values.DNI, formik.setFieldTouched)
              }}
            />
            {dataDNI.success === false && (
              <p className="text-danger">
                {dataDNI.message} (Posiblemente DNI Invalido)
              </p>
            )}
          </div>
          <div className="form-group col-md-2 ">
            <div className="d-flex align-items-center">
              <IconButton
                aria-label="Process"
                color="primary"
                onClick={(e) => {
                  btnDNI
                    ? cleanInputDni(
                        formik.setFieldValue,
                        formik.setFieldTouched
                      )
                    : EnterRender(e, formik.values.DNI, formik.setFieldTouched)
                }}
              >
                {btnDNI ? <DeleteIcon /> : <CheckCircleIcon />}
              </IconButton>
              {spinner && (
                <div className="spinner-grow text-success" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="form-group mt-4">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="fas fa-user"></i>
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="outlined"
            label="Nombre del Cliente"
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            disabled
          />
        </div>
        <div className="row mt-4">
          <div className="col-md">
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default ClienteInfo
