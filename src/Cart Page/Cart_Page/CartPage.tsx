import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import backbutton from './Source/back.png';
import offer from './Source/offer.png';
import { useEffect, useState } from 'react';





const Cartpage = () => {

    const [deliveryquote, setdeliveryquote] = useState<any>();
    const [itemdiscount, setitemdiscount] = useState<any>();
    const [deliverydiscount, setdeliverydiscount] = useState<any>();

    const navigate = useNavigate();

    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    const deliveryaddress = useSelector((state:any) => state.perReducers.saveaddress.value);
    const userdata = useSelector((state:any) => state.perReducers.auth.value);

    const loggedin = userdata.token;

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
        
        <div className='cartheader'>
            <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
            <h3 className='cheadertext'>{Usercart.merchant_details.name}</h3>
        </div>
        <div className='tsavingsholder'>
            <img className='tsavingsicon' src={offer} alt="offer"/>
            <p className='tsavingstext'>{`₹ ${itemdiscount + deliverydiscount} saved on this order`}</p>
        </div>
        <p className='tsavingstext'>{`₹ ${itemdiscount} saved on food`}</p>
        <p className='tsavingstext'>{`₹ ${deliverydiscount} saved on delivery`}</p>
        
    </div>)
}
export default Cartpage;