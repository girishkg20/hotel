import "./ItemPopup.css";
import { useContext, useState } from "react";
import veg from "./Source/veg.png";
import egg from "./Source/egg.png";
import non_veg from "./Source/non-veg.png";
import close from "./Source/close.png";
import Menupagedata from "../Menu_Page_API/MenuPageData";
import { useNavigate } from "react-router-dom";




const Itempopup = () => {

    const {image, item_name, veg_status, price, dprice, description} = useContext(Menupagedata);
    const navigate = useNavigate()

    // console.log(image, item_name, veg_status, price, description);

    document.body.style.overflow = "hidden"

    const handlePopstate = () => {
        document.body.style.overflow = "scroll";
        window.removeEventListener("popstate", handlePopstate);
      };
    window.addEventListener("popstate", handlePopstate);
    
    return(<>                             
        <div className='popoverlay' onClick={() => navigate(-1)}></div>

        <div className="popover">
            <img className="closebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            {image && (
                <img className="fullimage" src={image} alt="Food Image"/>
            )}
            <div className='popfoodcard'>
                <div className="fooditemside">
                    <img className="vegstatus" src={
                        veg_status == "veg" ? veg :
                        veg_status == "egg" ? egg : non_veg
                    } alt="Veg Status" />
                    <p className="itemname">{item_name}</p>
                    <div className='pricebox'>
                        <p className="itemprice">₹ {Math.round(price)}</p>
                        <p className="displayprice">₹ {Math.round(dprice)}</p>
                    </div>
                </div>
                <div className="foodimageside">
                    <button className="addbutton">ADD</button>
                </div>
            </div>
            <p className="itemdescription">{description}</p>
        </div>
    </>)
}
export default Itempopup;