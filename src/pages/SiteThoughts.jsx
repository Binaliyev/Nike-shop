import { Button, Input, Typography, alert } from "@material-tailwind/react"
import { Main } from "../Layout/Main"
import * as  Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
export const SiteThoughts = () => {
    const [data, setData] = useState([])
    const initialValues = {
        thoughts: ""
    }
    const validationSchema = Yup.object({
        thoughts: Yup.string().min(3, "Thoughts kamida 3ta harfdan tashkil topishi kerak").required("Thoughts yozish majburiy")
    })
    const handleThoughtsPost = async (event) => {
        event.preventDefault()
        const { thoughts } = formik.values
        if (formik.isValid === true) {
            await axios.post(`http://localhost:3000/thoughts`, {
                thoughts: thoughts,
                userId: window.localStorage.getItem("userId")
            })

        }
    }
    const handleThoughtsGet = async () => {
        const request = await axios.get(`http://localhost:3000/thoughts`)
        if (request.status === 200 || request.status === 201 || request.status === 304) {
            setData(request.data)
        }
    }
    handleThoughtsGet()
    const formik = useFormik({ initialValues, validationSchema, handleThoughtsPost })
    return (
        <>
            <Main>
                <div className="hero-inner">
                    <div className="thoughts-box">
                        <Link to={"/home"} className="relative bottom-10 bg-light-blue-500 p-2 flex items-center justify-between w-28 rounded-lg shadow-xl thoughts-link" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                            </svg>
                            Back
                        </Link>
                        <div className="thoughts-input-box">
                            <form onSubmit={handleThoughtsPost}>
                                <div className="relative flex w-full">
                                    <Input
                                        color="blue"
                                        type="search"
                                        className="pr-20 thoughts-input h-14 shadow-xl"
                                        {...formik.getFieldProps("thoughts")}
                                    />
                                    <Button
                                        size="sm"
                                        color="blue"
                                        className="!absolute right-1 top-2 flex items-center justify-between  h-full"
                                        type="submit"
                                    >
                                        Post
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                        </svg>
                                    </Button>
                                </div>
                                {/* <Input color="green" className="thoughts-input h-14 shadow-xl" {...formik.getFieldProps("thoughts")} /> */}
                                {formik.touched.thoughts && formik.errors.thoughts && (<Typography variant="h4" color="red" className="text-center mt-7 block">{formik.errors.thoughts}</Typography>)}
                            </form>
                        </div>
                        <div className="thoughts-post-box w-full h-[52rem] mt-10">
                            {data.map((item) => {
                                return (
                                    <div className={window.localStorage.getItem("mode") === "true" ? "thoughts-post-card w-[40%] h-auto  mx-auto flex items-center justify-between bg-blue-900 shadow-xl mt-10" : "thoughts-post-card w-[40%] h-auto  mx-auto flex items-center justify-between bg-blue-gray-900 shadow-xl mt-10"}>
                                        {/*  className={window.localStorage.getItem("mode") === "true" ? "thoughts-post-card w-[40%] h-auto  mx-auto flex items-center justify-between bg-blue-900 shadow-xl mt-10" : "thoughts-post-card w-[40%] h-auto  mx-auto flex items-center justify-between bg-blue-gray-900 shadow-xl mt-10"} */}
                                        <h1 className="thoughts-post-text">{item.thoughts}</h1>
                                        {
                                            item.userId === window.localStorage.getItem("userId") ? (
                                                <Button color="red" onClick={async () => {
                                                    await axios.delete(`http://localhost:3000/thoughts/${item.id}`)
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </Button>
                                            )
                                                :
                                                null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}