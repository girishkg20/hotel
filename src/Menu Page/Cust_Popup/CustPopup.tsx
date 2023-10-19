import "./CustPopup.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import veg from "./Source/veg.png";
import egg from "./Source/egg.png";
import non_veg from "./Source/non-veg.png";
import close from "./Source/close.png";
import tick from "./Source/tick.png";

import Menupagedata from "../Menu_Page_API/MenuPageData";



const Custpopup = () => {
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
    console.log(fooditemdata);

    return(<>{ fooditemdata ? <>
        <div className='custpopoverlay' onClick={() => navigate(-1)}></div>

        <div className="custpopover">

            <img className="custclosebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            <div className="custheader">
                {fooditemdata.food_image && (
                    <img className="shortimage" src={fooditemdata.food_image} alt="Food Image"/>
                )}
                <div>
                    <img className="custvegstatus" src={
                        fooditemdata.veg_status == "veg" ? veg :
                        fooditemdata.veg_status == "egg" ? egg : non_veg
                    } alt="Veg Status" />
                    <p className="custitemname">{fooditemdata.name}</p>
                </div>
            </div>

            {fooditemdata.addon_group.length > 0 && (<>
                {fooditemdata.addon_group.map((eachaddon:any)=>(<div className="addonscard">
                    <div className="addonstitleholder">
                        <h3 className="addontitle">{eachaddon.title}
                            <span>{` (0/${eachaddon.item_maximum_count})`}</span>
                        </h3>
                        <p className="custdescription">
                            {(eachaddon.item_required_count > 0)
                            ? `Select atleast ${eachaddon.item_required_count} options`
                            : "Customize as you wish (Optional)"}
                        </p>
                    </div>
                    {eachaddon.addons.map((eachaddons:any)=>(<>
                        <label className="addonitem">
                            <div className="addonnameprice">
                                <p className="addonname">{eachaddons.title}</p>
                                <p className="addonprice">{`+₹ ${eachaddons.price}`}</p>
                            </div>
                            
                            <input className="addoncheck" type="checkbox"/>
                            <div className="checkmark">
                                <img className="tickmark" width="10px" height="10px" src={tick} alt="✔"/>
                            </div>
                            <div className="checkboxbg"></div>
                        </label>
                    </>))}
                </div>))}
            </>)}






            {fooditemdata.variant_group.length > 0 && (<>
                {fooditemdata.variant_group.map((eachaddon:any)=>(<div className="addonscard">
                    <div className="addonstitleholder">
                        <h3 className="addontitle">{eachaddon.title}
                            <span>{` (0/${eachaddon.item_maximum_count})`}</span>
                        </h3>
                        <p className="custdescription">
                            {(eachaddon.item_required_count > 0)
                            ? `Select atleast ${eachaddon.item_required_count} options`
                            : "Customize as you wish (Optional)"}
                        </p>
                    </div>
                    {eachaddon.variants.map((eachvariants:any)=>(<>
                        <label className="addonitem">
                            <div className="addonnameprice">
                                <p className="addonname">{eachvariants.title}</p>
                                <p className="addonprice">{`+₹ ${eachvariants.price}`}</p>
                            </div>
                            
                            <input className="addoncheck" type="checkbox"/>
                            <div className="checkmark">
                                <img className="tickmark" width="10px" height="10px" src={tick} alt="✔"/>
                            </div>
                            <div className="checkboxbg"></div>
                        </label>
                    </>))}
                </div>))}
            </>)}





            {fooditemdata.customisation_steps.length > 0 && (<>
                {fooditemdata.customisation_steps.map((eachaddon:any)=>(<div className="addonscard">
                    <div className="addonstitleholder">
                        <h3 className="addontitle">{eachaddon.step_name}
                            {/* <span>{` (0/${eachaddon.item_maximum_count})`}</span> */}
                        </h3>
                        {/* <p className="custdescription">
                            {(eachaddon.item_required_count > 0)
                            ? `Select atleast ${eachaddon.item_required_count} options`
                            : "Customize as you wish (Optional)"}
                        </p> */}
                    </div>
                    {eachaddon.add_ons.map((eachaddons:any)=>(<>
                        <label className="addonitem">
                            <div className="addonnameprice">
                                <p className="addonname">{eachaddons.item_name}</p>
                                <p className="addonprice">{`HAS ${eachaddons.item_options.length}`}</p>
                            </div>
                            
                            <input className="addoncheck" type="checkbox"/>
                            <div className="checkmark">
                                <img className="tickmark" width="10px" height="10px" src={tick} alt="✔"/>
                            </div>
                            <div className="checkboxbg"></div>
                        </label>
                    </>))}
                </div>))}
            </>)}








        </div>
    </>:null}</>)
}
export default Custpopup;