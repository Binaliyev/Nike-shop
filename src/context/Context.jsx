import axios from "axios"
import { createContext, useState } from "react"
export const globallContext = createContext()
const handleLogin = async (email, password) => {
    try {
        const request = await axios.post(`http://localhost:3000/login`, {
            email: email,
            password: password
        })
        console.log(request);
        if (request.status === 200 || request.status === 201 || request.status === 304) {
            const response = await request.data
            window.localStorage.setItem("accessToken", response.accessToken)
            window.localStorage.setItem("userId", response.user.id)
            document.cookie = `${password}`
            window.location.href = "/"
        }
    } catch (error) {
        alert(error.message)
        console.log(error);
    }
}
export const Context = ({ children }) => {
    const [spinner, setSpinner] = useState(false)
    const [siteApi, setSiteApi] = useState(`http://localhost:3000/tovars`)
    const [mode, setMode] = useState(false)
    const handleGloballPost = async (api, post_info) => {
        try {
            const request = await axios.post(api, post_info)
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                window.localStorage.removeItem("products_name")
                window.localStorage.removeItem("products_price")
                window.localStorage.removeItem("product_term_payment")
                window.localStorage.removeItem("product_id")
            }
        } catch (error) {
            alert(error.message)
            console.log(error);
        }
    }
    const handleDelete = async (api) => {
        try {
            const request = await axios.delete(api)
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                window.localStorage.removeItem("product_id")
                window.localStorage.removeItem("id")
            }
        } catch (error) {
            console.log(error);
            alert(error.message)
        }

    }
    const initialValues = {
        handleLogin: handleLogin,
        spinner: spinner,
        setSpinner: setSpinner,
        siteApi: siteApi,
        mode: mode,
        setMode: setMode,
        setSiteApi: setSiteApi,
        handleGloballPost: handleGloballPost,
        handleDelete: handleDelete,
    }
    return (
        <globallContext.Provider value={initialValues}>
            {children}
        </globallContext.Provider>
    )
}