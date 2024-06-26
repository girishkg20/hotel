import "./Faqs.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backbutton from "./Source/back.png";
import right from "./Source/right.png";
import faqs from "./Source/faqs.json";







const Faqs = () => {

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
                <h3 className='headertext' id='pspheadertext'>FAQ's</h3>
            </div>
        </div>

        <div className="pspcontentsholder"> 
            {
                faqs.map((eachfaq) => (
                    <label className="qaholder" key={eachfaq.id}>
                        <input className="questionopen" type="radio" name="faq"/>
                        <div className="qholder">
                            <h1 className="question">{eachfaq.question}</h1>
                            <img className="questionrightbtn" src={right} alt=">"/>
                        </div>
                        <p className="answer">{eachfaq.answer}</p>
                    </label>
                ))
            }
        </div>
    
    </div>)
}
export default Faqs;