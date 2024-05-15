import './LogoutPopup.css';
import close from './Source/close.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearprofiledata } from "../ProfileSlice";
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
import { clearroomnumber } from '../../Cart Page/RoomnumberSlice';



const Logoutpopup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    document.body.style.overflow = "hidden";

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
        dispatch(clearroomnumber());

        const historylength = window.history.length - 2;
        navigate(-historylength);
    }



    return(<>

        <div className='popoverlay' onClick={() => navigate(-1)}></div>

        <div className='popup'>
            <img className="clrcartclosebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            <h6 className='popupheading'>Log Out ?</h6>
            <p className='popupdescription'>Are you sure you want to log out ?</p>
            <div className='twobuttons'>
                <button className='nobutton' onClick={() => navigate(-1)}>No</button>
                <button className='resetbutton' onClick={logout}>Log Out</button>
            </div>
        </div>
    
    </>)
}
export default Logoutpopup;