import './PhNo.css'
import reset from "./Source/reset.png"
import prefixdivider from "./Source/right.png"
import { mobileNumber } from './PhNoSlice';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';



const Phno = () => {
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    const [resetbutton, setresetbutton] = useState<HTMLButtonElement | null>();
    const [enterednumber, setenterednumber] = useState<HTMLInputElement | null>();
    const [boxboarder, setboxboarder] = useState<HTMLFormElement | null>();
    const [invalidphnoerr, setinvalidphnoerr] = useState<any>();
    const [OTPbutton, setOTPbutton] = useState<HTMLButtonElement | null>();
    const [OTPbuttonstate, setOTPbuttonstate] =useState<boolean>(true);

    useEffect(() => {
        setresetbutton(document.getElementById("telrbtn") as HTMLButtonElement | null);
        setenterednumber(document.getElementById("numberbox") as HTMLInputElement | null);
        setboxboarder(document.getElementById("numberboxbar") as HTMLFormElement | null);
        setOTPbutton(document.getElementById("getotpbutton") as HTMLButtonElement | null);
    },[]);

    function valuecheck() {
        if (enterednumber) {
            const enteredvalue = enterednumber!.value.replace(/\D/g, '');
            enterednumber.value = enteredvalue;

            if (enteredvalue.length == 10) {
                setOTPbuttonstate(false);
                setinvalidphnoerr(null);
                Dispatch(mobileNumber(enteredvalue));
            } else {
                setOTPbuttonstate(true);
            }
            
            if (enteredvalue.length == 0) {
                resetbutton!.style.display = "none";
            } else {
                resetbutton!.style.display = "flex";
            }
        }
    };

    function boarderadd() {
    boxboarder!.style.border = "2px solid #7527F5";
    };

    function boarderremove() {
    boxboarder!.style.border = "1px solid #B2AEB9";
    };

    function clrbtn() {
        enterednumber!.focus();
        resetbutton!.style.display = "none";
        setinvalidphnoerr(null);
        setOTPbuttonstate(true);
    };

    const ipnerror = () => {
        if(enterednumber!.value.length < 10) {
            setinvalidphnoerr("Please Enter a valid 10-digit phone number")
        }else{
            setinvalidphnoerr(null)
        }
        OTPbutton?.removeEventListener('touchstart', ipnerror)
    }
    OTPbutton?.addEventListener('touchstart', ipnerror);

    const sendOTP = () => {
        const currentURL = window.location.pathname;
        const newurl = currentURL.replace(currentURL.split('/')[3], 'otp')
        
        navigate(newurl)

        // const url = "https://prod-server.tipplr.in/hotel/login";
        // const payload = {"phone_number": enterednumber?.value}

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload)
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        
    }


    return (<>
        <div className="loginpopover" id='loginpopover'>

            <p className='loginwelmsg'>Let's get you started</p>
            
            {invalidphnoerr && <p className='errormsgph'>{invalidphnoerr}</p>}

            <div className="numberboxholder">
                <form className="numberboxbar" id="numberboxbar">
                    <div className='telnoprefixholder'>
                        <p className="telnoprefix">+91</p>
                        <img className='prefixdivider' src={prefixdivider} alt="|" />
                    </div>
                    <input className="numberbox" id="numberbox" type="tel" maxLength={10} onFocus={boarderadd} onInput={valuecheck} onBlur={boarderremove} placeholder="Your Phone Number"/>
                    <button className="telrbtn" id="telrbtn" type="reset" onClick={clrbtn}>
                        <img className="resetlogo" src={reset} />
                    </button>
                </form>
            </div>

            <button id='getotpbutton' className='getotpbutton' disabled={OTPbuttonstate} onClick={sendOTP}>Get OTP</button>

            <p className='TandC'>By proceeding, I accept the<br/>
                <a href='https://tipplr.in/terms-conditions/' target="_blank"><b>Terms & Conditions</b></a> and&nbsp;
                <a href='https://tipplr.in/privacy-policy/' target='_blank'><b>Privacy Policy</b></a>
            </p>

        </div>
    </>);
}
export default Phno;