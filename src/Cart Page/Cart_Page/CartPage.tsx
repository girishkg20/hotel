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
// import { addItem } from '../../Menu Page/CartSlice';
import { cartId, clearCartId } from '../../Menu Page/CartidSlice';
import { addItem, clearItem } from '../../Menu Page/CartSlice';
import Cartpagedata from '../Cart_Page_Data/CartPageData';






const Cartpage = () => {

    const [deliveryquote, setdeliveryquote] = useState<any>();
    const [itemdiscount, setitemdiscount] = useState<any>();
    const [deliverydiscount, setdeliverydiscount] = useState<any>();
    const [header, setheader] = useState <HTMLDivElement | null>();
    const [bheader, setbheader] = useState <HTMLDivElement | null>();
    const [fooditemdata, setfooditemdata] = useState<any>();
    // const [custitem, setcustitem] = useState<any>();

    const navigate = useNavigate();
    const Dispatch = useDispatch();
    document.body.style.overflow = "scroll";

    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    const deliveryaddress = useSelector((state:any) => state.perReducers.saveaddress.value);
    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);

    const loggedin = userdata.token;

    useEffect(() => {
        setheader(document.getElementById("cartheader") as HTMLDivElement | null);
        setbheader(document.getElementById("cartheaderbottom") as HTMLDivElement | null);

        window.addEventListener('scroll', fixheader)
        return () => {
            window.removeEventListener('scroll', fixheader);
        };
    },[header,bheader])

    useEffect(() => {
        if(deliveryquote && Usercart) {

            setitemdiscount(Usercart.delivery_discount);
            const deldiscount = deliveryquote.data[0].estimated_fare - Usercart.available_delivery_discount;
        
            if(deldiscount < 0) {
                setdeliverydiscount(deliveryquote.data[0].estimated_fare);
            }else{
                setdeliverydiscount(deldiscount);
            }

        }
    },[deliveryquote, Usercart])

    console.log(Usercart);
    console.log(deliveryquote);

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
            if (window.scrollY > 65) {
                bheader!.style.display = 'flex';
            }else{
                bheader!.style.display = 'none';
            }
        }
    }

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
        console.log("cart", actualpayload);

    };

    const generateData = (fooditem:any) => {
        setfooditemdata(fooditem);
        navigate("customization");
    };

    useEffect(() => {
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
    
    useEffect(() => {

        if(loggedin && Usercart && Usercart.merchant_id && deliveryaddress && deliveryaddress._id) {

            const url = "https://prod-server.tipplr.in/hotel/delivery-quotes";
            const payload = {
                merchant_id: Usercart.merchant_id,
                user_address_id: deliveryaddress._id
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
            .then(data => setdeliveryquote(data.response))
        }
    },[])
    



    return(<Cartpagedata.Provider value={{fooditemdata}}>
        <>{Usercart ? <div className='cartpage'>
            <div className='cartheader' id='cartheader'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='cheadertext'>{Usercart.merchant_details.name}</h3>
            </div>
            <div className='cartheaderbottom' id='cartheaderbottom'>
                <div className='tsavingscontainer'>
                    <img className='tsavingsiconh' src={offer} alt="offer"/>
                    <p className='tsavingstexth'>You've <strong>{`saved ₹${Math.round(itemdiscount + deliverydiscount)}`}</strong> on this order!</p>
                </div>
            </div>

            <h1 className='cartheadings'>SAVINGS</h1>
            <div className='tsavingsholder' id='tsavingsholder'>
                <div className='tsvisiblepart' onClick={() => openclose('tsavingsholder', 'tsrightbutton')}>
                    <div className='tsavingscontainer'>
                        <img className='tsavingsicon' src={offer} alt="offer"/>
                        <p className='tsavingstext'>You've <strong>{`saved ₹${Math.round(itemdiscount + deliverydiscount)}`}</strong> on this order!</p>
                    </div>
                    <img className='rightbutton' id='tsrightbutton' src={rightgreen} alt=">"/>
                </div>
                <div>
                    <hr className='tsdivider'/>
                    <div className='tsavingschild'>
                        <img className='tsavingsicon' src={food} alt="food" />
                        <p className='tsavingstext'><strong>{`Saved ₹${Math.round(itemdiscount)}`}</strong> on food</p>
                    </div>
                    <div className='tsavingschild'>
                        <img className='tsavingsicon' src={delivery} alt="delivery" />
                        <p className='tsavingstext'><strong>{`Saved ₹${Math.round(deliverydiscount)}`}</strong> on delivery</p>
                    </div>
                    <div className='tsavingschild'>
                        <img className='tsavingsicon' src={coupon} alt="delivery" />
                        <p className='tsavingstext'><strong>{`Saved ₹${Math.round(deliverydiscount)}`}</strong> with a coupon</p>
                    </div>
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
                                <p className='citemprice'>{`₹${Math.round(eachfooditem.total)}`}</p>
                                <p className='cdisplayprice'>{`₹${Math.round(eachfooditem.total - eachfooditem.delivery_discount)}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='cartholders'>
                <div className='caddmorecontainer'>
                    <div className='caddmore'>
                        <img className='tsavingsicon' src={addmore} alt="offer"/>
                        <p className='caddmoretext'>Add more items</p>
                    </div>
                    <img className='crightbutton' src={right} alt=">"/>
                </div>
                <hr className='cartholderdividers'/>
                <div className='caddmorecontainer'>
                    <div className='caddmore'>
                        <img className='tsavingsicon' src={addnote} alt="offer"/>
                        <p className='caddmoretext'>Add cooking instructions</p>
                    </div>
                    <img className='crightbutton' src={right} alt=">"/>
                </div>
            </div>

            <h1 className='cartheadings'>COUPONS</h1>
            <div className='cartholders'>
                <div className='caddmorecontainer'>
                    <div className='caddmore'>
                        <img className='tsavingsicon' src={applycoupon} alt="offer"/>
                        <p className='caddmoretext'><strong>Apply Coupon</strong></p>
                    </div>
                    <img className='crightbutton' src={right} alt=">"/>
                </div>
            </div>
            
            <Outlet/>
        </div>:null}</>
    </Cartpagedata.Provider>)
}
export default Cartpage;