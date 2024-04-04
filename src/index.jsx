import react from "react"
import reactDOM from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { Context } from "./context/Context"
const root = reactDOM.createRoot(document.querySelector("#root"))
root.render(
  <Context>
    <App/>
  </Context>
)