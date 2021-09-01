import React from "react"
import { Step, Stepper, StepLabel, Button } from "@material-ui/core"

// Componets Content
import ClienteInfo from "./processRegistro/ClienteInfo"
import ProductoInfo from "./processRegistro/ProductoInfo"

// Componente ContentPage
const ContentPage = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  // Config
  const getSteps = () => {
    return [
      "Agregar Datos del cliente",
      "Agregar Productos a revisar",
      "Verificar Datos",
    ]
  }

  const getStepContent = (stepIndex) => {
    const stepI = stepIndex

    const STEP_CONTENT = {
      0: (
        <ClienteInfo
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ),
      1: (
        <ProductoInfo
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ),
      2: <h1>Hola3</h1>,
    }

    const STEP_DEFAULT = "No se econtro step"

    return STEP_CONTENT[stepI] || STEP_DEFAULT
  }

  const steps = getSteps()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + 1
    })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Taller</h1>
      <div className="card shodow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            REGISTRO DEL SERVICIO TALLER
          </h6>
        </div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-md">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
            </div>

            {activeStep === steps.length ? (
              <>
                <div className="row">
                  <div className="col-md">
                    <h1>Terminaron registro</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md">
                    <div className="col-md">
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>{getStepContent(activeStep)}</>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPage
