import React from "react"
import "../../public/styles.css"
import logo from "../../public/assets/logo.png"

function App() {
  return (
    <>
      <img src={logo} alt="Logo" />
      <h1>{process.env.TEST_ENV}</h1>
      <h2>Si funciona muy bien</h2>
    </>
  )
}

export default App
