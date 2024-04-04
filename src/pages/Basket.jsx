import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import { Main } from "../Layout/Main"
import { useContext, useState } from "react"
import { globallContext } from "../context/Context"
import { Link } from "react-router-dom"
import axios from "axios"

export const BasketPage = () => {
    const { handleDelete } = useContext(globallContext)
    const [basketData, setBasketData] = useState([])
    const handlePurchaseGet = async () => {
        try {
            const request = await axios.get(`http://localhost:3000/purchase`)
            if (request.status === 200 || request.status === 201 || request.status === 304) {
                const response = await request.data
                setBasketData(response)
            }
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }
    handlePurchaseGet()
    return (
        <Main>
            <div className="hero-inner mt-[10rem]">
                <div className="basket-box flex items-center justify-between overflow-scroll flex-wrap">
                    {
                        basketData.map((item) => {
                            // let mounthPrice = Math.round(Number(item.product_term_payment / 30))
                            // let productsPrice = item.products_price
                            if (item.userId === window.localStorage.getItem("userId")) {
                                return (
                                    <>
                                        <Card className={window.localStorage.getItem("mode") === "true" ? "bg-blue-gray-900 w-96 h-[28rem] mx-auto my-3 flex items-center justify-between" : "shadow-2xl w-96 h-[28rem] my-3 flex mx-auto items-center justify-between"}>
                                            <Link to={`/${item.product_id}`} key={item.product_id} onClick={() => window.localStorage.removeItem("basket-pag_false")}>
                                                <CardBody>
                                                    <Typography variant="h4" color="blue">
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="flex items-center justify-between mt-3">
                                                        Payment method:
                                                        <Typography variant="h6" color="cyan" className="mr-8">
                                                            {item.payment_method}
                                                        </Typography>
                                                    </Typography>
                                                    <Typography variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="flex items-center justify-between">
                                                        Paymen  price:
                                                        <Typography variant="h6" color="cyan" className="mr-8">
                                                            {item.products_price}
                                                        </Typography>
                                                    </Typography>
                                                    {item.card_number ? (<Typography variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="flex items-center justify-between">
                                                        Bank-card number:
                                                        <Typography variant="h6" color="cyan" className="mr-8">
                                                            {item.card_number}
                                                        </Typography>
                                                    </Typography>) : null}
                                                    {item.product_term_payment ? (<Typography variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="flex items-center justify-between">
                                                        Product term payment:
                                                        <Typography variant="h6" color="cyan" className="mr-8">
                                                            {
                                                                item.product_term_payment == 155 ? ("5 oy") :
                                                                    item.product_term_payment == 310 ? ("10oy") :
                                                                        item.product_term_payment == 365 ? ("1 yil") : null
                                                            }
                                                        </Typography>
                                                    </Typography>) : null}
                                                    {item.product_term_payment ? (<Typography variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="flex items-center justify-between">
                                                        Price per month:
                                                        <Typography variant="h6" color="cyan" className="mr-8">
                                                            ${Math.round(Math.round(Number(item.products_price.replace(/\$|,/g, ""))) / Math.round(Number(item.product_term_payment / 30)) + 1)}
                                                            {/* /,/g,"" */}
                                                        </Typography>
                                                    </Typography>) : null}
                                                    <Typography variant="h6" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"} className="flex items-center justify-between">
                                                        Product number:
                                                        <Typography variant="h6" color="cyan" className="mr-8">
                                                            {item.product_number}
                                                        </Typography>
                                                    </Typography>
                                                </CardBody>
                                            </Link>
                                            <CardFooter className="w-full">
                                                <Button variant="gradient" color="red" fullWidth className="mb-10" onClick={() => {
                                                    window.localStorage.setItem("product_id", item.product_id)
                                                    window.localStorage.setItem("id", item.id)
                                                    if (window.localStorage.getItem("userId")) {
                                                        handleDelete(`http://localhost:3000/purchase/${window.localStorage.getItem("id")}`)
                                                    }
                                                }}>
                                                    Delete
                                                </Button>
                                                <div className="date-time-box flex items-center justify-between mt-2">
                                                    <Typography variant="small" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"}>{item.date}</Typography>
                                                    <Typography variant="small" color={window.localStorage.getItem("mode") === "true" ? "white" : "black"}>{item.time}</Typography>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </Main >
    )
}