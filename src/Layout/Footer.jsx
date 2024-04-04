import { Link } from "react-router-dom"
import siteLogolihgt from "../assets/imgs/Nike,_Inc.-Nike-White-Logo.wine.svg"
import siteLogoDark from "../assets/imgs/Nike,_Inc.-Nike-Logo.wine.svg"
import telegram from "../assets/icons/Telegram_(software)-Logo.wine.svg"
import twitter from "../assets/icons/Twitter-Logo.wine.svg"
import youtube from "../assets/icons/YouTube-Icon-Almost-Black-Logo.wine.svg"
import { Typography } from "@material-tailwind/react"
export const Footer = () => {
    return (
        <>
            <footer className="w-[100%] h-[20rem] bg-blue-900 mt-[7rem] bottom-0 relative">
                <div className="container">
                    <div className="footer-inner">
                        <Link>
                            <img src={siteLogolihgt} alt="site-logo" className="w-[25rem] h-[15rem] mx-auto logo " />
                        </Link>
                        <div className="text-icons-box flex items-center justify-between w-1/2 mx-auto">
                         <Link to={"https://t.me/s/nikeuzb?before=2131"} className="no-underline"><Typography variant="h4" color="white" className="flex items-center justify-between font-Stylish" >Telegram  <img src={telegram} alt="telegram-icon" /> </Typography></Link>  
                         <Link to={"https://twitter.com/Nike"} className="no-underline"><Typography variant="h4" color="white" className="flex items-center justify-between font-Stylish" >Twitter X <img src={twitter} alt="twitterX-icon" /></Typography></Link>
                          <Link to={"https://www.youtube.com/@nike"} className="no-underline"><Typography variant="h4" color="white" className="flex items-center justify-between font-Stylish" >You Tube <img src={youtube} alt="youtube-icon" /> </Typography></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}