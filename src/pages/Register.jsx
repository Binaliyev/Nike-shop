import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { globallContext } from "../context/Context";
import { RotateLoader } from "react-spinners";
export const RegisterPage = () => {
    const { spinner, setSpinner } = useContext(globallContext)
    const initialValues = {
        username: "",
        email: "",
        password: ""
    }
    const validationSchema = Yup.object({
        username: Yup.string().required("Ism kiritish majburiy").min(3, "Ism eng kamida 3 ta harfdan kichik bo'lmasligi kerak").max(10, "Ism 10 ta harfdan oshmasligi kerak"),
        email: Yup.string().required("Email kiritish majburiy").email("Hato email manzili"),
        password: Yup.string().required("Password kiritish majburiy").min(5, "Password 5 tadan kam bo'lmasligi kerak ").max(15, "Password 15 tadan oshmasligi kerak")
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        const { username, email, password } = formik.values
        if (formik.isValid === true) {
            setSpinner(true)
            const request = await axios.post(` http://localhost:3000/users`, {
                username: username,
                email: email,
                password: password
            })
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                const response = await request.data
                window.localStorage.setItem("userId", response.user.id)
                window.localStorage.setItem("accessToken", response.accessToken)
                document.cookie = `${password}`
                window.location.href = "/"
            }
        }
    }
    const formik = useFormik({ initialValues, validationSchema, handleSubmit })
    return (
        <>
            {spinner ?
                <div className="spinner-box text-center">
                    <RotateLoader color="#059df3" margin={90} size={25} className="my-[25rem]" />
                </div>
                :
                <Card className="w-96 my-40 mx-auto">
                    <CardHeader
                        variant="gradient"
                        color="orange"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Register
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mt-5">
                                <Input label="Username" name="username" size="lg" color="blue" {...formik.getFieldProps("username")} />
                                {formik.touched.username && formik.errors.username && (
                                    <Typography variant="small" color="red" className="text-center mt-2">
                                        {formik.errors.username}
                                    </Typography>
                                )}
                            </div>
                            <div className="mt-5">
                                <Input label="Email" name="email" size="lg" color="blue" {...formik.getFieldProps("email")} />
                                {formik.touched.email && formik.errors.email && (
                                    <Typography variant="small" color="red" className="text-center mt-2">
                                        {formik.errors.email}
                                    </Typography>
                                )}
                            </div>
                            <div className="mt-5">
                                <Input label="Password" size="lg" color="blue" {...formik.getFieldProps("password")} />
                                {formik.touched.password && formik.errors.password && (
                                    <Typography variant="small" color="red" className="text-center mt-2">
                                        {formik.errors.password}
                                    </Typography>
                                )}
                            </div>
                            <Button type="submit" variant="gradient" fullWidth color="blue" className="mt-10">
                                Register
                            </Button>
                        </form>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Typography variant="small" className="mt-6">
                            <Link className="flex items-center justify-between w-[73%] mx-auto" to={"/login"}>
                                <Typography variant="h6" color="orange">
                                    Sizda acount mavjudmi ?
                                </Typography>
                                <Typography variant="h6" color="blue">
                                    Login
                                </Typography>
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card >}

        </>
    )
}