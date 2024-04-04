import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { BasketPage, HomePage, LikePage, LoginPage, RegisterPage, SettingsPage, SiteThoughts, TovarsInfoPage } from "./pages";
import { SiteHeader } from "./Layout/Header";
const accessToken = window.localStorage.getItem("accessToken")
export const rout = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route path="/*" element={accessToken? <SiteHeader/> : <LoginPage />} >
                <Route index element={accessToken? <HomePage/> : null}/>
                <Route path="home" element={<HomePage/>}/>   
                <Route path="basket" element={<BasketPage/>}/>
                <Route path=":product_id" element={<TovarsInfoPage/>}/>
                <Route path="user" element={<SettingsPage/>}/>
                <Route path="like" element={<LikePage/>}/>
            </Route>,
            <Route path="/thoughts" element={<SiteThoughts/>}/>,
            <Route path="/login" element={<LoginPage/>}/>,
            <Route path="/register" element={<RegisterPage/>}/>
        ]
    )
)