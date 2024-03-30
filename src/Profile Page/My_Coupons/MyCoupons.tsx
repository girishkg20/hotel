import "./MyCoupons.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import nocoupon from "./Source/nocoupon.png";
import backbutton from "./Source/back.png";







const Mycoupons = () => {

    const navigate = useNavigate();
    document.body.style.overflow = "hidden";
    
    const [coupons, setcoupons] = useState<any>();
    const userdata = useSelector((state:any) => state.perReducers.auth.value);

    const [header, setHeader] = useState <HTMLDivElement | null>();
    const [headertext, setHeadertext] = useState <HTMLHeadingElement | null>();
    const [newpage, setNewpage] = useState <HTMLDivElement>();

    useEffect(() => {

        setHeader(document.getElementById("pspheader") as HTMLDivElement | null);
        setHeadertext(document.getElementById("pspheadertext") as HTMLHeadingElement | null);
        setNewpage(document.getElementById("newpage") as HTMLDivElement);

        if (header && headertext && newpage) {
            newpage.addEventListener('scroll', fixheader)
            
            return () => {
                newpage.removeEventListener('scroll', fixheader);
            }
        };

    },[header]);

    const fixheader = () => {
        
        if (newpage!.scrollTop > 55) {
            header!.classList.add('fixed')
            headertext!.style.display = "flex";
        }else{
            header!.classList.remove('fixed')
            headertext!.style.display = "none";
        }
        
    }

    useEffect(() => {
        const mobile_number = userdata.phone_number;
        const url = `${import.meta.env.VITE_BASE_URL}/hotel/user/public-coupon-code?coupon_type=public&phone_number=${mobile_number}`;
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



    return(<div className="newpage" id="newpage" style={{backgroundColor: '#F6F6F6'}}>

        <div className='ppheader' id='pspheader'>
            <div className='backtitle'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='headertext' id='pspheadertext'>My Coupons</h3>
            </div>
        </div>
        
        {coupons && coupons.length > 0 ?
            <>
                <h1 className='couponheading'>EXCLUSIVE COUPONS</h1>

                {coupons.map((eachcoupon:any) => (
                    <div className='accard' key={eachcoupon.coupon_code}>
                        <p className='aclpart'>₹{eachcoupon.value} OFF</p>

                        <div className='acrpart'>  
                            <div className='accodeholder'>
                                <p className='accode'><code>{eachcoupon.coupon_code}</code></p>
                            </div>
                            <p className='achtext'>Save an additional ₹{eachcoupon.value} discount on orders above ₹{eachcoupon.min_transaction_value}</p>
                        </div>

                        <p className='aclastpart'>Expires on {unixtodate(eachcoupon.validity_end_date)}</p>
                    </div>
                ))}
            </> : coupons &&
            <>
                <div className="acncholder">
                    <img src={nocoupon} alt="!" width={192}/>
                    <h6 className="nrmessage">Unfortunately, no coupons were found :&#40;</h6>
                    <div className='rcbtnholder'>
                        <button className='getotpbutton' onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </>
        }
    
    </div>)
}
export default Mycoupons;