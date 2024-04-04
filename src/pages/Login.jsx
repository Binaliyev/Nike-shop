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
import { useContext } from "react";
import { globallContext } from "../context/Context"
import { RotateLoader } from "react-spinners";
export const LoginPage = () => {
    const { handleLogin, spinner, setSpinner } = useContext(globallContext)

    const initialValues = {
        email: "",
        password: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().required("Email kiritish majburiy").email("Hato email manzili"),
        password: Yup.string().required("Password kiritish majburiy").min(5, "Password 5 tadan kam bo'lmasligi kerak ").max(15, "Password 15 tadan oshmasligi kerak")
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = formik.values
        if (formik.isValid === true) {
            handleLogin(email, password)
            setSpinner(true)
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
                            Login
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <form onSubmit={handleSubmit}>
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
                                Login
                            </Button>
                        </form>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Typography variant="small" className="mt-6">
                            <Link className="flex items-center justify-between w-[88%] mx-auto" to={"/register"}>
                                <Typography variant="h6" color="orange">
                                    Sizda acount mavjudmasmi ?
                                </Typography>
                                <Typography variant="h6" color="blue">
                                    Register
                                </Typography>
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
            }
        </>
    )
}