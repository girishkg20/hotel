import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import backbutton from './Source/back.png';
import offer from './Source/offer.png';
import right from './Source/right green.png';
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';






const Cartpage = () => {

    const [deliveryquote, setdeliveryquote] = useState<any>();
    const [itemdiscount, setitemdiscount] = useState<any>();
    const [deliverydiscount, setdeliverydiscount] = useState<any>();
    const [header, setheader] = useState <HTMLDivElement | null>();

    const navigate = useNavigate();

    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    const deliveryaddress = useSelector((state:any) => state.perReducers.saveaddress.value);
    const userdata = useSelector((state:any) => state.perReducers.auth.value);

    const loggedin = userdata.token;

    useEffect(() => {
        setheader(document.getElementById("cartheader") as HTMLDivElement | null);

        window.addEventListener('scroll', fixheader)
        return () => {
            window.removeEventListener('scroll', fixheader);
        };
    },[header])

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

        if (window.scrollY > 15) {
            header!.style.backgroundColor = 'white';
            header!.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)';
            // headertext!.style.display = "flex";
        }else{
            header!.style.backgroundColor = '#F6F6F6';
            header!.style.removeProperty('box-shadow');
            // header!.classList.remove('fixed')
            // headertext!.style.display = "none";
        }

        if (window.scrollY > 65) {
            header!.style.height = '74px';
        }else{
            header!.style.height = '40px';
        }
        
    }
    
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
    



    return(<div className='cartpage'>
        
        <div className='cartheader' id='cartheader'>
            <div className='cartheadertop'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='cheadertext'>{Usercart.merchant_details.name}</h3>
            </div>
            <div className='cartheaderbottom'>
                <div className='tsavingscontainer'>
                    <img className='tsavingsiconh' src={offer} alt="offer"/>
                    <p className='tsavingstexth'>You've <strong>{`saved ₹${Math.round(itemdiscount + deliverydiscount)}`}</strong> on this order!</p>
                </div>
            </div>
        </div>

        <h1 className='cartheadings'>SAVINGS</h1>
        <div className='tsavingsholder' id='tsavingsholder'>
            <div className='tsvisiblepart' onClick={() => openclose('tsavingsholder', 'tsrightbutton')}>
                <div className='tsavingscontainer'>
                    <img className='tsavingsicon' src={offer} alt="offer"/>
                    <p className='tsavingstext'>You've <strong>{`saved ₹${Math.round(itemdiscount + deliverydiscount)}`}</strong> on this order!</p>
                </div>
                <img className='rightbutton' id='tsrightbutton' src={right} alt=">"/>
            </div>
            <div>
                <hr className='tsdivider'/>
                <div className='tsavingschild'>
                    <img className='tsavingsicon' src={offer} alt="food" />
                    <p className='tsavingstext'><strong>{`Saved ₹${Math.round(itemdiscount)}`}</strong> on food</p>
                </div>
                <div className='tsavingschild'>
                    <img className='tsavingsicon' src={offer} alt="delivery" />
                    <p className='tsavingstext'><strong>{`Saved ₹${Math.round(deliverydiscount)}`}</strong> on delivery</p>
                </div>
            </div>
        </div>

        <h1 className='cartheadings'>CART ITEMS</h1>
        <div className='citemsholder'>
            {Usercart.food_items.map((eachfooditem:any) => (
                <div className='citem'>
                    <div className='citemnameholder'>
                        <img className="cvegstatus" src={
                            eachfooditem.original_food_item.veg_status == "veg" ? veg :
                            eachfooditem.original_food_item.veg_status == "egg" ? egg : non_veg
                        } alt="Veg Status" />
                        <p className='citemname'>{eachfooditem.name}</p>
                    </div>
                    <div className='cqtnbtnholder'>
                        <button className="caddedbutton">
                            <p className='caddsub' onClick={() => `pushtocart({...eachfooditem, quantity:-1})`}>-</p>
                            <p>{eachfooditem.quantity}</p>
                            <p className='caddsub' onClick={() => `pushtocart({...eachfooditem, quantity:1})`}>+</p>
                        </button>
                        <div className='cpriceholder'>
                            <p className='citemprice'>{`₹${Math.round(eachfooditem.total)}`}</p>
                            <p className='cdisplayprice'>{`₹${Math.round(eachfooditem.total - eachfooditem.delivery_discount)}`}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        
        
    </div>)
}
export default Cartpage;