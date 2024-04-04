import { useParams } from "react-router-dom"
import { Main } from "../Layout"
import { useContext, useState } from "react"
import { globallContext } from "../context/Context"
import { Button, Carousel, Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
export const TovarsInfoPage = () => {
    const { product_id, } = useParams()
    const { handleGloballPost } = useContext(globallContext)
    const [payment, setPayment] = useState({})
    const [open, setOpen] = useState(false);
    const [infoData, setInfoData] = useState([])
    const [openDialogTerm, setOpenDialogTerm] = useState(false)
    const [openDialogBanck, setOpenDialogBanck] = useState(false);
    const [number, setNumber] = useState(1)
    const handleTovarInfoGet = async () => {
        try {
            const request = await axios.get(`http://localhost:3000/tovars/?product_id=${product_id}`)
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                const response = await request.data
                setInfoData(response)
            }

        } catch (error) {
            alert(error.message)
            console.log(error);
        }
    }
    handleTovarInfoGet()
    const initialValues = {
        card_number: ""
    }
    const validationSchema = Yup.object({
        card_number: Yup.string().required("Bank karta raqamini kirgizish majburiy").min(4, "Hato bank karta raqami")
    })
    const handleBankCardPost = async () => {
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
                    }}>
                        <DialogHeader>To'lov uslubini qanday amalga oshirasiz.</DialogHeader>
                        <Typography variant="paragraph" color="red" className="ml-3 font-black">Checkbox ga bosma yozuvga bos</Typography>
                        <DialogBody className="text-center dialog-body">
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { setPayment({ payment: 1 }) }}>Naqt pull</Typography>} />
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { setPayment({ payment: 2 }) }}>Muddatli to'lov</Typography>} />
                            <Checkbox color="green" label={<Typography variant="h5" color="gray" onClick={() => { setPayment({ payment: 3 }) }}>Bank karta bilan</Typography>} />
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
                        <Typography variant="paragraph" color="red" className="ml-3 font-black">Checkbox ga bosma yozuvga bos</Typography>
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
                    <div className="tovars-info-box w-[80rem]">
                        <div className="corusel-box">
                            <Carousel
                                className="rounded-xl w-[33rem] h-[33rem] drop-shadow-2xl footer-carusel"
                                prevArrow={({ handlePrev }) => (
                                    <Button
                                        variant="gradient"
                                        color="blue"
                                        size="sm"
                                        onClick={handlePrev}
                                        className="!absolute top-2/4 left-4 -translate-y-2/4"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5">

                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>
                                    </Button>
                                )}
                                nextArrow={({ handleNext }) => (
                                    <Button
                                        variant="gradient"
                                        color="blue"
                                        size="sm"
                                        onClick={handleNext}
                                        className="!absolute top-2/4 !right-4 -translate-y-2/4"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>

                                    </Button>
                                )}
                            >
                                {infoData.map((item) => {
                                    return item.product_photos.map((photos) => {
                                        return (
                                            <img
                                                src={photos}
                                                alt=""
                                                className="w-full h-[33rem]"
                                            />
                                        )
                                    })

                                })}
                            </Carousel>
                        </div>
                        <div className="info-text-box w-[45rem]">
                            {
                                infoData.map((item) => {
                                    return (
                                        <>
                                            <Typography variant="h2" color="blue">{item.product_title}</Typography>
                                            <Typography variant="lead" color={window.localStorage.getItem("mode") === "true" ? "white" : "blue-gray"} className="mt-3">{item.product_description}</Typography>
                                            <div className="department-box flex items-center justify-between flex-wrap">
                                                <Typography variant="lead" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="mt-3 flex items-center justify-between  ">
                                                    Department:
                                                    <Typography variant="lead" color="deep-purple" className="ml-3">
                                                        {item.product_attributes.Department ? item.product_attributes.Department : "Now"}
                                                    </Typography>;
                                                </Typography>
                                                <Typography variant="lead" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="mt-3 flex items-center justify-between  ">
                                                    Size:
                                                    <Typography variant="lead" color="deep-purple" className="ml-3">
                                                        {item.product_attributes.Size ? item.product_attributes.Size : "Now"}
                                                    </Typography>;
                                                </Typography>
                                                <Typography variant="lead" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="mt-3 flex items-center justify-between  ">
                                                    Material:
                                                    <Typography variant="lead" color="deep-purple" className="ml-3">
                                                        {item.product_attributes.Material ? item.product_attributes.Material : "Now"}
                                                    </Typography>;
                                                </Typography>
                                                <Typography variant="lead" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="mt-3 flex items-center justify-between  ">
                                                    Color:
                                                    <Typography variant="lead" color="deep-purple" className="ml-3">
                                                        {item.product_attributes.Color ? item.product_attributes.Color : "Now"}
                                                    </Typography>;
                                                </Typography>
                                                <Typography variant="lead" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="mt-3 flex items-center justify-between  ">
                                                    Features:
                                                    <Typography variant="lead" color="deep-purple" className="ml-3">
                                                        {item.product_attributes.Features ? item.product_attributes.Features : "Now"}
                                                    </Typography>;
                                                </Typography>
                                                <Typography variant="lead" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="mt-3 flex items-center justify-between  ">
                                                    Style:
                                                    <Typography variant="lead" color="deep-purple" className="ml-3">
                                                        {item.product_attributes.Style ? item.product_attributes.Style : "Now"}
                                                    </Typography>;
                                                </Typography>
                                            </div>
                                            <div className="flex justify-between items-center flex-wrap">
                                                <Typography variant="lead" color="green" className="mt-3 flex items-center justify-between  ">
                                                    Rating:
                                                    <Typography variant="lead" color="deep-orange" className="ml-3">
                                                        {item.product_rating ? item.product_rating : "Now"}
                                                    </Typography>;
                                                </Typography>
                                                <Typography variant="lead" color="green" className="mt-3 flex items-center justify-between  ">
                                                    Price:
                                                    <Typography variant="lead" color="deep-orange" className="ml-3">
                                                        {item.offer.price ? item.offer.price : "Now"}
                                                    </Typography>;
                                                </Typography>
                                            </div>
                                            <div className="mt-10 ">
                                                {window.localStorage.getItem("basket-pag_false") ?
                                                    (<Button variant="gradient" color={window.localStorage.getItem("mode") === "true" ? "blue" : "blue-gray"} fullWidth className="flex justify-center items-center" onClick={() => {
                                                        window.localStorage.setItem("product_id", item.product_id)
                                                        if (window.localStorage.getItem("product_id")) {
                                                            window.localStorage.setItem("products_name", item.product_title)
                                                            window.localStorage.setItem("products_price", item.offer.price)
                                                            setOpen(!open)
                                                        }

                                                    }}>
                                                        <Typography variant="h5">
                                                            Purchase
                                                        </Typography>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ml-3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                        </svg>
                                                        <Typography variant="h5">
                                                            +
                                                        </Typography>
                                                    </Button>)
                                                    : null
                                                }
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}