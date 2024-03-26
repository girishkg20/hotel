import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import backbutton from "./Source/back.png";
import right from "./Source/right.png";
import order from "./Source/orders.png";
import coupon from "./Source/coupon.png";
import support from "./Source/support.png";
import faq from "./Source/faqs.png";
import term from "./Source/tandc.png";
import privacy from "./Source/privacy_policy.png";
import payment from "./Source/payment_policy.png";
import about from "./Source/about.png";

import { profiledata, clearprofiledata } from "../ProfileSlice";

import { clearselectvegfilter } from "../../Menu Page/VegfilterSlice";
import { clearsaveaddress } from "../../Home Page/Home_Page_API/UserAddressSlice";
import { clearmobileNumber } from "../../Login Page/Enter_Ph_No/PhNoSlice";
import { clearauth } from "../../Login Page/Enter_Otp/AuthSlice";
import { clearItem } from "../../Menu Page/CartSlice";
import { clearCartId } from "../../Menu Page/CartidSlice";
import { clearfoodinstruction } from "../../Cart Page/FoodInstructionSlice";
import { clearsessionid } from "../../Home Page/Home_Page_API/SessionIdSlice";
import { clearmerchantsData } from "../../Home Page/Home_Page_API/MerchantsdataSlice";
import { clearsearchdatapositions } from "../../Search Page/SearchDataSlice";












const Profilepage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector((state:any) => state.perReducers.auth.value);
    const loggedin = auth.token;

    useEffect(() => {
        if(!loggedin) {
            const url = location.pathname.replace('profile', 'auth/login');
            navigate(url, {replace: true});
        }
    },[])

    const profile = useSelector((state:any) => state.perReducers.profiledata.value);
    
    const [header, setHeader] = useState <HTMLDivElement | null>();
    const [headertext, setHeadertext] = useState <HTMLHeadingElement | null>();

    useEffect(() => {
        setHeader(document.getElementById("ppheader") as HTMLDivElement | null);
        setHeadertext(document.getElementById("ppheadertext") as HTMLHeadingElement | null);

        if (header && headertext) {
            window.addEventListener('scroll', fixheader)
            document.body.style.backgroundColor = '#F6F6F6';

            return () => {
                window.removeEventListener('scroll', fixheader);
                document.body.removeAttribute('style');
            }
        };

    },[header]);

    const fixheader = () => {

        if (window.scrollY > 55) {
            header!.classList.add('fixed')
            headertext!.style.display = "flex";
        }else{
            header!.classList.remove('fixed')
            headertext!.style.display = "none";
        }
        
    }

    useEffect(() => {

        if(loggedin) {
            window.scrollTo(0,0);
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
                dispatch(profiledata(data.response.data));
            })
        };

    },[])

    const logout = () => {
        dispatch(clearselectvegfilter());
        dispatch(clearsaveaddress());
        dispatch(clearmobileNumber());
        dispatch(clearauth());
        dispatch(clearItem());
        dispatch(clearCartId());
        dispatch(clearfoodinstruction());
        dispatch(clearsessionid());
        dispatch(clearmerchantsData());
        dispatch(clearsearchdatapositions());
        dispatch(clearprofiledata());

        const historylength = window.history.length - 2;
        navigate(-historylength);
    }




    return(<div className="ppbackground">

        <div className='ppheader' id='ppheader'>
            <div className='backtitle'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='headertext' id='ppheadertext'>Profile</h3>
            </div>
        </div>
    
        <div className="udetailsholder">
            {profile && profile.phone_number ? <>
                <p className="uname">{`${profile.first_name} ${profile.last_name}`}</p>
                <p className="uphnum">{`+91 ${profile.phone_number}`}</p>
            </>:<>
                <p className="uname">Loading...</p>
            </>}
        </div>

        <div className="profilecards">
            <p className="profilecardheading">My Account</p>

            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={order} alt="orders"/>
                    <p className="profilesubheadings">My Orders</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>

            <hr className="ppdivider"/>

            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={coupon} alt="coupons"/>
                    <p className="profilesubheadings">My Coupons</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>
        </div>

        <div className="profilecards">
            <p className="profilecardheading">Customer Support & FAQ</p>

            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={support} alt="support"/>
                    <p className="profilesubheadings">Customer Support</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>

            <hr className="ppdivider"/>

            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={faq} alt="faqs"/>
                    <p className="profilesubheadings">FAQs</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>
        </div>
        
        <div className="profilecards">
            <p className="profilecardheading">More</p>

            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={term} alt="terms"/>
                    <p className="profilesubheadings">Terms & Conditions</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>

            <hr className="ppdivider"/>
            
            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={privacy} alt="privacy"/>
                    <p className="profilesubheadings">Privacy Policy</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>

            <hr className="ppdivider"/>

            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={payment} alt="payment"/>
                    <p className="profilesubheadings">Payment Policy</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>

            <hr className="ppdivider"/>

            <div className="profileitemgroup">
                <div className="profileitemleft">
                    <img className="profileitemicon" src={about} alt="about"/>
                    <p className="profilesubheadings">About Tipplr</p>
                </div>
                <img className="profileitemright" src={right} alt=">"/>
            </div>

        </div>

        <div className="logoutholder" onClick={() => logout()}>
            <button className="logoutbtn">Log Out</button>
        </div>

    </div>)
}
export default Profilepage;