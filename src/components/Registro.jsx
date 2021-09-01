// import { useDispatch, useSelector } from "react-redux"
// import { getDniAction } from "../redux/tallerRegistroDucks"
import React from "react"

const Registro = () => {
  // const [numDNI, setNumDNI] = React.useState("")

  // const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  // const dataDNI = useSelector((store) => store.registros.data)

  // const keyPress = (e) => {
  //   if (e.key === "Enter") {
  //     dispatch(getDniAction(numDNI))

  //     e.preventDefault()
  //   }
  // }

  return (
    <div className="conatiner mt-5">
      <div className="card text-center">
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  )
}

export default Registro
