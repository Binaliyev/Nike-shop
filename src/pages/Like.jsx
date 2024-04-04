import { Button, Card, CardBody, CardFooter, CardHeader, Carousel, Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography, Input } from "@material-tailwind/react"
import { Main } from "../Layout"
import { LikeButton } from "../utils"
import { useFormik } from "formik"
import * as Yup from "yup"
import { globallContext } from "../context/Context"
import { useContext, useState } from "react"
import { useLikes } from "../utils/hooks/useLikes"
import { Link } from "react-router-dom"

export const LikePage = () => {
    const { handleGloballPost } = useContext(globallContext)
    const likeData = JSON.parse(window.localStorage.getItem("likes"))
    const [payment, setPayment] = useState({})
    const [number, setNumber] = useState(1)
    const [openDialogTerm, setOpenDialogTerm] = useState(false)
    const [openDialogBanck, setOpenDialogBanck] = useState(false);
    const [open, setOpen] = useState(false);
    const { likes, handleLike } = useLikes();
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
                    }} >
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
                    <div className="like-card-box flex items-center justify-between flex-wrap mx-auto">
                        {likeData?.map((like) => {
                            if (like && like.data.userId === window.localStorage.getItem("userId")) {
                                return (
                                    <Card className={window.localStorage.getItem("mode") === "true" ? "bg-blue-gray-900 mt-10 h-[39rem] w-96 mx-auto " : "w-96 mx-auto shadow-2xl mt-10 h-[39rem]"}>
                                        {/* className={window.localStorage.getItem("mode") === "true" ? "bg-blue-gray-900 mt-10 h-[39rem] w-96 " : "w-96 mx-auto shadow-2xl mt-10 h-[39rem]"} */}
                                        <CardHeader shadow={false} floated={false} className="h-96">
                                            {/* className="h-full w-full object-cover" */}
                                            <Carousel
                                                className="rounded-xl h-full w-full object-cover"
                                                prevArrow={({ handlePrev }) => (
                                                    <IconButton
                                                        variant="gradient"
                                                        color="white"
                                                        size="lg"
                                                        onClick={handlePrev}
                                                        className="!absolute top-2/4 left-4 -translate-y-2/4"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                        </svg>
                                                    </IconButton>
                                                )}
                                                nextArrow={({ handleNext }) => (
                                                    <IconButton
                                                        variant="gradient"
                                                        color="white"
                                                        size="lg"
                                                        onClick={handleNext}
                                                        className="!absolute top-2/4 !right-4 -translate-y-2/4"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </IconButton>
                                                )}
                                            >
                                                {like.data.tovarPhoto.map((img) => {
                                                    return (
                                                        <Link to={`/${like.data.product_id}`} >
                                                            <img className="h-full w-full object-cover" src={img} alt="tovar-LikeImg" />
                                                        </Link>
                                                    )
                                                })}
                                            </Carousel>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="mb-2 flex items-center justify-between">
                                                <Typography color={window.localStorage.getItem("mode") === "true" ? "white" : "blue-gray"} className="font-medium">
                                                    {like.data.tovarPrice}
                                                </Typography>
                                                <LikeButton liked={likes.find((like) => like.id === like.data.product_id)?.liked} onLike={() => handleLike(like.data.product_id, { product_id: like.data.product_id, tovarPrice: like.data.tovarPrice, tovarTitle: like.data.tovarTitle, tovarPhoto: like.data.tovarPhoto, userId: window.localStorage.getItem("userId") })} />
                                            </div>
                                            <Typography
                                                variant="h6"
                                                color="blue"
                                            >
                                                {like.data.tovarTitle}
                                            </Typography>
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                ripple={false}
                                                fullWidth={true}
                                                onClick={() => {
                                                    window.localStorage.setItem("product_id", like.data.tovarId)
                                                    if (window.localStorage.getItem("product_id")) {
                                                        window.localStorage.setItem("products_name", like.data.tovarTitle)
                                                        window.localStorage.setItem("products_price", like.data.tovarPrice)
                                                        setOpen(!open)
                                                    }
                                                }
                                                }
                                                className="bg-blue-900 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                            >
                                                Add to Cart
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
            </Main >
        </>
    )
}