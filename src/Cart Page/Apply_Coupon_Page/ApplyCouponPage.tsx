import './ApplyCouponPage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import close from './Source/close.png'
import { cartId } from '../../Menu Page/CartidSlice';



const Applycouponpage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    document.body.style.overflow = "hidden";
    
    const [coupons, setcoupons] = useState<any>([]);
    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const Usercart = useSelector((state:any) => state.perReducers.cartId.value);
    
    useEffect(() => {
        const mobile_number = userdata.phone_number;
        const url = `https://prod-server.tipplr.in/hotel/user/public-coupon-code?coupon_type=public&phone_number=${mobile_number}`
        fetch(url)
            .then(response => response.json())
            .then(data => setcoupons(data.response.data))
    },[])

    const unixtodate = (unix:any) => {

        const date = new Intl.DateTimeFormat(
            'en-GB', { day: '2-digit', month: 'short', year: 'numeric' }
        ).format(unix*1000);

        return date;
    }

    const applycoupon = (couponcode:any, minvalue:any) => {

        const subtotal = Usercart.total_item_total - Usercart.delivery_discount;

        if(subtotal >= minvalue) {
            const url = 'https://prod-server.tipplr.in/hotel/user/coupon-code/check';
            const payload = {
                coupon_code: couponcode,
                claim_type: "food_delivery",
                total_amount: Usercart.total_item_total - Usercart.delivery_discount
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userdata.token
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                const coupondata = data.response.data;
            
                const url = `https://prod-server.tipplr.in/app/user/food-order/cart/${Usercart._id}`;
                const payload = {cart_data: {...Usercart, promo_used: coupondata}}

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
                    dispatch(cartId(createdcart));
                    navigate(-1);
                })
            })
        }

    }
    


    return(<>
        <div className='custpopoverlay' onClick={() => navigate(-1)}></div>

        <div className="custpopover" style={{minHeight:"80%"}}>
            <div className="myAlert" id="myAlert"></div>

            <div className='acheader'>
                <p className="acheadertext">Coupons</p>
                <img className="acclosebtn" src={close} alt="Close" onClick={() => navigate(-1)}/>
            </div>

            <h1 className='couponheading'>EXCLUSIVE COUPONS</h1>

            {coupons.map((eachcoupon:any) => (
                <div className='accard' key={eachcoupon.coupon_code}
                    onClick={() => applycoupon(eachcoupon.coupon_code, eachcoupon.min_transaction_value)}
                    style={
                        eachcoupon.min_transaction_value > (Usercart.total_item_total - Usercart.delivery_discount)
                        ? {filter:'grayscale(1)'}
                        : {filter:'none'}
                    }>
                    <p className='aclpart'>₹{eachcoupon.value} OFF</p>

                    <div className='acrpart'>  
                        <div className='accodeholder'>
                            <p className='accode'><code>{eachcoupon.coupon_code}</code></p>
                            <p className='tapac'>TAP TO APPLY COUPON</p>
                        </div>
                        <p className='achtext'>Save an additional ₹{eachcoupon.value} discount on orders above ₹{eachcoupon.min_transaction_value}</p>
                    </div>

                    <p className='aclastpart'>Expires on {unixtodate(eachcoupon.validity_end_date)}</p>
                </div>
            ))}
        </div>
    </>)
}
export default Applycouponpage;
