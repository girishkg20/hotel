import './CustRepeatPopup.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import _ from 'lodash';

import veg from "./Source/veg.png";
import egg from "./Source/egg.png";
import non_veg from "./Source/non-veg.png";
import close from "./Source/close.png";

import Menupagedata from '../Menu_Page_API/MenuPageData';
import { addItem } from '../CartSlice';


const Custrepeatpopup = () => {

    const [filtereditems, setfiltereditems] = useState<any[]>([]);

    const navigate = useNavigate();
    const Dispatch = useDispatch();

    const {fooditemdata} = useContext(Menupagedata);
    const Fooditem = fooditemdata && {...fooditemdata.cart_data.food_items[0]};
    
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);
    const cartitems = useSelector((state:any) => state.perReducers.cartId.value.food_items);

    if(fooditemdata && actualpayload){
        document.body.style.overflow = "hidden";

        const handlePopstate = () => {
            document.body.style.overflow = "scroll";
            window.removeEventListener("popstate", handlePopstate);
        };
        window.addEventListener("popstate", handlePopstate);
    }

    useEffect( () => {
        if(cartitems && Fooditem) {
            const filtered = cartitems.filter((eachfooditem:any) => eachfooditem._id === Fooditem._id);
            setfiltereditems(filtered);
        };
        if(!cartitems) {
            document.body.style.overflow = "scroll"; 
        }
    },[cartitems])

    const newcustomization = () => {
        const URL = window.location.pathname.replace('customize', 'customization');
        navigate(URL);
    };

    const pushtocart = (Fooditem:any) => {

        const existingitem = actualpayload.cart_data.food_items.findIndex((eachitems:any) =>
            eachitems._id === Fooditem._id
            && _.isEqual(eachitems.addon_group, Fooditem.addon_group)
            && _.isEqual(eachitems.customisation_steps, Fooditem.customisation_steps)
            && _.isEqual(eachitems.variant_group, Fooditem.variant_group)
        )
        
        const duplicatepayload = {...actualpayload, 
            cart_data: {...actualpayload.cart_data,
                food_items: [...actualpayload.cart_data.food_items.slice(0, existingitem),
                    {...actualpayload.cart_data.food_items[existingitem],
                        quantity: actualpayload.cart_data.food_items[existingitem].quantity + Fooditem.quantity
                    },
                    ...actualpayload.cart_data.food_items.slice(existingitem + 1),
                ],
            },
        };

        const removeditem = duplicatepayload.cart_data.food_items.findIndex((eachitems:any) => eachitems.quantity < 1)
        removeditem >= 0 && duplicatepayload.cart_data.food_items.splice(removeditem, 1);
        
        Dispatch(addItem(duplicatepayload));

    };

    const navigateback = () => {
        navigate(-1)
    };


    return(<>{actualpayload.hasOwnProperty("cart_data") && Fooditem && Fooditem.original_food_item && <>
        <div className='custpopoverlay' onClick={() => navigate(-1)}></div>

        <div className="custpopover">

            <img className="custclosebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            <div className="custheader">
                {Fooditem.food_image && (
                    <img className="shortimage" src={Fooditem.food_image} alt="Food Image"/>
                )}
                <div>
                    <img className="custvegstatus" src={
                        Fooditem.original_food_item.veg_status == "veg" ? veg :
                        Fooditem.original_food_item.veg_status == "egg" ? egg : non_veg
                    } alt="Veg Status" />
                    <p className="custitemname">{Fooditem.name}</p>
                </div>
            </div>


            <div className="critemscard">
                <p className='crheading'>All Your Customizations</p>

                {
                    filtereditems.length > 0 ? filtereditems.map((eachfooditem:any, index:number) => (
                        <div className="crfoodcard" key={`foodcard_${index}`}>
                                
                            <p className="critemname">{
                                eachfooditem.variant_group[0]
                                ? eachfooditem.variant_group.map((eachvarient:any)=>(eachvarient.title)).join(" + ")
                                : eachfooditem.customisation_steps[0]
                                ? eachfooditem.customisation_steps.map((eachoption:any)=>(eachoption.option_name)).join(" + ")
                                : <span style={{textTransform:"none"}}>It's plain and simple, No extras added</span>
                            }</p>

                            <div className='craddbtnholder'>
                                <div className='pricebox'>
                                    {eachfooditem.delivery_discount > 0
                                        ? <>
                                            <p className="critemprice">₹ {Math.round(eachfooditem.total)}</p>
                                            <p className="crdisplayprice">₹ {Math.round(eachfooditem.total - eachfooditem.delivery_discount)}</p>
                                        </>
                                        : <p className="crdisplayprice">₹ {Math.round(eachfooditem.total)}</p>
                                    }
                                </div>
                                <button className="craddedbutton">
                                    <p className='craddsub' onClick={() => pushtocart({...eachfooditem, quantity:-1})}>-</p>
                                    <p>{eachfooditem.quantity}</p>
                                    <p className='craddsub' onClick={() => pushtocart({...eachfooditem, quantity:1})}>+</p>
                                </button>
                            </div>

                        </div>
                    )) : (() => {navigate(-1); return null;})()  
                }
                
            </div>

            <div className="crcustfooter">
                <button className="cradditembtn" onClick={newcustomization}>
                    <p>+ Add new customization</p>
                </button>
            </div>

        </div>

    </>}</>);
}
export default Custrepeatpopup;