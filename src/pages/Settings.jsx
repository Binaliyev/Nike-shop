import { Avatar, Button, Card, CardBody, CardFooter, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography } from "@material-tailwind/react"
import { Main } from "../Layout"
// import user_img from "../assets/imgs/img.webp"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useContext, useState } from "react"
import axios from "axios"
import { globallContext } from "../context/Context"
import { Link } from "react-router-dom"
export const SettingsPage = () => {
    const { mode, setMode } = useContext(globallContext)
    const [update, setUpdate] = useState(true)
    const [data, setData] = useState({})
    const [imgData, setImgData] = useState([])
    const [open, setOpen] = useState(false)
    const body = document.querySelector("body")
    const initialValues = {
        username: "",
        email: "",
        password: "",
        img_url: ""
    }
    const validationSchema = Yup.object({
        username: Yup.string().min(3, "Ism eng kamida 3ta harfdan tashkil topishi kerak ").max(10, "Ism 10ta harfdan oshmasligi kerak").required("Ism kirgizish majburiy"),
        email: Yup.string().email("Yaroqsiz email manzili").required("Email kirgizish majburiy"),
        password: Yup.string().min(5, "Password eng kamida 5ta belgi yoki harflardan iborat bo'lishi kerak").max(15, "Password  15ta belgi yoki harflardan oshmasligi bo'lishi kerak").required("Password kirgizish majburiy "),
        img_url: Yup.string().required("URL kirgizish majburiy")
    })
    const handleGetUserInfo = async () => {
        try {
            const request = await axios.get(`http://localhost:3000/users/${window.localStorage.getItem("userId")}`)
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                const response = await request.data
                if (response) {
                    setData({
                        username: response.username,
                        email: response.email,
                        password: response.password
                    })
                }
            }
        } catch (error) {
            // alert(error.message)
            console.log(error);
        }
    }
    handleGetUserInfo()
    // const [error, setError] = useState({
    //     username: " ",
    //     email: "",
    //     password: ""
    // })
    // const validate = (values) => {
    //     const emailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    //     if (!values.username) {
    //         setError({
    //             ...error, username: "Ism kiritish majburiy"
    //     })
    //     }else if (values.username.length < 2) {
    //         setError({
    //             ...error, username: "Ism eng kamidan 3ta harfdan tashkil topishi kerak"
    //     })
    //     }else if (values.username.length > 10 ) {
    //         setError({
    //             ...error, username: "Ism ko'pi bilan 10ta harfdan tashkil topishi kerak"
    //     })
    //     }else if (!values.email ) {
    //         setError({
    //             ...error, email: "Email kiritish majburiy"
    //     })}else if (!emailValidate) {
    //         setError({
    //             ...error, email: "Xato email manzili"
    //     })
    //     }else if (!values.password ) {
    //         setError({
    //             ...error, password: "Password kiritish majburiy"
    //     })}else if (values.password < 4) {
    //         setError({
    //             ...error, password: "Password eng kamidan 5ta harf va belgidan  tashkil topishi kerak"
    //     })
    //     }else if (values.password > 15) {
    //         setError({
    //             ...error, password: "Password ko'pi bilan 15ta harf va belgidan  tashkil topishi kerak"
    //     })}else{
    //         setError(null)
    //     }
    //     return error
    // }
    // const handleAcountEdit = (event) => {
    //     event.preventDefault()
    //     if (error) {
    //         return;
    //     }else{
    //         console.log(formik);
    //     }
    //     // console.log(formik);
    // }
    const handleAcountEdit = async (event) => {
        try {
            event.preventDefault()
            const { username, email, password } = formik.values
            const userPassword = document.cookie
            if (username !== data.username || email !== data.email || password !== data.password) {
                const request = await axios.put(`http://localhost:3000/users/${window.localStorage.getItem("userId")}`, {
                    username: username !== '' ? username : data.username,
                    email: email !== '' ? email : data.email,
                    password: password !== '' ? password : userPassword
                })
                if (request.status === 200 || request.status === 201 || request.status === 304) {
                    alert("Acount muvafiqatli edit bo'ldi")
                }
            }
        } catch (error) {
            alert(error.message)
            console.log(error);
        }
    }
    const handleEditIMG = async (event) => {
        event.preventDefault()
        try {
            const request = await axios.post(`http://localhost:3000/userIMG`, {
                user_img: formik.values.img_url,
                userId: window.localStorage.getItem(`userId`)
            })
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                setOpen(!open)
                setUpdate(false)
            }
        } catch (error) {
            alert(error.message)
            console.log(error);
        }

    }
    const handleGetUserImg = async () => {
        try {
            const request = await axios.get(`http://localhost:3000/userIMG`)
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                const response = await request.data
                setImgData(response)
            }
        } catch (error) {
            // alert(error.message)
            console.log(error);
        }
    }
    handleGetUserImg()
    const handleMode = () => {
        if (window.localStorage.getItem("mode") === "true") {
            body.style.background = "black"
        } else if (window.localStorage.getItem("mode") === "false") {
            body.style.background = "white"
        }
    }
    const formik = useFormik({ initialValues, validationSchema, handleAcountEdit, handleEditIMG })
    return (
        <>
            <Main>
                <Dialog
                    open={open}
                    handler={() => { setOpen(!open) }}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <form onSubmit={handleEditIMG}>
                        <DialogHeader>Rasm url ni kirgizing</DialogHeader>
                        <DialogBody>
                            <Input color="blue" label="Img URL" type="url" {...formik.getFieldProps("img_url")} />
                            {formik.touched.img_url && formik.errors.img_url && (
                                <Typography variant="h6" color="red" >{formik.errors.img_url}</Typography>
                            )}
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => { setOpen(!open) }}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" type="submit">
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
                <div className="hero-inner">
                    <div className="settings-box">
                        <div className="avatar-box text-center mb-10">
                            {imgData.map((item) => {
                                if (item.userId === window.localStorage.getItem("userId")) {
                                    return (
                                        <Avatar src={item.user_img} alt=" user_avatar" variant="rounded" size="xxl" className="mx-auto" onClick={async () => {
                                            window.localStorage.setItem(`img_id`, item.id)
                                            if (window.localStorage.getItem(`img_id`)) {
                                                try {
                                                    const request = await axios.delete(`http://localhost:3000/userIMG/${window.localStorage.getItem(`img_id`)}`)
                                                    if (request.status === 200 || request.status === 201 || request.status === 304) {
                                                        setUpdate(true)
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }
                                        }} />
                                    )
                                } else {
                                    return (

                                        <span>Buyerda rasm yo'q</span>
                                    )
                                }
                            })}
                            <Typography variant="h3" color="blue">{data.username}</Typography>
                            <Typography color="red" variant="h6" className="ml-5 w-[25rem] mx-auto" >Ogohlantiramiz rasm ni edit qilish dan oldin rasmni o'chiring, rasmni o'chirish uchun uning ustiga bosing</Typography>
                        </div>
                        <Card className={window.localStorage.getItem("mode") === "true" ? " bg-blue-gray-900 mx-auto w-[28rem] acount-card" : "mx-auto w-[28rem] acount-card"}>
                            {/* className={window.localStorage.getItem("mode") === "true" ? " bg-blue-gray-900 mx-auto w-[28rem]" : "mx-auto w-[28rem]"} */}
                            <form onSubmit={handleAcountEdit}>
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        Acount Tahrirlash
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"}>
                                        Your Username
                                    </Typography>
                                    <Input label={data.username} size="lg" color="blue" type="text" name="username"
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.username}
                                        placeholder="Username"
                                        {...formik.getFieldProps("username")}
                                    />
                                    {formik.touched.username && formik.errors.username && (<Typography variant="h6" color="red">{formik.errors.username}</Typography>)}
                                    <Typography className="-mb-2" variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} >
                                        Your Email
                                    </Typography>
                                    <Input label={data.email} size="lg" color="blue" type="email" name="email"
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.email}
                                        placeholder="Email"
                                        {...formik.getFieldProps("email")}
                                    />
                                    {formik.touched.email && formik.errors.email && (<Typography variant="h6" color="red">{formik.errors.email}</Typography>)}
                                    <Typography className="-mb-2" variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"}>
                                        Your Password
                                    </Typography>
                                    <Input label={"***********"} size="lg" color="blue" type="password" name="password" {...formik.getFieldProps("password")}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.password}
                                        placeholder="Password"
                                    />
                                    {formik.touched.password && formik.errors.password && (<Typography variant="h6" color="red">{formik.errors.password}</Typography>)}
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <div className="button-box">
                                        <Button variant="gradient" color="light-blue" fullWidth className="mt-3" type="submit">
                                            Update Submit
                                        </Button>
                                        {
                                            update ? (
                                                <Button variant="gradient" color="blue-gray" fullWidth className="mt-3" onClick={() => { setOpen(!open) }}>
                                                    Img update
                                                </Button>
                                            ) : null
                                        }
                                    </div>
                                </CardFooter>
                            </form>
                        </Card>
                        <div className="utels-box w-[28rem] h-[10rem] mx-auto mt-8 ">
                            <SpeedDial placement="right">
                                <SpeedDialHandler>
                                    <IconButton size="lg" className="rounded-full" color="blue">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 right-icon-box">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </IconButton>
                                </SpeedDialHandler>
                                <SpeedDialContent className="flex-row justify-between rounded-full border border-blue-gray-50 bg-blue-500 shadow-xl shadow-black/10 w-[28rem] spendDiall">
                                    <SpeedDialAction onClick={() => {
                                        setMode(!mode);
                                        window.localStorage.setItem("mode", !mode);
                                        handleMode()
                                    }}>
                                        {window.localStorage.getItem("mode") === "true" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                            </svg>
                                        )}
                                        <Typography color="blue-gray" className="text-xs font-normal">
                                            Mode
                                        </Typography>
                                    </SpeedDialAction>
                                    <Link to={"/thoughts"}>
                                        <SpeedDialAction>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                            </svg>
                                            <Typography color="blue-gray" className="text-xs font-normal">
                                                Posts
                                            </Typography>
                                        </SpeedDialAction>
                                    </Link>
                                    <SpeedDialAction onClick={async () => {
                                        try {
                                            const request = await axios.delete(`http://localhost:3000/users/${window.localStorage.getItem(`userId`)}`)
                                            if (request.status === 200 || request.status === 201 || request.status === 304) {
                                                window.location.href = "/"
                                                window.localStorage.removeItem("accessToken")
                                                window.localStorage.removeItem("userId");
                                                window.localStorage.removeItem("img_id");
                                                window.localStorage.removeItem("likes")
                                            }
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        <Typography color="blue-gray" className="text-xs font-normal">
                                            Acount
                                        </Typography>
                                    </SpeedDialAction>
                                    <SpeedDialAction onClick={() => {
                                        window.localStorage.removeItem("accessToken");
                                        window.localStorage.removeItem("userId");
                                        window.localStorage.removeItem("img_id");
                                        if (!window.localStorage.getItem("accessToken")) {
                                            window.location.href = "/"
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                        </svg>
                                        <Typography color="blue-gray" className="text-xs font-normal">
                                            Log out
                                        </Typography>
                                    </SpeedDialAction>
                                </SpeedDialContent>
                            </SpeedDial>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}