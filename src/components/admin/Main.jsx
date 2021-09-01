import React from "react"
import Navbar from "./Navbar"
import ContentPage from "./ContentPage"
import Footer from "./Footer"

const Main = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Navbar />
        <ContentPage />
      </div>
      <Footer />
    </div>
  )
}

export default Main
