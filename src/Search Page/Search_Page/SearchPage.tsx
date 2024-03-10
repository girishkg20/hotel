import "./Searchpage.css";
import Searchbar from "../Search_Bar/SearchBar";

import discountimg from "./Source/offer.png";
import locationpin from "./Source/location pin.png";
import right from "./Source/right.png";
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';
import arrow from './Source/arrow.png';

import { addItem, clearItem } from "../../Menu Page/CartSlice";
import { cartId, clearCartId } from "../../Menu Page/CartidSlice";
import { searchdatapositions, clearsearchdatapositions } from "../SearchDataSlice";
import Menupagedata from "../../Menu Page/Menu_Page_API/MenuPageData";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";







const Searchpage = () => {

    const navigate = useNavigate();
    const Dispatch = useDispatch();

    document.body.style.overflow = 'scroll';

    const merchantsdata = useSelector((state:any) => state.perReducers.merchantsData.value);
    const merchantids = merchantsdata.map((eachresto:any) => eachresto._id).join(",");
    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);
    const searchadjust = useSelector((state:any) => state.searchdatapositions.value);

    const Default_Cover_Image = "https://res.cloudinary.com/tipplr-server/image/upload/fl_lossy,f_auto,q_auto,c_fill,w_512,h_256/v1679409245/ty1nlgx7buizm5onqseu.jpg";
    
    const [inputbox, setinputbox] = useState<HTMLInputElement>();
    const [resetbutton, setresetbutton] = useState<HTMLButtonElement>();
    const [tab, settab] = useState<string>("restauranttab");
    const [searchkey, setsearchkey] = useState<string>();
    const [restaurants, setrestaurants] = useState<any>();
    const [dishes, setdishes] = useState<any>();
    const [sorteddishes, setsorteddishes] = useState<any>();
    const [viewfooditem, setviewfooditem] = useState<any>();
    const [fooditemdata, setfooditemdata] = useState<any>();
    const [totalitems, settotalitems] = useState<number>(0);

    useEffect(() => {
        setinputbox(document.getElementById("searchbox") as HTMLInputElement);
        setresetbutton(document.getElementById("resetbtn") as HTMLButtonElement);
    },[])

    useEffect(() => {
        if(inputbox && resetbutton) {
            if(searchadjust && searchadjust.searchkey) {
                settab(searchadjust.searchtab);
                inputbox.value = searchadjust.searchkey;
                setsearchkey(inputbox.value);
            }else{
                inputbox.focus();
            }

            const getsearchkey = () => {
                setsearchkey(inputbox.value);
            }

            const clearsearchkey = () => {
                setsearchkey("");
                setrestaurants("");
                setdishes("");
            }

            inputbox.addEventListener("input", getsearchkey);
            resetbutton.addEventListener("click", clearsearchkey);
            return () => {
                inputbox.removeEventListener("input", getsearchkey);
                resetbutton.removeEventListener("touchend", clearsearchkey);
            }
        };
    },[inputbox])

    useEffect(() => {
        window.scrollTo(0, 0);
        if(searchkey) {
            let search_text = searchkey;
            let merchant_ids = merchantids;

            const url = tab === "restauranttab"
            ? `https://prod-server.tipplr.in/hotel/search/restaurant?limit=25&skip=0&search_text=${search_text}&merchant_ids=${merchant_ids}`
            : `https://prod-server.tipplr.in/hotel/search/dishes?limit=25&skip=0&search_text=${search_text}&merchant_ids=${merchant_ids}`;
            
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(respone => respone.json())
            .then((data) => {
                tab === "restauranttab"
                ? setrestaurants(data.response.data)
                : setdishes(data.response.data);

                if(searchadjust && searchadjust.searchkey) {
                    setTimeout(() => {

                        if(window.location.pathname.includes("search")) {
                            window.scrollTo(0, searchadjust.searchscrollposition);
                        }
                        Dispatch(clearsearchdatapositions());

                    }, 50);
                };
            })
        }
    },[searchkey, tab]);

    useEffect(() => {
        const switches = document.getElementsByClassName("sswitchtext");
        Array.from(switches).forEach(eachtab => {
            eachtab.removeAttribute('style');
        });

        const selectedtab = document.getElementById(tab) as HTMLParagraphElement;
        selectedtab.style.borderBottomColor = "#7427F5";
        selectedtab.style.color = "#7427F5";
    },[tab])

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
    },[Usercart, dishes])

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
                "merchant_id": fooditem.merchant_id._id,
                "food_items" : [Fooditem],
                // "extra_charges" : menu.extra_charges,
                "is_club": 0
            }
            const payload = {"cart_data" : cartdata}

            if(actualpayload.hasOwnProperty("cart_data") && (actualpayload.cart_data.merchant_id != fooditem.merchant_id._id)) {
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

    useEffect(()=>{
        if(actualpayload.hasOwnProperty("cart_data") && actualpayload.cart_data.food_items.length > 0) {
            
            const url = Usercart && Usercart._id
            ? `https://prod-server.tipplr.in/app/user/food-order/cart/${Usercart._id}`
            : "https://prod-server.tipplr.in/app/user/food-order/cart";

            fetch(url, {
                method: Usercart && Usercart._id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loggedin
                },
                body: JSON.stringify(actualpayload)
            })
            .then(response => response.json())
            .then(data => {
                const createdcart = data.response.data;
                Dispatch(cartId(createdcart));
            })

        }else{
            if(Usercart && Usercart._id) {
                const url = `https://prod-server.tipplr.in/app/user/food-order/cart/${Usercart._id}`
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': loggedin
                    }
                })
                .then(response => response.json())
                .then(() => {
                    Dispatch(clearCartId());
                    Dispatch(clearItem());
                })
            }
        }
    },[actualpayload])

    useEffect(() => {
        if(dishes) {
            const sortedDishes = dishes.reduce((acc:any, eachdishes:any)=> {

                const merchantid = eachdishes.merchant_id._id;
                const foundat = acc.findIndex((eacharr:any) => eacharr.id == merchantid);

                const Dish = eachdishes.discounted_price_rupees && eachdishes.discounted_price_rupees > 0
                    ? {...eachdishes, offer_price: eachdishes.price - eachdishes.discounted_price_rupees}
                    : eachdishes
                
                if(foundat >= 0) {
                    acc[foundat].fooditems.push(Dish);
                }else{
                    const fullitem = {
                        name: eachdishes.merchant_id.name,
                        area: eachdishes.merchant_id.area_id.name,
                        id: eachdishes.merchant_id._id,
                        fooditems: [Dish]
                    };
                    acc.push(fullitem);
                }

                return acc;
            }, [])
            setsorteddishes(sortedDishes);
        }
    },[dishes])

    const openclose = (fid:string, iid:string) => {
        const foodcard = document.getElementById(fid);
        const foodcardbtn = document.getElementById(iid);

        setTimeout(() => {
            foodcardbtn!.style.removeProperty('animation');
        }, 500);

        if (foodcard!.style.display == 'none') {
            foodcard!.style.display = ''
            foodcardbtn!.style.rotate = '270deg'
            foodcardbtn!.style.animation = 'rotationanimation 0.5s ease reverse'
        }
        else{
            foodcard!.style.display = 'none'
            foodcardbtn!.style.rotate = '90deg'
            foodcardbtn!.style.animation = 'rotationanimation 0.5s ease'
        }
    };

    const generateData = (fooditem:any) => {
        setviewfooditem(fooditem);
        navigate(fooditem._id);
    };

    const navtorestaurant = (id:any) => {
        const searchdatapos = {
            searchkey: searchkey,
            searchtab: tab,
            searchscrollposition: window.scrollY
        }
        Dispatch(searchdatapositions(searchdatapos))

        const hotelid = window.location.pathname.split("/")[1];
        navigate(`/${hotelid}/${id}`)
    };

    const gotocart = () => {
        const searchdatapos = {
            searchkey: searchkey,
            searchtab: tab,
            searchscrollposition: window.scrollY
        }
        Dispatch(searchdatapositions(searchdatapos))

        const currenturl = window.location.pathname.replace('search', Usercart.merchant_id + "/cart");
        navigate(currenturl);
    };
    

    return(<Menupagedata.Provider value={{viewfooditem, fooditemdata, setfooditemdata}}>
        <div className="searchheader">
            <div className="searchbarcontainer">
                <Searchbar/>
            </div>
            <div className="searchswitchholder">
                <div className="searchswitch" onClick={() => settab("restauranttab")}>
                    <p className="sswitchtext" id="restauranttab">Restaurants</p>
                </div>
                <div className="searchswitch" onClick={() => settab("dishtab")}>
                    <p className="sswitchtext" id="dishtab">Dishes</p>
                </div>
            </div>
        </div>

        {tab === "restauranttab"
            ? searchkey && restaurants && restaurants.length > 0
                ? <div className="searchresults"><div className="searchrestaurantsholder">{
                    restaurants.map((eachRestaurant:any) => (
                        <div key={eachRestaurant._id} className="restaurantcard" onClick={()=>navtorestaurant(eachRestaurant._id)}>
                            <img
                                className="restaurantimg"
                                loading="lazy"
                                src={eachRestaurant.cover_image ?? Default_Cover_Image}
                            />

                            {eachRestaurant.discount_banner ? (
                                <div className="offerbox">
                                    <div className="discount">
                                        <img className="discountimg" src={discountimg} />
                                        <p>{eachRestaurant.discount_banner}</p>
                                    </div>
                                    
                                    <p>{eachRestaurant.delivery_discount_banner}</p>
                                </div>
                            ) : null}

                            <div className="namerating">
                                <p className="restaurantname">{eachRestaurant.name}</p>

                                {eachRestaurant.rating > 0 ? (
                                    <p className="rlrating">
                                        <span className="rlstar">⭐ &nbsp;</span>
                                        {eachRestaurant.rating.toFixed(1)}
                                    </p>
                                ) : null}
                            </div>

                            <p className="restaurantcuisines">
                                {eachRestaurant.cuisines
                                    .map((eachCuisine: any) => eachCuisine.name)
                                    .join(", ")
                                }
                            </p>

                            <div className="areac42">
                                <p className="area">{eachRestaurant.area_name}</p>
                                <p>{`₹ ${eachRestaurant.cost_for_two} for two`}</p>
                            </div>

                            <hr className="divider" />

                            <div className="peopledistance">
                                <p className="orders">
                                    {eachRestaurant.order_count == 0
                                        ? "Be the first to order from this place"
                                        : `${eachRestaurant.order_count} people have ordered from this place`
                                    }
                                </p>

                                {eachRestaurant.distance && 
                                    <div className="distanceholder">
                                        <img className="locationpin" src={locationpin} />
                                        <p className="rldistance">{`${eachRestaurant.distance} km`}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    ))

                }</div></div>
                : <>{searchkey && restaurants &&
                    <>
                        <p className="nofoundmsg">No restaurants found for {<strong>"{searchkey}"</strong>}</p>
                    </>
                }</>

            : searchkey && sorteddishes && sorteddishes.length > 0
                ? <div className="searchresults">
                    {sorteddishes.map((eachfoodresto:any) => (<div className="searchdishsholder" key={eachfoodresto.id}>
                        <div className="searchrestoholder" onClick={() => navtorestaurant(eachfoodresto.id)}>
                            <div className="searchrestonavholder">
                                <p className="searchrestoname">{eachfoodresto.name}</p>
                                <img className="searchdisharrow" src={arrow} alt=">"/>
                            </div>
                            <p className="searchrestoarea">{eachfoodresto.area}</p>
                        </div>
                        <div className='catheadcard' onClick={() => openclose(`allfoodcards-${eachfoodresto.id}`,`catbutton-${eachfoodresto.id}`)}>
                            <h3 className="searchitemcount">{"Found " + eachfoodresto.fooditems.length + " Food Items"}</h3>
                            <div className='catbuttonbox'><img id={`catbutton-${eachfoodresto.id}`} className="catbutton" src={right} alt=">"/></div>
                        </div>
                        <div id={`allfoodcards-${eachfoodresto.id}`}>{eachfoodresto.fooditems.map((eachfooditem: any) => (
                            <div className="foodcard" key={`foodcard-${eachfooditem._id}`}>

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
                        ))}</div>
                    </div>))}
                </div>
                : <>{searchkey && dishes &&
                    <>
                        <p className="nofoundmsg">No dishes found for {<strong>"{searchkey}"</strong>}</p>
                    </>
                }</>
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

        <Outlet/>
    
    </Menupagedata.Provider>)
}
export default Searchpage;