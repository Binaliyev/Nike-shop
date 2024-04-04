import { Button, Card, CardBody, CardFooter, CardHeader, Carousel, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Checkbox, Input } from "@material-tailwind/react"
import { Main } from "../Layout"
import { useContext, useState } from "react"
import { globallContext } from "../context/Context"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { LikeButton } from "../utils"
import { useLikes } from "../utils/hooks/useLikes"
export const HomePage = () => {
    const { siteApi, handleGloballPost } = useContext(globallContext)
    const [payment, setPayment] = useState({})
    const [open, setOpen] = useState(false);
    const [tovarData, setTovarData] = useState([])
    const [openDialogTerm, setOpenDialogTerm] = useState(false)
    const [openDialogBanck, setOpenDialogBanck] = useState(false);
    const [number, setNumber] = useState(1)
    const { likes, handleLike } = useLikes();
    const handleGet = async () => {
        try {
            const request = await axios.get(siteApi)
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                const response = await request.data
                setTovarData(response)
            }
        } catch (error) {
            alert(error.message)
            console.log(error);
        }

    }
    handleGet()
    const initialValues = {
        card_number: ""
    }
    const validationSchema = Yup.object({
        card_number: Yup.string().required("Bank karta raqamini kirgizish majburiy").min(4, "Hato bank karta raqami")
    })
    const handleBankCardPost = async () => {
        // event.preventDefault()
        const { card_number } = formik.values
        if (formik.isValid === true) {
            handleGloballPost(`http://localhost:3000/purchase`, {
                name: window.localStorage.getItem("products_name"),
                product_id: window.localStorage.getItem("product_id"),
                userId: window.localStorage.getItem("userId"),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                payment_method: payment.payment === 1 ? "Naqt pull" : payment.payment === 2 ? "Muddatli to'lov" : payment.payment === 3 ? "Bank karta bilan to'lov" : null,
                products_price: window.localStorage.getItem("products_price"),
                card_number: card_number ? card_number : null,
                product_term_payment: window.localStorage.getItem("product_term_payment") ? window.localStorage.getItem("product_term_payment") : null,
                product_number: number
            })
        }
    }

    const formik = useFormik({ initialValues, validationSchema, handleBankCardPost })
    return (
        <>
            <Main>
                <div className="hero-inner">
                    {/*  */}
                    <Dialog open={open} handler={() => { setOpen(!open) }} animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }} >
                        <DialogHeader>To'lov uslubini qanday amalga oshirasiz.</DialogHeader>
                        <Typography variant="paragraph" color="red" className="ml-3 font-black">Checkbox ga bosma yozuvga bos</Typography>
                        <DialogBody className="text-center dialog-body">
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { setPayment({ payment: 1 }) }} >Naqt pull</Typography>} />
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { setPayment({ payment: 2 }) }}  >Muddatli to'lov</Typography>} />
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { setPayment({ payment: 3 }) }}  >Bank karta bilan</Typography>} />
                            <h1 className=" mt-3 mb-3">Buyurtma soni</h1>
                            <div className="number-box flex items-center justify-between w-[10rem] mx-auto">
                                <Button onClick={() => { setNumber(number + 1) }} color="blue">+</Button>
                                <h1>{number}</h1>
                                <Button onClick={() => {
                                    if (number === 1) {
                                        setNumber(1)
                                    } else {
                                        setNumber(number - 1)
                                    }
                                }} color="blue">-</Button>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => {
                                    setOpen(!open);
                                    window.localStorage.removeItem("products_name")
                                    window.localStorage.removeItem("products_price")
                                }}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={() => {
                                if (payment.payment === 3) {
                                    setOpenDialogBanck(!openDialogBanck)
                                } else if (payment.payment === 1) {
                                    handleGloballPost(`http://localhost:3000/purchase`, {
                                        name: window.localStorage.getItem("products_name"),
                                        product_id: window.localStorage.getItem("product_id"),
                                        userId: window.localStorage.getItem("userId"),
                                        date: new Date().toLocaleDateString(),
                                        time: new Date().toLocaleTimeString(),
                                        payment_method: payment.payment === 1 ? "Naqt pull" : payment.payment === 2 ? "Muddatli to'lov" : payment.payment === 3 ? "Bank karta bilan to'lov" : null,
                                        products_price: window.localStorage.getItem("products_price"),
                                        card_number: null,
                                        product_number: number
                                    })
                                    setOpen(!open)
                                } else if (payment.payment === 2) {
                                    setOpenDialogTerm(!openDialogTerm)
                                }
                            }}>
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                    {/*  */}
                    <Dialog open={openDialogTerm} handler={() => {
                        setOpenDialogTerm(!openDialogTerm)
                    }}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                        }}
                    >

                        <DialogHeader>Tovar narhini qancha muddatda to'lamoqchisiz </DialogHeader>
                        <DialogBody className="text-center">
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { window.localStorage.setItem("product_term_payment", 155) }} >5 oy</Typography>} />
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { window.localStorage.setItem("product_term_payment", 310) }} >10 oy</Typography>} />
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { window.localStorage.setItem("product_term_payment", 365) }} >1 yil</Typography>} />
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => {
                                    window.localStorage.removeItem("products_name")
                                    window.localStorage.removeItem("products_price")
                                    setOpenDialogTerm(!openDialogTerm)
                                }}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" type="submit" onClick={() => {
                                setOpenDialogBanck(!openDialogBanck)
                            }}>
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                    {/*  */}
                    <Dialog open={openDialogBanck} handler={() => {
                        setOpenDialogBanck(!openDialogBanck)
                    }}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                        }}
                    >
                        <form onSubmit={() => {
                            const { card_number } = formik.values
                            if (card_number) {
                                handleBankCardPost()
                            }
                        }}>
                            <DialogHeader>Bank karta raqamini kiriting.</DialogHeader>
                            <DialogBody className="text-center">

                                <Input variant="outlined" label="Bank card number" name="card_number" {...formik.getFieldProps("card_number")} />
                                {formik.touched.card_number && formik.errors.card_number && (
                                    <Typography variant="small" color="red">{formik.errors.card_number}</Typography>
                                )}

                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={() => {
                                        window.localStorage.removeItem("products_name")
                                        window.localStorage.removeItem("products_price")
                                        setOpenDialogBanck(!openDialogBanck)
                                    }}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="gradient" color="green" type="submit" onClick={() => {
                                    setOpenDialogBanck(!openDialogBanck)
                                }}>
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </Dialog>
                    {/*  */}
                    <Carousel transition={{ duration: 0 }} className="rounded-xl shadow-2xl bg-blue-500 h-[40rem] tovars-corusel ">
                        {tovarData.map((item) => {
                            return (
                                <img key={item.product_id} src={item.product_photos} alt="tovars-imgs" className="w-[45rem] h-[35rem] my-11 rounded-xl mx-auto" />
                            )
                        })}
                    </Carousel>
                    <div className="tovars-box">
                        {
                            tovarData.map((item) => {
                                
                                return (
                                    <>
                                        <Card
                                            className={window.localStorage.getItem("mode") === "true" ? "bg-blue-gray-900 w-[20rem] mt-10 mx-auto" : "shadow-2xl w-[20rem] mt-10 mx-auto"}
                                            // window.localStorage.getItem("mode") === "true" ? "bg-black": "shadow-lg"
                                            key={item.product_id} >
                                            <Link to={`/${item.product_id}`} onClick={() => window.localStorage.setItem("basket-pag_false", false)}>
                                                <CardHeader floated={window.localStorage.getItem("mode") === "true" ? false : true}
                                                    shadow={window.localStorage.getItem("mode") === "true" ? false : true} color="blue-gray" className="w-[18rem] mx-auto shadow-2xl" >
                                                    <img src={item.product_photos} alt="producs-photo" className="w-full h-[17rem]" />
                                                </CardHeader>
                                            </Link>
                                            <CardBody>
                                                <div className="w-[18rem] h-[5rem]">
                                                    {/*  window.localStorage.getItem("mode") === "true" ? "white": "blue-gray" */}
                                                    <Typography variant="h6" color="blue">
                                                        {item.product_title}
                                                    </Typography>
                                                </div>
                                                <Typography variant="paragraph" color={window.localStorage.getItem("mode") === "true" ? "white" : "blue-gray"} className="flex items-center justify-between">
                                                    {item.offer.price}
                                                    <LikeButton liked={likes.find((like) => like.id === item.product_id)?.liked} onLike={() => handleLike(item.product_id, {product_id: item.product_id, tovarPrice: item.offer.price, tovarTitle: item.product_title , tovarPhoto: item.product_photos, userId: window.localStorage.getItem("userId")})} />
                                                </Typography>
                                            </CardBody>
                                            <CardFooter>
                                                <Button variant="gradient" color="blue" fullWidth onClick={() => {
                                                    window.localStorage.setItem("product_id", item.product_id)
                                                    if (window.localStorage.getItem("product_id")) {
                                                        window.localStorage.setItem("products_name", item.product_title)
                                                        window.localStorage.setItem("products_price", item.offer.price)
                                                        setOpen(!open)
                                                    }
                                                }}>
                                                    <Typography variant="small" className="flex items-center justify-center">
                                                        Purchase
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                        </svg>+
                                                    </Typography>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </Main>
        </>
    )
}