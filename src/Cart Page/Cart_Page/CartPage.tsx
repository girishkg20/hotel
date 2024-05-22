import './CartPage.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import backbutton from './Source/back.png';
import offer from './Source/offer.png';
import rightgreen from './Source/right green.png';
import right from './Source/right.png';
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';
import food from './Source/food.png';
import delivery from './Source/delivery.png';
import coupon from './Source/coupon.png';
import addmore from './Source/add more.png';
import addnote from './Source/add instructions.png';
import applycoupon from './Source/apply coupon.png';
import address from './Source/location.png';
import tick from './Source/tick.png';
import emptycart from './Source/emptycart.png';
import logo from './Source/Logo.jpg';

import { cartId, clearCartId } from '../../Menu Page/CartidSlice';
import { addItem, clearItem } from '../../Menu Page/CartSlice';
import { clearroomnumber } from '../RoomnumberSlice';
import { profiledata } from '../../Profile Page/ProfileSlice';
import Cartpagedata from '../Cart_Page_Data/CartPageData';
import Couponappliedpopup from '../Confetti_Animation/ConfettiAnimation';
import Uniloader from '../../Universal Loader/UniLoader';

declare var Razorpay: any;





const Cartpage = () => {

    const [deliveryquote, setdeliveryquote] = useState<any>();
    const [itemdiscount, setitemdiscount] = useState<any>();
    const [deliverydiscount, setdeliverydiscount] = useState<any>();
    const [header, setheader] = useState <HTMLDivElement | null>();
    const [bheader, setbheader] = useState <HTMLDivElement | null>();
    const [fooditemdata, setfooditemdata] = useState<any>();
    const [visible, setvisible] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(true);

    const navigate = useNavigate();
    const Dispatch = useDispatch();
    document.body.style.overflow = "scroll";

    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    const deliveryaddress = useSelector((state:any) => state.perReducers.saveaddress.value);
    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);
    const cookinginstructions = useSelector((state:any) => state.foodinstruction.value);
    const roomnumber = useSelector((state:any) => state.roomnumber.value);
    const profile = useSelector((state:any) => state.perReducers.profiledata.value);
    const sessionID = useSelector((state:any) => state.sesReducers.sessionid.value);

    const loggedin = userdata.token;

    useEffect(() => {
        setheader(document.getElementById("cartheader") as HTMLDivElement | null);
        setbheader(document.getElementById("cartheaderbottom") as HTMLDivElement | null);

        window.addEventListener('scroll', fixheader)
        return () => {
            window.removeEventListener('scroll', fixheader);
        };
    },[header, bheader, loading])

    useEffect(() => {
        if(deliveryquote && Usercart) {

            setitemdiscount(Usercart.delivery_discount);
            const deldiscount = deliveryquote.estimated_fare - Usercart.available_delivery_discount;
        
            if(deldiscount < 0) {
                setdeliverydiscount(deliveryquote.estimated_fare);
            }else{
                setdeliverydiscount(Usercart.available_delivery_discount);
            }

        }
    },[deliveryquote, Usercart])

    const openclose = (cid:string, btnid:string) => {
        const tscard = document.getElementById(cid);
        const upbutton = document.getElementById(btnid);

        setTimeout(() => {
            upbutton!.style.removeProperty('animation');
        }, 300);

        if (tscard!.style.maxHeight != '204px') {
            tscard!.style.maxHeight = '204px';
            upbutton!.style.rotate = '270deg';
            upbutton!.style.animation = 'rotationanimation 0.3s linear reverse';
        }else{
            tscard!.style.maxHeight = '24px';
            upbutton!.style.rotate = '90deg';
            upbutton!.style.animation = 'rotationanimation 0.3s linear';
        }
    };

    const fixheader = () => {

        if(header) {
            if (window.scrollY > 15) {
                header!.style.backgroundColor = 'white';
                header!.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)';
            }else{
                header!.style.backgroundColor = '#F6F6F6';
                header!.style.removeProperty('box-shadow');
            }
        }

        if(bheader) {
            if (window.scrollY > 100) {
                bheader!.style.display = 'flex';
            }else{
                bheader!.style.display = 'none';
            }
        }
    }

    const openclosepop = (id:any) => {
        const popelement = document.getElementById(id);
        const popoverlay = document.getElementById(`${id}_overlay`);
         
        if(popelement!.style.display == 'block') {
            popelement!.style.display = 'none';
            popoverlay!.style.display = 'none';
        }else{
            popelement!.style.display = 'block';
            popoverlay!.style.display = 'block';
        }
    }

    useEffect(() => {
        if(Usercart && Usercart.promo_used && Usercart.promo_used.value) {
            setvisible(true);

            setTimeout(() => {
                setvisible(false);
            }, 3500);
        }
    },[Usercart])

    useEffect(() => {

        if(loggedin) {
            const url = `${import.meta.env.VITE_BASE_URL}/app/user/profile`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loggedin
                }
            })
            .then((response) => response.json())
            .then((data) => {
                Dispatch(profiledata(data.response.data));
            })
        };

    },[])

    const pushtocart = (eachfooditem:any) => {

        const existingitem = actualpayload.cart_data.food_items.findIndex((eachitems:any) =>
            eachitems._id === eachfooditem._id
            && _.isEqual(eachitems.addon_group, eachfooditem.addon_group)
            && _.isEqual(eachitems.customisation_steps, eachfooditem.customisation_steps)
            && _.isEqual(eachitems.variant_group, eachfooditem.variant_group)
        )
        
        const duplicatepayload = {...actualpayload, 
            cart_data: {...actualpayload.cart_data,
                food_items: [...actualpayload.cart_data.food_items.slice(0, existingitem),
                    {...actualpayload.cart_data.food_items[existingitem],
                        quantity: actualpayload.cart_data.food_items[existingitem].quantity + eachfooditem.quantity
                    },
                    ...actualpayload.cart_data.food_items.slice(existingitem + 1),
                ],
            },
        };

        const removeditem = duplicatepayload.cart_data.food_items.findIndex((eachitems:any) => eachitems.quantity < 1)
        removeditem >= 0 && duplicatepayload.cart_data.food_items.splice(removeditem, 1);
        
        Dispatch(addItem(duplicatepayload));
    };

    const generateData = (fooditem:any) => {
        setfooditemdata(fooditem);
        navigate("customization");
    };

    const navtorestaurant = () => {
        const prepath = window.location.pathname.split("/")[1];
        const newpath = `/${prepath}/${Usercart.merchant_id}`;

        const redirecttoresto = () => {
            navigate(newpath, {replace: true});
            window.removeEventListener("popstate", redirecttoresto)
        }

        window.addEventListener("popstate", redirecttoresto);
        navigate(-1);
    };

    const navtotrack = (orderid:any) => {
        Dispatch(clearItem());
        Dispatch(clearCartId());

        const hotelid = window.location.pathname.split("/")[1];
        navigate(`/${hotelid}/trackorder/${orderid}`);
    };

    useEffect(() => {
        if(roomnumber) {
            setloading(true);
            const order = {
                "merchant_id": Usercart.merchant_id,
                "food_items": Usercart.food_items,
                "order_type": "delivery",
                "promo_used": Usercart.promo_used,
                "external_promo_used": {},
                "delivery_partner": deliveryquote.partner_id,
                "delivery_charges": Usercart.delivery_charges,
                "actual_delivery_charges": deliveryquote.actual_fare,
                "preferred_delivery_charges": deliveryquote.estimated_fare,
                "delivery_distance": deliveryquote.distance,
                "hotel_merchant_id": deliveryaddress.merchant_sku,
                "room_number": roomnumber,
                "user_address_id": deliveryaddress.tagged_user_id,
                "user_cart_id": Usercart._id
            }

            if(loggedin) {
                const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order`;
    
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': loggedin
                    },
                    body: JSON.stringify(order)
                })
                .then((response) => response.json())
                .then((data:any) => {

                    Dispatch(clearroomnumber());

                    const orderid = data.response.data._id;
                    const payable = data.response.data.total;

                    const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/${orderid}/payment`;
                    const payment = {
                        "payment_gateway": "razorpay",
                        "amount": payable
                    }

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': loggedin
                        },
                        body: JSON.stringify(payment)
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        
                        const options = {
                            "key": data.response.razorpay_key, // Enter the Key ID generated from the Dashboard
                            "amount": data.response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                            "currency": "INR",
                            "name": "TIPPLR", //your business name
                            "description": "Food Order",
                            "image": logo,
                            "order_id": data.response.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                            "handler": (response:any) => {

                                const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/${data.response.data.payment_request_id}/confirm`;
                                const payments = {
                                    "payments": [
                                        {
                                            "transaction_number": data.response.data.transaction_number,
                                            "payment_gateway_transaction_id": response.razorpay_payment_id
                                        }
                                    ]
                                };
                                
                                fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': loggedin
                                    },
                                    body: JSON.stringify(payments)
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    //log
                                    const url = `${import.meta.env.VITE_BASE_URL}/hotel/session_id/${sessionID}`;
                                    const payload = {
                                        page_name: "Order Placed"
                                    }
                                    
                                    fetch(url, {
                                        method: 'POST',
                                        headers: {
                                        'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(payload)
                                    }).catch((error) => console.log(error));
                                    //log

                                    navtotrack(data.response.data);
                                })

                            },
                            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                                "name": `${profile.first_name} ${profile.last_name}`, //your customer's name
                                "email": profile.email_address,
                                "contact": profile.phone_number //Provide the customer's phone number for better conversion rates 
                            },
                            // "notes": {
                            //     "address": "Razorpay Corporate Office"
                            // },
                            "theme": {
                                "color": "#7427F5"
                            }
                        };

                        const rzp1 = new Razorpay(options);
                        rzp1.open();
                        setloading(false);

                    })

                })
            };

        }
    },[roomnumber])

    useEffect(() => {
        window.scrollTo(0,0);

        if(loggedin && Usercart && Usercart._id && deliveryaddress && deliveryaddress.tagged_user_id) {
            const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/cart/${Usercart._id}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loggedin
                }
            })
            .then(response => response.json())
            .then(data => {

                //log
                const url = `${import.meta.env.VITE_BASE_URL}/hotel/session_id/${sessionID}`;
                const payload = {
                    page_name: `Cart Page - ${data.response.data.food_items ? data.response.data.food_items.length : "No"} Items Found`
                }
                
                fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                }).catch((error) => console.log(error));
                //log

                if(data.response.data.food_items && data.response.data.food_items.length > 0) {

                    const createdcart = data.response.data;
                    Dispatch(cartId(createdcart));

                    const availablepayload = {...actualpayload,
                        cart_data: {...actualpayload.cart_data,
                            extra_charges: createdcart.extra_charges,
                            food_items: createdcart.food_items
                        }
                    }
                    Dispatch(addItem(availablepayload));

                    const url = `${import.meta.env.VITE_BASE_URL}/hotel/delivery-quotes`;
                    const payload = {
                        merchant_id: Usercart.merchant_id,
                        user_address_id: deliveryaddress.tagged_user_id
                    }
        
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': loggedin
                        },
                        body: JSON.stringify(payload)
                    })
                    .then(response => response.json())
                    .then(data => setdeliveryquote(data.response.data[0]))
                    
                }else{
                    const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/cart/${Usercart._id}`

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
                        setloading(false);
                    })
                }
            })
        }else{
            setloading(false);
        }

    },[])

    useEffect(() => {
        if(actualpayload.hasOwnProperty("cart_data") && actualpayload.cart_data.food_items && actualpayload.cart_data.food_items.length > 0) {

            if(loggedin && deliveryquote) {
                const url = Usercart && Usercart._id
                ? `${import.meta.env.VITE_BASE_URL}/app/user/food-order/cart/${Usercart._id}`
                : `${import.meta.env.VITE_BASE_URL}/app/user/food-order/cart`;

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
                    setloading(false);

                    const deliveryprice = +(deliveryquote.estimated_fare - createdcart.available_delivery_discount).toFixed(2);

                    if(deliveryprice > 0) {
                        const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/cart/${createdcart._id}`;

                        const payload = {
                            cart_data: { ...createdcart,
                                delivery_charges: deliveryprice,
                                // delivery_address: deliveryaddress,
                                // user_address_id: deliveryaddress.tagged_user_id
                            }
                        };

                        fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': loggedin
                            },
                            body: JSON.stringify(payload)
                        })
                        .then(response => response.json())
                        .then(data => {
                            const createdcart = data.response.data;
                            Dispatch(cartId(createdcart));
                        })
                    }
                })
                .then(() => {

                    //log
                    const url = `${import.meta.env.VITE_BASE_URL}/hotel/food-order/requests/logs`;
                    const payload = {
                        merchant_id: Usercart.merchant_id,
                        hotel_merchant_id: deliveryaddress._id,
                        meta_data: {
                          cart: Usercart,
                          distance: deliveryquote.distance,
                          delivery_charges: deliveryquote.estimated_fare
                        },
                        user_address_id: deliveryaddress.tagged_user_id,
                        phone_number: profile.phone_number
                    }
                    
                    fetch(url, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload)
                    }).catch((error) => console.log(error));
                    //log
                })
            }

        }else{
            if(Usercart && Usercart._id) {
                const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/cart/${Usercart._id}`
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
                    setloading(false);
                })
            }
        }
    },[actualpayload, deliveryquote])

    const removecoupon = () => {
        const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/cart/${Usercart._id}`;
        const payload = {cart_data: { ...Usercart, promo_used: {} }}

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userdata.token
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            const createdcart = data.response.data;
            Dispatch(cartId(createdcart));
        })
    };

    if(loading) {
        return(<Uniloader/>)
    };
    
    return(<Cartpagedata.Provider value={{fooditemdata}}>
        <>{Usercart && Usercart.food_items && Usercart.food_items.length > 0
            ?<div className='cartpage'>
                <div className='cartheader' id='cartheader'>
                    <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                    <h3 className='cheadertext'>{Usercart.merchant_details.name}</h3>
                </div>
                <div className='cartheaderbottom' id='cartheaderbottom'>
                    <div className='tsavingscontainer'>
                        <img className='tsavingsiconh' src={offer} alt="offer"/>
                        <p className='tsavingstexth'>You've <strong>{`saved ₹${Math.round(itemdiscount + deliverydiscount + (Usercart.promo_used && Usercart.promo_used.value || 0))}`}</strong> on this order!</p>
                    </div>
                </div>

                <div className='tsbackground'>
                    <div className='topspikecontainer'>
                        <div className='topspikeholder'></div>
                    </div>
                    <h1 className='chsavings'>TOTAL SAVINGS</h1>
                    <div className='tsavingsholder' id='tsavingsholder'>
                        <div className='tsvisiblepart' onClick={() => openclose('tsavingsholder', 'tsrightbutton')}>
                            <div className='tsavingscontainer'>
                                <img className='tsavingsicon' src={offer} alt="offer"/>
                                <p className='tsavingstext'>You've <strong>{`saved ₹${Math.round( itemdiscount + deliverydiscount + (Usercart.promo_used && Usercart.promo_used.value || 0) )}`}</strong> on this order!</p>
                            </div>
                            <img className='rightbutton' id='tsrightbutton' src={rightgreen} alt=">"/>
                        </div>
                        <div>
                            <hr className='tsdivider'/>
                            <div className='tsavingschild'>
                                <img className='tsavingssmallicon' src={food} alt="food" />
                                <p className='tsavsstext'><strong>{`Saved ₹${Math.round(itemdiscount)}`}</strong> on food</p>
                            </div>
                            <div className='tsavingschild'>
                                <img className='tsavingssmallicon' src={delivery} alt="delivery" />
                                <p className='tsavsstext'><strong>{`Saved ₹${Math.round(deliverydiscount)}`}</strong> on delivery</p>
                            </div>
                            {Usercart.promo_used && Usercart.promo_used.value &&
                                <div className='tsavingschild'>
                                    <img className='tsavingssmallicon' src={coupon} alt="delivery" />
                                    <p className='tsavsstext'><strong>{`Saved ₹${Math.round(Usercart.promo_used.value)}`}</strong> with a coupon</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='bottomspikecontainer'>
                        <div className='bottomspikeholder'></div>
                    </div>
                </div>

                <h1 className='cartheadings'>CART ITEMS</h1>
                <div className='citemsholder'>
                    {Usercart.food_items.map((eachfooditem:any, index:number) => (
                        <div className='citem' key={`${eachfooditem.name}_${index}`}>
                            <div className='citemnameholder'>
                                <img className="cvegstatus" src={
                                    eachfooditem.original_food_item.veg_status == "veg" ? veg :
                                    eachfooditem.original_food_item.veg_status == "egg" ? egg : non_veg
                                } alt="Veg Status" />
                                <div className='citemnamecontainer'>
                                    <p className='citemname'>{eachfooditem.name}</p>
                                    <p className="caddonsname">{
                                        eachfooditem.variant_group[0]
                                        ? eachfooditem.variant_group.map((eachvarient:any)=>(eachvarient.title)).join(", ")
                                        : eachfooditem.customisation_steps[0]
                                        ? eachfooditem.customisation_steps.map((eachoption:any)=>(eachoption.option_name)).join(", ")
                                        : null
                                    }</p>
                                    {(eachfooditem.original_food_item.customisation_steps.length || eachfooditem.original_food_item.addon_group.length || eachfooditem.original_food_item.variant_group.length) > 0 &&
                                        <p className="ccustomizebtn" onClick={ () => generateData(eachfooditem) }>
                                            Customize <span>&gt;</span>
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className='cqtnbtnholder'>
                                <button className="caddedbutton">
                                    <p className='caddsub' onClick={() => pushtocart({...eachfooditem, quantity:-1})}>-</p>
                                    <p>{eachfooditem.quantity}</p>
                                    <p className='caddsub' onClick={() => pushtocart({...eachfooditem, quantity:1})}>+</p>
                                </button>
                                <div className='cpriceholder'>
                                    {eachfooditem.delivery_discount > 0
                                        ? <>
                                            <p className='citemprice'>{`₹${Math.round(eachfooditem.total)}`}</p>
                                            <p className='cdisplayprice'>{`₹${Math.round(eachfooditem.total - eachfooditem.delivery_discount)}`}</p>
                                        </>
                                        : <p className='cdisplayprice'>{`₹${Math.round(eachfooditem.total)}`}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='cartholders'>
                    <div className='caddmorecontainer' onClick={navtorestaurant}>
                        <div className='caddmore'>
                            <img className='cartsideicons' src={addmore} alt="offer"/>
                            <p className='caddmoretext'>Add more items</p>
                        </div>
                        <img className='crightbutton' src={right} alt=">"/>
                    </div>
                    <hr className='cartholderdividers'/>
                    <div className='caddmorecontainer' onClick={() => navigate('instructions')}>
                        <div className='caddmore'>
                            <img className='cartsideicons' src={addnote} alt="offer"/>
                            <div className='cookingholder'>{cookinginstructions == ""
                                ? <p className='caddmoretext'>Add cooking instructions</p>
                                : <>
                                    <p className='cookingheading'>Cooking Instructions</p>
                                    <p className='cookingtext'>{cookinginstructions}</p>
                                </>
                            }</div>
                        </div>
                        <img className='crightbutton' src={right} alt=">"/>
                    </div>
                </div>

                <h1 className='cartheadings'>COUPONS</h1>
                {Usercart.promo_used && Usercart.promo_used.value
                    ?<div className='cartholders'>
                        <div className='caddmorecontainer'>
                            <div className='caddmore'>
                                <img className='tsavingsicon' src={tick} alt="done"/>
                                <p className='ccoupontext'><strong>₹{Usercart.promo_used.value} Coupon Savings</strong></p>
                            </div>
                            <p className='ccouponremove' onClick={removecoupon}>remove</p>
                        </div>
                    </div>
                    :<div className='cartholders' onClick={() => navigate('coupons')}>
                        <div className='caddmorecontainer'>
                            <div className='caddmore'>
                                <img className='tsavingsicon' src={applycoupon} alt="offer"/>
                                <p className='ccoupontext'>Apply Coupon</p>
                            </div>
                            <img className='crightbutton' src={right} alt=">"/>
                        </div>
                    </div>
                }
                
                <h1 className='cartheadings'>BILL DETAILS</h1>
                <div className='cartholders'>
                    <div className='cbdcontainer'>
                        <p className='cbdtextl'>Item Total</p>
                        <p className='cbdtextr'>₹{Usercart.total_item_total.toFixed(2)}</p>
                    </div>
                    {Usercart.delivery_discount > 0 &&
                        <div className='cbdcontainer'>
                            <p className='cbdtextl'>Item Discount</p>
                            <p className='cbdtextr'>- ₹{Usercart.delivery_discount.toFixed(2)}</p>
                        </div>
                    }
                    <div className='cbdcontainer'>
                        <p className='cbdtextl'>Sub Total</p>
                        <p className='cbdtextr'>₹{(Usercart.total_item_total - Usercart.delivery_discount).toFixed(2)}</p>
                    </div>
                    <div className='cbdcontainer'>
                        <p className='cbdtextlclick' onTouchStart={() => openclosepop("tandcpop")}>Taxes and Charges</p>

                        <div className='tandcoverlay' id='tandcpop_overlay' onTouchStart={() => openclosepop("tandcpop")}></div>
                        <div className='tandcpop' id='tandcpop'>
                            <p className='tandcheading'>Taxes and Charges</p>
                            <div className='tandctextholder'>
                                <p>Packaging Charges</p>
                                <p>₹{Usercart.total_packing_charges.toFixed(2)}</p>
                            </div>
                            <div className='tandctextholder'>
                                <p>Service Fee</p>
                                <p>₹{Usercart.total_extra_charges.toFixed(2)}</p>
                            </div>
                            <div className='tandctextholder'>
                                <p>GST</p>
                                <p>₹{Usercart.total_taxes.toFixed(2)}</p>
                            </div>
                            <div className='tandctextholderl'>
                                <p>Total</p>
                                <p>₹{(Usercart.total_extra_charges + Usercart.total_packing_charges + Usercart.total_taxes).toFixed(2)}</p>
                            </div>
                        </div>

                        <p className='cbdtextr'>₹{(Usercart.total_extra_charges + Usercart.total_packing_charges + Usercart.total_taxes).toFixed(2)}</p>
                    </div>
                    <div className='cbdcontainer'>
                        <p className='cbdtextl'>Delivery Charges</p>
                        <div className='cbddeliveryfee'>
                            {Usercart.available_delivery_discount && deliveryquote
                                ? (deliveryquote.estimated_fare - Usercart.available_delivery_discount) > 0
                                    ? <>
                                        <p className='cbdtextrscratch'>₹{deliveryquote.estimated_fare}</p>
                                        <p className='cbdtextr'>₹{(deliveryquote.estimated_fare - Usercart.available_delivery_discount).toFixed(2)}</p>
                                    </>
                                    : <>
                                        <p className='cbdtextrscratch'>₹{deliveryquote.estimated_fare}</p>
                                        <p className='cbdfree'>FREE</p>
                                    </>
                                : deliveryquote && <p className='cbdtextr'>₹{deliveryquote.estimated_fare}</p>
                            }
                        </div>
                    </div>
                    {Usercart.promo_used && Usercart.promo_used.value &&
                        <div className='cbdcontainer'>
                            <p className='cbdtextl'>Coupon Discount</p>
                            <p className='cbdtextr'>- ₹{Usercart.promo_used.value}</p>
                        </div>
                    }
                    <hr className='cartholderdividersnm'/>
                    <div className='cbdcontainerlast'>
                        <p className='cbdtextlarge'>Grand Total</p>
                        <p className='cbdtextlarge'>₹{Usercart.total.toFixed(2)}</p>
                    </div>
                </div>

                <h1 className='cartheadings'>CANCELLATION POLICY</h1>
                <div className='cartholderlast'>
                    <p className='cptext'><span>Note: </span>Join us in cutting down food waste by avoiding cancellations after placing your order.</p>
                    <p className='cptextb'>To support these actions, a 100% cancellation fee is applied. We appreciate your support in promoting sustainability.</p>
                </div>


                <div className='cartfooter'>
                    <div className='cartaddress'>
                        <img className='calogo' src={address} alt="drop"/>
                        <div className='cartaddressholder'>
                            <p className='caddressname'>Delivery at <span>{deliveryaddress.name}</span></p>
                            <p className='cfulladdress'>{deliveryaddress.full_address}</p>
                        </div>
                    </div>
                    <hr className='cfdivider'/>

                    <div className='cartpay'>
                        <div>
                            <p className='cpaytext'>Amount to Pay</p>
                            <p className='cpayamount'>₹{Usercart.total.toFixed(2)}</p>
                        </div>
                        <button className='cartpaybutton' onClick={() => navigate("userdetails")}>Proceed to Pay</button>
                    </div>
                </div>

                {Usercart.promo_used && Usercart.promo_used.value && visible &&
                    <div className='caaniholder'>
                        <Couponappliedpopup/>
                        <div className='caanipopup'>
                            <img className='caaniimage' src={tick} alt="correct"/>
                            <p className='caaniapplied'>"{Usercart.promo_used.coupon_code}" applied</p>
                            <p className='caanisavings'>You saved ₹{Usercart.promo_used.value} with this coupon</p>
                        </div>
                    </div>
                }

                <Outlet/>
            </div>
            :<div className="nrholder">
                <img src={emptycart} alt="!" width={192}/>
                <h6 className="nrmessage">Your cart is empty :&#40;</h6>
                <div className='rcbtnholder'>
                <button className='getotpbutton' onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        }</>
    </Cartpagedata.Provider>)
}
export default Cartpage;