import { Link, NavLink, Outlet } from "react-router-dom"
import siteLogolihgt from "../assets/imgs/Nike,_Inc.-Nike-White-Logo.wine.svg"
import siteLogoDark from "../assets/imgs/Nike,_Inc.-Nike-Logo.wine.svg"
import { Button, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react"
import { useContext } from "react"
import { globallContext } from "../context/Context"
import { Footer } from "./Footer"
export const SiteHeader = () => {
    // product_description, product_attributes, product_rating, typical_price_range
    const { setSiteApi } = useContext(globallContext)
    const handleSearch = (event) => {
        setSiteApi(`http://localhost:3000/tovars/?product_title=${event.target.value}`)
    }
    console.log(window.localStorage.getItem("mode"));
    return (
        <>
            <header className={window.localStorage.getItem("mode") === "true" ? "bg-blue-gray-900 " : "shadow-lg bg-white"}>
                <div className="container mx-auto">
                    <div className="header-inner">
                        <div className="header-box">
                            <Link>
                                {window.localStorage.getItem("mode") === "true" ?
                                    (<img src={siteLogolihgt} alt="site-logo" className="w-[10rem] h-[4.5rem]" />)
                                    :
                                    (<img src={siteLogoDark} alt="site-logo" className="w-[10rem] h-[4.5rem]" />)

                                }
                            </Link>
                            <div className="input-box w-[25rem]">
                                <Input color="blue" label="Search" type="search" onChange={handleSearch} />
                            </div>
                            <ul className="header-ul">
                                <li>
                                    <NavLink className={(event) => event.isActive ? "header-link text-green-500" : "header-link"} to={"/home"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={window.localStorage.getItem("mode") === "true" ? "h-9 w-9 text-white" : "h-9 w-9 text-black"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={(event) => event.isActive ? "header-link text-green-500" : "header-link"} to={"/basket"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={window.localStorage.getItem("mode") === "true" ? "h-9 w-9 text-white" : "h-9 w-9 text-black"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={(event) => event.isActive ? "header-link text-green-500" : "header-link"} to={"/like"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={window.localStorage.getItem("mode") === "true" ? "h-9 w-9 text-white" : "h-9 w-9 text-black"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </svg>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={(event) => event.isActive ? "header-link text-green-500" : "header-link"} to={"/user"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={window.localStorage.getItem("mode") === "true" ? "h-9 w-9 text-white" : "h-9 w-9 text-black"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </NavLink>
                                </li>
                                <li className="menu-list hidden">
                                    <Menu
                                        animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                        }}

                                    >
                                        <MenuHandler>
                                            <Button variant="text" color="blue">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </Button>
                                        </MenuHandler>
                                        <MenuList className="mt-10 bg-blue-900">
                                            <MenuItem>
                                                <Link className="flex justify-around items-center" to={"/home"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"h-9 w-9 text-white"}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                    </svg>
                                                    <Typography variant="h5" color="white">Home</Typography>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link className="flex justify-around items-center" to={"/basket"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"h-9 w-9 text-white"}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>
                                                    <Typography variant="h5" color="white">Basket</Typography>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link className="flex justify-around items-center" to={"/like"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"h-9 w-9 text-white"}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                                    </svg>
                                                    <Typography variant="h5" color="white">Like</Typography>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link className="flex justify-around items-center" to={"/user"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"h-9 w-9 text-white"}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                    <Typography variant="h5" color="white">Acount</Typography>
                                                </Link>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
            <Footer />
        </>
    )
}