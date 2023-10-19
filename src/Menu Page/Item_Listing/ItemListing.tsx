import './ItemListing.css';
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';
import right from './Source/right.png';
import menulogo from './Source/menu.png';
// import Loginpage from '../../Login Page/LoginPage';
import { useContext, useEffect, useState } from 'react';

import Menupagedata from '../Menu_Page_API/MenuPageData';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../CartSlice';





const Itemlisting = () => {

    const filterclicked = useSelector((state:any) => state.VegFilterSlice.value);

    const { menu } = useContext(Menupagedata);
    const Dispatch = useDispatch();

    const [Menu, setMenu] = useState<any>([{}]);
    const [Usercart, setUsercart] = useState<any>({});

    const [fooditemdata, setfooditemdata] = useState<any>();
    

    useEffect(() => {

        if (menu && menu.foodItemCategory && menu.vegfoodItemCategory) {

            if (filterclicked == true) {
                setMenu(menu.vegfoodItemCategory)
            } else {
                setMenu(menu.foodItemCategory)
            }
            
            console.log(Menu);          ///////////Last Remove this log

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

    const navigate = useNavigate();
    const {itemid} = useParams();

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
    
    const handlePopstate = () => {
        document.body.style.overflow = "scroll";
        window.removeEventListener("popstate", handlePopstate);
      };
    window.addEventListener("popstate", handlePopstate);

    let itemaddedcount = 0;

    const increaseitem = () => {
        itemaddedcount++
        console.log(itemaddedcount);
        
    }

    const decreaseitem = () => {
        itemaddedcount--
        console.log(itemaddedcount);
        
    }

    const userdata = useSelector((state:any) => state.perReducers.auth.value)
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value)
    const loggedin = userdata.token;

    const checkAuth = (fooditem: any) => {

        if(loggedin) {

            const Fooditem = {
                "_id": fooditem._id,
                "name": fooditem.name,
                "price": fooditem.price,
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
                "quantity": 1,
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

            if(actualpayload.hasOwnProperty("cart_data")) {
                const existingitem = actualpayload.cart_data.food_items.findIndex((eachitems:any) => eachitems._id === fooditem._id)
                
                if (existingitem >= 0) {
                    
                    const duplicatepayload = {...actualpayload, 
                        cart_data: {...actualpayload.cart_data,
                            food_items: [...actualpayload.cart_data.food_items.slice(0, existingitem),
                                {...actualpayload.cart_data.food_items[existingitem],
                                    quantity: actualpayload.cart_data.food_items[existingitem].quantity + 1
                                },
                                ...actualpayload.cart_data.food_items.slice(existingitem + 1),
                            ],
                        },
                    };
                    
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

        }else{
            const currentURL = window.location.pathname.split("/");
            const loginURL = `${currentURL[0]}/${currentURL[1]}/auth/login`;
            
            navigate(loginURL);
        };
    };
    



    useEffect(()=>{
        if(actualpayload.hasOwnProperty("cart_data")) {
            
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
                const addedfooditems = data.response.data.food_items;
                setUsercart(createdcart);
                console.log(addedfooditems);
                
            })
        }
    },[actualpayload])



    
    const generateData = (fooditem:any) => {
        setfooditemdata(fooditem);
        navigate(fooditem._id);
    };

    const openCust = (fooditem:any) => {
        setfooditemdata(fooditem);
        navigate(`${fooditem._id}/customization`);
    };
    


    
    return (<Menupagedata.Provider value={{fooditemdata}}>
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
                                                    : <>
                                                        {(eachfooditem.customisation_steps.length || eachfooditem.addon_group.length || eachfooditem.variant_group.length) > 0
                                                        ? <><button className="addbutton" onClick={() => openCust(eachfooditem)}>ADD</button>
                                                            <p className='custotext'>Customisable</p></>
                                                        : <button className="addbutton" onClick={() => checkAuth(eachfooditem)}>ADD</button>}

                                                        {/* <button className="addedbutton">
                                                            <p className='addsub' onClick={() => decreaseitem()}>-</p>
                                                            <p>{itemaddedcount}</p>
                                                            <p className='addsub' onClick={() => increaseitem()}>+</p>
                                                        </button> */}
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
                                                                    : <>
                                                                        {(eachfooditem.customisation_steps.length || eachfooditem.addon_group.length || eachfooditem.variant_group.length) > 0
                                                                        ? <><button className="addbutton" onClick={() => openCust(eachfooditem)}>ADD</button>
                                                                            <p className='custotext'>Customisable</p></>
                                                                        : <button className="addbutton" onClick={() => checkAuth(eachfooditem)}>ADD</button>}
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
                <div className='fabbutton' onClick={() => fabopenclose()}>
                    <img className='menulogo' src={menulogo} alt="Menu"/>
                    <p>Menu</p>
                </div>
                
            </div>
            <Outlet/>
        </></Menupagedata.Provider>
    );
};
export default Itemlisting;