import "./MenuSearchPage.css";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Menupagedata from "../Menu_Page_API/MenuPageData";
import Menusearchbar from "../Menu_Search_Bar/MenuSearchBar";
import { addItem } from "../CartSlice";

import right from "./Source/right.png";
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';






const Menusearchpage = () => {

    const {menu} = useContext(Menupagedata);
    const Menu = structuredClone(menu.food_items) as Array<Object>;
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    document.body.style.overflow = "hidden"

    const [totalitems, settotalitems] = useState<number>(0);
    const [inputbox, setinputbox] = useState<HTMLInputElement>();
    const [resetbutton, setresetbutton] = useState<HTMLButtonElement>();
    const [searchkey, setsearchkey] = useState<string>();
    const [searchresult, setsearchresult] = useState<any>();
    const [viewfooditem, setviewfooditem] = useState<any>();
    const [fooditemdata, setfooditemdata] = useState<any>();

    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);

    useEffect(() => {
        setinputbox(document.getElementById("menusearchbox") as HTMLInputElement);
        setresetbutton(document.getElementById("menuresetbtn") as HTMLButtonElement);
    },[])

    useEffect(() => {
        if(inputbox && resetbutton) {
            inputbox.focus();
            inputbox.placeholder = `Search in ${menu.merchant.name}`;

            const getsearchkey = () => {
                setsearchkey(inputbox.value);
                
                if(!inputbox.value) {
                    setsearchresult("");
                }
            };

            const clearsearchkey = () => {
                setsearchkey("");
                setsearchresult("");
            };

            inputbox.addEventListener("input", getsearchkey);
            resetbutton.addEventListener("click", clearsearchkey);
            return () => {
                inputbox.removeEventListener("input", getsearchkey);
                resetbutton.removeEventListener("touchend", clearsearchkey);
            };
        };
    },[inputbox])

    useEffect(() => {
        if(searchkey && searchkey.length > 1) {
            const searchresponse = Menu.filter((eachitem:any) => eachitem.name.toLowerCase().includes(searchkey.toLowerCase()));
            setsearchresult(searchresponse)
        }
    },[searchkey])

    useEffect(()=>{
        if(Usercart.food_items && Usercart.food_items.length > 0) {

            const cartfooditems:object[] = [];
            let allitemcount = 0;
            Usercart.food_items.forEach((fooditem:any) => {
                allitemcount += fooditem.quantity;
                cartfooditems.push({[fooditem._id]: fooditem.quantity});
            });
            settotalitems(allitemcount);

            const combinedfooditems = cartfooditems.reduce((initial:any, fooditem:any) => {
                Object.entries(fooditem).forEach(([key, value])=>{
                    initial[key] = (initial[key] || 0) + value
                });
                return initial;
            }, {})

            Object.entries(combinedfooditems).forEach(([key, value]) => {
                let qntbtn = document.getElementById("search-" + key) as HTMLParagraphElement;
                if (qntbtn) {
                    qntbtn.innerHTML = `${value}`;
                };
            });
            
        };
    },[Usercart, searchresult])

    const loggedin = userdata.token;
    const checkAuth = (fooditem: any) => {

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
                navigate(`${fooditem._id}/clearcart`);
            }else{

                let existingitem = 0;
                if(actualpayload.hasOwnProperty("cart_data")) {
                    existingitem = actualpayload.cart_data.food_items.filter((eachitems:any) => eachitems._id === fooditem._id).length
                };

                if( ((fooditem.quantity == -1) && (existingitem != 1) || (fooditem.quantity != -1)) && ((fooditem.customisation_steps.length || fooditem.addon_group.length || fooditem.variant_group.length) > 0) ) {

                    if(actualpayload.hasOwnProperty("cart_data")) {
                        
                        if(existingitem > 0) {
                            setfooditemdata(payload);
                            navigate(`${fooditem._id}/customize`);
                        }else{
                            setfooditemdata(payload);
                            navigate(`${fooditem._id}/customization`);
                        }

                    }else{
                        setfooditemdata(payload);
                        navigate(`${fooditem._id}/customization`);
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

    const generateData = (fooditem:any) => {
        setviewfooditem(fooditem);
        navigate(fooditem._id);
    };

    const gotocart = () => {
        const currenturl = window.location.pathname.replace('search','cart');
        navigate(currenturl, {replace: true})
    };
    

    return(<Menupagedata.Provider value={{viewfooditem, fooditemdata, setfooditemdata, menu}}>
        <>
            <div className="newpage">
                <div className="mspsearchbarholder">
                    <Menusearchbar/>
                </div>

                {searchkey && searchresult && searchresult.length > 0
                    ? <div className="searchresultcard"> {
                    
                        searchresult.map((eachfooditem: any) => (
                            <div className="searchfoodcard" key={`foodcard-${eachfooditem._id}`}>

                                <div className="fooditemside">
                                    <img className="vegstatus" src={
                                        eachfooditem.veg_status == "veg" ? veg :
                                        eachfooditem.veg_status == "egg" ? egg : non_veg
                                    } alt="Veg Status" />
                                    <p className="itemname">{eachfooditem.name}</p>

                                    {
                                        eachfooditem.price == 0 ?
                                            <div className='pricebox'>
                                                <p className="itemprice">₹ {Math.round(eachfooditem.default_price)}</p>
                                                <p className="displayprice">₹ {Math.round(eachfooditem.default_price - eachfooditem.discounted_price_rupees)}</p>
                                            </div>:
                                        eachfooditem.hasOwnProperty('offer_price')?
                                            <div className='pricebox'>
                                                <p className="itemprice">₹ {Math.round(eachfooditem.price)}</p>
                                                <p className="displayprice">₹ {Math.round(eachfooditem.offer_price)}</p>
                                            </div>:
                                            <div className='pricebox'>
                                                <p className="displayprice">₹ {Math.round(eachfooditem.price)}</p>
                                            </div>
                                    }

                                    <p className="morebutton" onClick={ () => generateData(eachfooditem) }>
                                        More Details <img className="arrowright" src={right} alt="" />
                                    </p>
                                </div>

                                <div className="foodimageside">
                                    {eachfooditem.food_image && (
                                        <img className="foodimage" loading='lazy' style={eachfooditem.availablity.availability == false ? {filter: 'grayscale(80%)'}:{}} src={eachfooditem.food_image} alt="Food Image" onClick={() => generateData(eachfooditem)}/>
                                    )}
                                    {eachfooditem.availablity.availability == false
                                        ? <p className='notavailable'>{eachfooditem.availablity.availability_message}</p>
                                        : (Usercart.food_items && Usercart.food_items.some((fooditem:any)=>(fooditem._id == eachfooditem._id)))
                                        ? <>
                                            <button className="addedbutton">
                                                <p className='addsub' onClick={() => {checkAuth({...eachfooditem, quantity:-1})}}>-</p>
                                                <p id={"search-"+eachfooditem._id}>0</p>
                                                <p className='addsub' onClick={() => checkAuth(eachfooditem)}>+</p>
                                            </button>
                                            {(eachfooditem.customisation_steps.length || eachfooditem.addon_group.length || eachfooditem.variant_group.length) > 0
                                                ? <p className='custotext'>Customisable</p> : null
                                            }
                                        </>
                                        : <>
                                            <button className="addbutton" onClick={() => checkAuth(eachfooditem)}>ADD</button>
                                            {(eachfooditem.customisation_steps.length || eachfooditem.addon_group.length || eachfooditem.variant_group.length) > 0
                                                ? <p className='custotext'>Customisable</p> : null
                                            }
                                        </>
                                    }
                                </div>

                            </div>
                        ))
                    }</div>
                    : searchkey && searchresult && <>
                        <p className="nofoundmsg">No results found for {<strong>"{searchkey}"</strong>}</p>
                    </>
                }

                {Usercart && Usercart.food_items && 
                    <div className='floatingfooter'>
                        <div className='totalcard'>
                            <div>
                                <div className='itemstotalholder'>
                                    <p className='totalitemscount'>{totalitems}{totalitems > 1 ? " Items" : " Item"}</p>
                                    <p className='totalitemsdivider'>|</p>
                                    {Usercart.total_item_level_discount_price > 0
                                        ? <>
                                            <p className='totalscratchprice'>₹ {Usercart.total_item_total.toFixed(2)}</p>
                                            <p className='totalitemsprice'>₹ {(Usercart.total_item_total - Usercart.delivery_discount).toFixed(2)}</p>
                                        </>
                                        : <p className='totalitemsprice'>₹ {(Usercart.total_item_total).toFixed(2)}</p>
                                    }
                                </div>
                                <p className='totalcardmessage'>Additional charges may apply</p>
                            </div>
                            <button className='viewcartbtn'onClick={() => gotocart()}>View Cart<img src={right} alt=">"/></button>
                        </div>
                    </div>
                }

            </div>
            <Outlet/>
        </>
    </Menupagedata.Provider>)
}
export default Menusearchpage;