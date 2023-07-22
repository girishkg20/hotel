import "./ItemPopup.css";
import { useContext, useState } from "react";
import veg from "./Source/veg.png";
import egg from "./Source/egg.png";
import non_veg from "./Source/non-veg.png";
import close from "./Source/close.png";
import Menupagedata from "../Menu_Page_API/MenuPageData";
import { useNavigate } from "react-router-dom";




const Itempopup = () => {

    const {image, item_name, veg_status, price, dprice, defprice, dcprice, description, avail, availmsg, customisable, addon} = useContext(Menupagedata);
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
                    
                    {
                        price == 0 ?
                            <div className='pricebox'>
                                <p className="itemprice">₹ {Math.round(defprice)}</p>
                                <p className="displayprice">₹ {Math.round(defprice - dcprice)}</p>
                            </div>:
                        typeof dprice === 'number' ?
                            <div className='pricebox'>
                                <p className="itemprice">₹ {Math.round(price)}</p>
                                <p className="displayprice">₹ {Math.round(dprice)}</p>
                            </div>:
                            <div className='pricebox'>
                                <p className="displayprice">₹ {Math.round(price)}</p>
                            </div>
                    }

                </div>
                <div className="foodimageside">
                {avail == false
                    ? <p className='notavailable'>{availmsg}</p>
                    : <button className="addbutton">ADD</button>
                }
                {customisable || addon > 0 &&
                    <p className='custotext'>Customisable</p>
                }
                </div>
            </div>
            <p className="itemdescription">{description}</p>
        </div>
    </>)
}
export default Itempopup;