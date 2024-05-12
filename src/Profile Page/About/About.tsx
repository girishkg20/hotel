import "./About.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backbutton from "./Source/back.png";
import logo from "./Source/logo.png";







const About = () => {

    const navigate = useNavigate();
    document.body.style.overflow = "hidden";

    const [header, setHeader] = useState <HTMLDivElement | null>();
    const [headertext, setHeadertext] = useState <HTMLHeadingElement | null>();
    const [newpage, setNewpage] = useState <HTMLDivElement>();

    useEffect(() => {

        setHeader(document.getElementById("pspheader") as HTMLDivElement | null);
        setHeadertext(document.getElementById("pspheadertext") as HTMLHeadingElement | null);
        setNewpage(document.getElementById("newpage") as HTMLDivElement);

        if (header && headertext && newpage) {
            newpage.addEventListener('scroll', fixheader)
            
            return () => {
                newpage.removeEventListener('scroll', fixheader);
            }
        };

    },[header]);

    const fixheader = () => {
        
        if (newpage!.scrollTop > 55) {
            header!.classList.add('fixed')
            headertext!.style.display = "flex";
        }else{
            header!.classList.remove('fixed')
            headertext!.style.display = "none";
        }
        
    }




    return(<div className="newpage" id="newpage">

        <div className='ppheader' id='pspheader'>
            <div className='backtitle'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='headertext' id='pspheadertext'>About</h3>
            </div>
        </div>

        <div className="pspcontentsholder">

            <div className="apbrandlogoholder">
                <img src={logo} alt="tipplr" width={128}/>
            </div>

            <h1 style={{fontSize: "20px"}}><strong><center>FOOD SPACE TECHNOLOGY PVT. LTD.</center></strong></h1>
            <h1 style={{fontSize: "18px"}}><strong><center>ABOUT US</center></strong></h1>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>Founded in 2020, Tipplr is a food and beverage discounting platform that aims to connect high spending corporates, gated communities, residence associations and students with the finest dining outlets. Providing free membership to all, Tipplr tends to both customers and the partners with the best deals. Customers can utilize our platform to find and locate restaurants with transparent pricing and uncapped discounts for dine-in, delivery and takeaway, read and share reviews and photos, book tables and pay. At the same time, restaurants acquire a customer base and receive insights about analytics and marketing at no extra cost. Tipplr aims to connect Corporate Diners & University Students to Restaurants, Cafes and Bars in each city with unlimited, no cap discounts and specially crafted offers. We aim at giving clients a seamless, cashless, booking and payment experience across its hospitality network pan India. Tipplr exhibits the advantages of having an interesting and business friendly alternative when it comes to making food more affordable without sacrificing the profitability of a restaurant.</p>
            <p>&nbsp;</p>
            <p><strong>OUR MISSION</strong></p>
            <p>&nbsp;</p>
            <p>To shape the future of ethical discounting in the food & beverage sector.</p>
            <p>&nbsp;</p>
            <p><strong>OUR VISION</strong></p>
            <p>&nbsp;</p>
            <p>We at Tipplr believe that we can redefine the existing social structure and connect ambitious people, innovative ideas and delicious meals.</p>

        </div>
    
    </div>)
}
export default About;