import './ItemListing.css';
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';
import right from './Source/right.png';
import menulogo from './Source/menu.png';
import { useContext, useEffect, useState } from 'react';

import Menupagedata from '../Menu_Page_API/MenuPageData';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, clearItem } from '../CartSlice';
import { cartId, clearCartId } from '../CartidSlice';


const Itemlisting = () => {

    const filterclicked = useSelector((state:any) => state.VegFilterSlice.value);

    const { menu } = useContext(Menupagedata);
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    document.body.style.overflow = "scroll";

    const [Menu, setMenu] = useState<any>([{}]);
    const [fooditemdata, setfooditemdata] = useState<any>();
    const [viewfooditem, setviewfooditem] = useState<any>();
    const [totalitems, settotalitems] = useState<number>(0);
    

    useEffect(() => {

        if (menu && menu.foodItemCategory && menu.vegfoodItemCategory) {

            if (filterclicked == true) {
                setMenu(menu.vegfoodItemCategory)
            } else {
                setMenu(menu.foodItemCategory)
            }

        } else {
            console.log("Menu not set");
        }

    }, [menu, filterclicked])


    useEffect(() => {

        Object.keys(Menu).forEach((eachcatagorykey) => {
            
            const showcatname = () => {

                if (document.getElementById(eachcatagorykey) && document.getElementById(eachcatagorykey)!.style && document.getElementById(Menu[eachcatagorykey].name) && document.getElementById(Menu[eachcatagorykey].name)!.style) {

                    if (window.scrollY > document.getElementById(Menu[eachcatagorykey].name)!.offsetTop - 90) {
                        document.getElementById(eachcatagorykey)!.style.visibility = 'visible';
                    } else {
                        document.getElementById(eachcatagorykey)!.style.visibility = 'hidden';
                    };

                    window.scrollY > document.getElementById(Menu[eachcatagorykey].name)!.offsetTop - 145 && (
                        activefab(`fab-${eachcatagorykey}`)
                    );

                };
                
            };

            window.addEventListener('scroll', showcatname);
            return () => {
                window.removeEventListener('scroll', showcatname);
            }

        });

    },[Menu]);


    const openclose = (fid:string, iid:string) => {
        const foodcard = document.getElementById(fid);
        const foodcardbtn = document.getElementById(iid);

        if (foodcard!.style.display == 'none') {
            foodcard!.style.display = ''
            foodcardbtn!.style.rotate = '270deg'
            foodcardbtn!.style.removeProperty('animation')
        }
        else{
            foodcard!.style.display = 'none'
            foodcardbtn!.style.rotate = '90deg'
            foodcardbtn!.style.animation = 'rotationanimation 0.5s ease'
        }
    };

    const fabopenclose = () => {
        let fab = document.getElementById('fabset');

        if (fab!.style.display != 'flex') {
            fab!.style.display = 'flex'
            document.body.style.overflow = "hidden"
        }else{
            fab!.style.display = 'none'
            document.body.style.overflow = 'scroll'
        }
    };

    const scrollto = (id:string) => {
        const headerheight = document.getElementById('mpheader')!.offsetHeight;
        const catdiv = document.getElementById(id);
        const catdivtop = catdiv!.getBoundingClientRect().top + window.scrollY;
        
        if (catdivtop) {
            window.scrollTo({
                top: catdivtop! - 80 - headerheight,
                behavior: 'smooth'
            });
        }

        fabopenclose();
    };

    const activefab = (id: string) => {
        const alreadyactivefab = document.querySelectorAll('.catactive');
        alreadyactivefab.forEach((element:any) => {element.classList.remove('catactive')})

        document.getElementById(id)!.classList.add('catactive');
    };
    
    // const handlePopstate = () => {
    //     document.body.style.overflow = "scroll";
    //     window.removeEventListener("popstate", handlePopstate);
    //   };
    // window.addEventListener("popstate", handlePopstate);

    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);
    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    
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
                "extra_charges" : menu.extra_charges,
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

    useEffect(()=>{
        if(actualpayload.hasOwnProperty("cart_data") && actualpayload.cart_data.food_items.length > 0) {
            
            const url = Usercart._id
            ? `https://prod-server.tipplr.in/app/user/food-order/cart/${Usercart._id}`
            : "https://prod-server.tipplr.in/app/user/food-order/cart";

            fetch(url, {
                method: Usercart._id ? 'PUT' : 'POST',
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
            if(Usercart._id) {
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
    
    const generateData = (fooditem:any) => {
        setviewfooditem(fooditem);
        navigate(fooditem._id);
    };

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
                let qntbtn = document.getElementById(key) as HTMLParagraphElement;
                if (qntbtn) {
                    qntbtn.innerHTML = `${value}`;
                };
            });
            
        };
    },[Usercart.food_items, Menu])
    


    return (<Menupagedata.Provider value={{viewfooditem, fooditemdata, setfooditemdata, menu}}>
        <>
            <div className="fullmenu">
                <div><h2 className="menuheading">- Menu -</h2></div>

                {Object.keys(Menu).map((eachcatagorykey) => (
                    Menu[eachcatagorykey].count > 0 && (
                        <div className="catagory" key={`catagory-${eachcatagorykey}`}>

                            {Menu[eachcatagorykey].food_items.length > 0
                                ?<div className='catheadcard' onClick={() => openclose(`allfooditems-${eachcatagorykey}`,`catbutton-${eachcatagorykey}`)}>
                                    <h3 className="cat" id={Menu[eachcatagorykey].name}>{`${Menu[eachcatagorykey].name} (${Menu[eachcatagorykey].count})`}</h3>
                                    <div className='catbuttonbox'><img id={`catbutton-${eachcatagorykey}`} className="catbutton" src={right} alt=">"/></div>
                                </div>
                                :<h3 className="cat" id={Menu[eachcatagorykey].name}>{`${Menu[eachcatagorykey].name} (${Menu[eachcatagorykey].count})`}</h3>
                            }
                            <div id={`allfooditems-${eachcatagorykey}`}>
                                <div className='catfixed' id={eachcatagorykey}>
                                    <h3 className='catname'>{`${Menu[eachcatagorykey].name} (${Menu[eachcatagorykey].count})`}</h3>
                                </div>

                                {
                                    Menu[eachcatagorykey].food_items &&

                                    Menu[eachcatagorykey].food_items.map((eachfooditem: any) => (
                                        <div className="foodcard" key={`foodcard-${eachcatagorykey}-${eachfooditem.name}`}>

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
                                                            <p id={eachfooditem._id}>0</p>
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
                                }

                                {
                                    Menu[eachcatagorykey].subcategories &&

                                    Object.keys(Menu[eachcatagorykey].subcategories).map((eachsubcategorieskey) => (
                                        Menu[eachcatagorykey].subcategories[eachsubcategorieskey].food_items.length > 0 && (
                                            <React.Fragment key={`subcat-${eachcatagorykey}-${eachsubcategorieskey}`}>

                                                <div className='subcatheadcard' onClick={() => openclose(`allfooditems-${eachsubcategorieskey}`, `catbutton-${eachsubcategorieskey}`)}>
                                                    <h4 className="subcat">{`${Menu[eachcatagorykey].subcategories[eachsubcategorieskey].name} (${Menu[eachcatagorykey].subcategories[eachsubcategorieskey].food_items.length})`}</h4>
                                                    <div className='subcatbuttonbox'><img id={`catbutton-${eachsubcategorieskey}`} className="catbutton" src={right} alt=">"/></div>
                                                </div>
                                                <div id={`allfooditems-${eachsubcategorieskey}`}>
                                                    {Menu[eachcatagorykey].subcategories[eachsubcategorieskey].food_items.map((eachfooditem: any) => (
                                                        <div className="foodcard" key={`foodcard-${eachcatagorykey}-${eachsubcategorieskey}-${eachfooditem.name}`}>

                                                            <div className="fooditemside">
                                                                <img className="vegstatus" src={
                                                                    eachfooditem.veg_status == "veg" ? veg :
                                                                    eachfooditem.veg_status == "egg" ? egg : non_veg
                                                                } alt="Veg Status"/>
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

                                                                <p className="morebutton" onClick={() => generateData(eachfooditem)}>
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
                                                                            <p id={eachfooditem._id}>0</p>
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
                                                    ))}
                                                </div>
                                            </React.Fragment>
                                        )
                                    ))
                                }
                            </div>
                        </div>
                    )
                ))}
                <div id='fabset' className='fabset'>
                    <div className='popoverlay' onClick={() => fabopenclose()}></div>
                    <div className='menufab'>
                        <h3 className='fabheader'>- Menu -</h3>

                        {Object.keys(Menu).map((eachcatagorykey) => (
                            Menu[eachcatagorykey].count > 0 && (
                                <div key={`fab-${eachcatagorykey}`} id={`fab-${eachcatagorykey}`} className='fabcat' onClick={() => {
                                    scrollto(Menu[eachcatagorykey].name);
                                    activefab(`fab-${eachcatagorykey}`);
                                    }}>
                                    <div className='fabcatname'>{Menu[eachcatagorykey].name}</div>
                                    <div>{Menu[eachcatagorykey].count}</div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <div className='floatingfooter'>
                    <div className='fabholder'>
                        <div className='fabbutton' onClick={() => fabopenclose()}>
                            <img className='menulogo' src={menulogo} alt="Menu"/>
                            <p>Menu</p>
                        </div>
                    </div>
                    {Usercart.food_items && 
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
                            <button className='viewcartbtn'onClick={() => navigate("cart")}>View Cart<img src={right} alt=">"/></button>
                        </div>
                    }
                </div>
                
            </div>
            <Outlet/>
        </></Menupagedata.Provider>
    );
};
export default Itemlisting;