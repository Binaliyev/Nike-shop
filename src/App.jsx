import { RouterProvider } from "react-router-dom"
import "./App.css"
import { rout } from "./Routes"
export const App = () => {
  return (
    <>
      <RouterProvider router={rout}/>
    </>
  )
}