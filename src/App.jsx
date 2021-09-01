import React from "react"

import Admin from "./Admin"

import { Provider } from "react-redux"
import generateStore from "./redux/store"

function App() {
  const store = generateStore()
  return (
    <Provider store={store}>
      {/* <Navbar />
      <Registro /> */}
      <Admin />
    </Provider>
  )
}

export default App
