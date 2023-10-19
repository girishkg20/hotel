import "./ItemPopup.css";
import { useContext, useState } from "react";
import veg from "./Source/veg.png";
import egg from "./Source/egg.png";
import non_veg from "./Source/non-veg.png";
import close from "./Source/close.png";
import Menupagedata from "../Menu_Page_API/MenuPageData";
import { useNavigate } from "react-router-dom";



const Itempopup = () => {

    const {fooditemdata} = useContext(Menupagedata);
    const navigate = useNavigate();

    if(fooditemdata){
        document.body.style.overflow = "hidden"

        const handlePopstate = () => {
            document.body.style.overflow = "scroll";
            window.removeEventListener("popstate", handlePopstate);
        };
        window.addEventListener("popstate", handlePopstate);
    }
    
    return(<>{ fooditemdata ? <>
        <div className='popoverlay' onClick={() => navigate(-1)}></div>

        <div className="popover">
            <img className="closebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            {fooditemdata.food_image && (
                <img className="fullimage" src={fooditemdata.food_image} alt="Food Image"/>
            )}
            <div className='popfoodcard'>
                <div className="fooditemside">
                    <img className="vegstatus" src={
                        fooditemdata.veg_status == "veg" ? veg :
                        fooditemdata.veg_status == "egg" ? egg : non_veg
                    } alt="Veg Status" />
                    <p className="itemname">{fooditemdata.name}</p>
                    
                    {
                        fooditemdata.price == 0 ?
                            <div className='pricebox'>
                                <p className="itemprice">₹ {Math.round(fooditemdata.default_price)}</p>
                                <p className="displayprice">₹ {Math.round(fooditemdata.default_price - fooditemdata.discounted_price_rupees)}</p>
                            </div>:
                        typeof fooditemdata.default_price === 'number' ?
                            <div className='pricebox'>
                                <p className="itemprice">₹ {Math.round(fooditemdata.price)}</p>
                                <p className="displayprice">₹ {Math.round(fooditemdata.offer_price)}</p>
                            </div>:
                            <div className='pricebox'>
                                <p className="displayprice">₹ {Math.round(fooditemdata.price)}</p>
                            </div>
                    }

                </div>
                <div className="foodimageside">
                {fooditemdata.availablity.availability == false
                    ? <p className='notavailable'>{fooditemdata.availablity.availability_message}</p>
                    : <>
                        {(fooditemdata.customisation_steps.length || fooditemdata.addon_group.length || fooditemdata.variant_group.length) > 0
                        ? <><button className="addbutton">ADD</button>
                            <p className='custotext'>Customisable</p></>
                        : <button className="addbutton">ADD</button>}
                    </>
                }
                </div>
            </div>
            <p className="itemdescription">{fooditemdata.description}</p>
        </div>
    </>:null}</>)
}
export default Itempopup;