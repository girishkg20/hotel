import "./ItemPopup.css";
import { useContext, useEffect, useState } from "react";
import veg from "./Source/veg.png";
import egg from "./Source/egg.png";
import non_veg from "./Source/non-veg.png";
import close from "./Source/close.png";
import Menupagedata from "../Menu_Page_API/MenuPageData";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from "../CartSlice";
import _ from "lodash";



const Itempopup = () => {

    const {viewfooditem, setfooditemdata, menu} = useContext(Menupagedata);
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    document.body.style.overflow = "hidden"

    useEffect(() => {
        if(!viewfooditem) {
            navigate(-1)
        }
    },[viewfooditem]);

    // if(viewfooditem){
    //     document.body.style.overflow = "hidden"

    //     const handlePopstate = () => {
    //         document.body.style.overflow = "scroll";
    //         window.removeEventListener("popstate", handlePopstate);
    //         console.log(document.body.style.overflow);
    //     };
    //     window.addEventListener("popstate", handlePopstate);
    // };

    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);
    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    
    const loggedin = userdata.token;

    const ipcheckAuth = (fooditem: any) => {

        if(loggedin) {

            const Fooditem = {
                "_id": fooditem._id,
                "name": fooditem.name,
                "price": fooditem.price,
                "food_image": fooditem.food_image,
                "discounted_price_rupees": fooditem.discounted_price_rupees,
                "delivery_discount_rupees": fooditem.delivery_discount_rupees,
                "tipplr_commission_rupees": fooditem.tipplr_commission_rupees,
                "round_of_price": fooditem.round_of_price,
                "is_tipplr_mini": fooditem.tipplr_mini,
                "customisation_steps": [],
                "original_customisation_steps": fooditem.customisation_steps,
                "variant_group": [],
                "original_variant_group": fooditem.variant_group,
                "addon_group": [],
                "original_addon_group": fooditem.addon_group,
                "quantity": fooditem.quantity || 1,
                "original_food_item": fooditem,
                "packing_charges": fooditem.packing_charges,
                "item_gst": fooditem.item_gst
            }

            const cartdata = {
                "merchant_id": fooditem.merchant_id,
                "food_items" : [Fooditem],
                // "extra_charges" : menu.extra_charges,
                "is_club": 0
            }
            const payload = {"cart_data" : cartdata}

            if(actualpayload.hasOwnProperty("cart_data") && (actualpayload.cart_data.merchant_id != fooditem.merchant_id)) {
                navigate("clearcart");
            }else{

                let existingitem = 0;
                if(actualpayload.hasOwnProperty("cart_data")) {
                    existingitem = actualpayload.cart_data.food_items.filter((eachitems:any) => eachitems._id === fooditem._id).length
                };

                if( ((fooditem.quantity == -1) && (existingitem != 1) || (fooditem.quantity != -1)) && ((fooditem.customisation_steps.length || fooditem.addon_group.length || fooditem.variant_group.length) > 0) ) {

                    if(actualpayload.hasOwnProperty("cart_data")) {
                        
                        if(existingitem > 0) {
                            setfooditemdata(payload);
                            navigate("customize");
                        }else{
                            setfooditemdata(payload);
                            navigate("customization");
                        }

                    }else{
                        setfooditemdata(payload);
                        navigate("customization");
                    }
                    
                }else{
                    if(actualpayload.hasOwnProperty("cart_data")) {
                        const existingitem = actualpayload.cart_data.food_items.findIndex((eachitems:any) => eachitems._id === fooditem._id)
                        
                        if (existingitem >= 0) {
                            
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
                            
                        }else{
                            const duplicatepayload = {...actualpayload,
                                cart_data: {...actualpayload.cart_data,
                                    food_items: [...actualpayload.cart_data.food_items, Fooditem]
                                }
                            };

                            Dispatch(addItem(duplicatepayload));
                        };

                    }else{
                        Dispatch(addItem(payload));
                    };
                };
            };
        }else{
            const currentURL = window.location.pathname.split("/");
            const loginURL = `${currentURL[0]}/${currentURL[1]}/auth/login`;
            
            navigate(loginURL);
        };
    };


    useEffect(()=>{
        if(Usercart.food_items && Usercart.food_items.length > 0) {

            const cartfooditems:object[] = [];
            Usercart.food_items.forEach((fooditem:any) => {
                cartfooditems.push({[fooditem._id]: fooditem.quantity});
            });

            const combinedfooditems = cartfooditems.reduce((initial:any, fooditem:any) => {
                Object.entries(fooditem).forEach(([key, value])=>{
                    initial[key] = (initial[key] || 0) + value
                });
                return initial;
            }, {})

            Object.entries(combinedfooditems).forEach(([key, value]) => {
                const qntbtn = document.getElementById(`${key}_view`) as HTMLParagraphElement;
                if (qntbtn) {
                    qntbtn.innerHTML = `${value}`;
                };
            });
            
        };
    },[Usercart.food_items, viewfooditem])

    
    return(<>{ viewfooditem ? <>
        <div className='popoverlay' onClick={() => navigate(-1)}></div>

        <div className="popover">
            <img className="closebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            {viewfooditem.food_image && (
                <img className="fullimage" src={viewfooditem.food_image} alt="Food Image"/>
            )}
            <div className='popfoodcard'>
                <div className="fooditemside">
                    <img className="vegstatus" src={
                        viewfooditem.veg_status == "veg" ? veg :
                        viewfooditem.veg_status == "egg" ? egg : non_veg
                    } alt="Veg Status" />
                    <p className="itemname">{viewfooditem.name}</p>
                    
                    {
                        viewfooditem.price == 0 ?
                            <div className='pricebox'>
                                <p className="itemprice">₹ {Math.round(viewfooditem.default_price)}</p>
                                <p className="displayprice">₹ {Math.round(viewfooditem.default_price - viewfooditem.discounted_price_rupees)}</p>
                            </div>:
                        typeof viewfooditem.default_price === 'number' ?
                            <div className='pricebox'>
                                <p className="itemprice">₹ {Math.round(viewfooditem.price)}</p>
                                <p className="displayprice">₹ {Math.round(viewfooditem.offer_price)}</p>
                            </div>:
                            <div className='pricebox'>
                                <p className="displayprice">₹ {Math.round(viewfooditem.price)}</p>
                            </div>
                    }

                </div>
                <div className="foodimageside">
                    
                    {viewfooditem.availablity.availability == false
                        ? <p className='notavailable'>{viewfooditem.availablity.availability_message}</p>
                        : (Usercart.food_items && Usercart.food_items.some((fooditem:any)=>(fooditem._id == viewfooditem._id)))
                        ? <>
                            <button className="addedbutton">
                                <p className='addsub' onClick={() => {ipcheckAuth({...viewfooditem, quantity:-1})}}>-</p>
                                <p id={`${viewfooditem._id}_view`}>0</p>
                                <p className='addsub' onClick={() => ipcheckAuth(viewfooditem)}>+</p>
                            </button>
                            {(viewfooditem.customisation_steps.length || viewfooditem.addon_group.length || viewfooditem.variant_group.length) > 0
                                ? <p className='custotext'>Customisable</p> : null
                            }
                        </>
                        : <>
                            <button className="addbutton" onClick={() => ipcheckAuth(viewfooditem)}>ADD</button>
                            {(viewfooditem.customisation_steps.length || viewfooditem.addon_group.length || viewfooditem.variant_group.length) > 0
                                ? <p className='custotext'>Customisable</p> : null
                            }
                        </>
                    }

                </div>
            </div>
            <p className="itemdescription">{viewfooditem.description}</p>
        </div>
    </>:null}</>)
}
export default Itempopup;