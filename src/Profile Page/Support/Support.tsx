import "./Support.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backbutton from "./Source/back.png";
import supportvector from "./Source/support_vector.png";
import call from "./Source/call.png";
import mail from "./Source/mail.png";







const Support = () => {

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
                <h3 className='headertext' id='pspheadertext'>Support</h3>
            </div>
        </div>

        <div className="supportholder">
            <img src={supportvector} alt="support" width={'100%'}/>

            <div className="supportbtnholder">

                <a href="tel:+91 8929221233" className="supportbtn">
                    <img src={call} alt="call" width={"20px"}/>
                    <p className="supportbtntext">+91 8929221233</p>
                </a>

                <a href="mailto:hello@tipplr.in" className="supportbtn">
                    <img src={mail} alt="mail" width={"20px"}/>
                    <p className="supportbtntext">hello@tipplr.in</p>
                </a>

            </div>
        </div>
    
    </div>)
}
export default Support;