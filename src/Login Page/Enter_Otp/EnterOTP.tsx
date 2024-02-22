import { useEffect, useState } from 'react';
import './EnterOTP.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { auth } from './AuthSlice';


const Enterotp = () => {

    const [timer, settimer] = useState<any>(30);
    const [otp, setotp] = useState('');
    const [token, settoken] = useState();
    const [invalidotperror, setinvalidotperror] = useState<any>();
    const [resendotp, setresendotp] = useState<boolean>(false);

    const navigate = useNavigate();
    const Dispatch = useDispatch();
    const MobileNumber = useSelector((state: any) => state.mobileNumber.value)

    let starttime = 29;
    let startinterval: any;
    const starttimer = () => {

        if (starttime >= 0){
            const runtime = starttime--
            const formattedruntime = runtime < 10 ? `0${runtime}` : runtime;
            settimer(formattedruntime);
        }else{
            clearInterval(startinterval);
        }

    };
    
    useEffect(() => {
        startinterval = setInterval(starttimer, 1000);

        return () => {
            clearInterval(startinterval);
        };
    },[resendotp === true]);



///////////////////OTP BOXES
    
    const otpBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.otpbox');

    otpBoxes.forEach((box, index) => {
        //handle input
        box.addEventListener('input', (e:any) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            const value = e.target.value;

            setotp(otpBoxes[0].value + otpBoxes[1].value + otpBoxes[2].value + otpBoxes[3].value)

            if (value.length === 1 && index < otpBoxes.length - 1) {
            otpBoxes[index + 1].focus();
            }
        });

        //handle backspace
        box.addEventListener('keydown', (e:any) => {
            
            if (e.key === 'Backspace' && index > 0 && !box.value) {
                otpBoxes[index - 1].value = '';
                otpBoxes[index - 1].focus();
                setotp(otpBoxes[0].value + otpBoxes[1].value + otpBoxes[2].value + otpBoxes[3].value)
            }

        });

        // Handle pasting
        box.addEventListener('paste', (e:any) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').trim();
            for (let i = 0; i < otpBoxes.length; i++) {
                otpBoxes[i].value = '';
            }
            for (let i = 0; i < pastedData.length; i++) {
                if (i + index < otpBoxes.length) {
                    otpBoxes[i + index].value = pastedData[i];
                }
            }

            if (index + pastedData.length < otpBoxes.length) {
            otpBoxes[index + pastedData.length].focus();
            } else {
            otpBoxes[otpBoxes.length - 1].focus(); // Focus on the last box
            }

            setotp(otpBoxes[0].value + otpBoxes[1].value + otpBoxes[2].value + otpBoxes[3].value);
            
        });

        //handle select
        box.addEventListener('focus', (e:any) => {
            otpBoxes[index].select();
        });

        //handle errormessage
        box.oninput = () => {
            if (otp.length >= 4) {
                setinvalidotperror(null)
            };
        }

    });

    const otpError = () => {
        if(otp.length < 4) {
            setinvalidotperror("Kindly enter a 4-digit OTP")
        }else{
            setinvalidotperror(null)
        }
    }
    
////////////////////////OTP BOXES

    const getOTP = () => {
        const url = "https://prod-server.tipplr.in/hotel/login";
        const payload = {"phone_number": MobileNumber}

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => settoken(data.response.token))
    }

    useEffect(() => {
        getOTP();
    },[]);

    const resendOTP = () => {
        getOTP();
        settimer(30);
        setresendotp(true);
    };

/////////////////////////////////////// Verify User //////////////////////

    const verifyUser = () => {
        const url = "https://prod-server.tipplr.in/hotel/verify";
        const payload = {
            "token": token,
            "otp": otp
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {

            if (data.status.code != 200) {
                setinvalidotperror("OTP entered is incorrect")
            }else{
                Dispatch(auth(data.response.data))
                navigate(-2);
            }

        })
    }



    return(<>
        <div className="otppopover">
            <p className="loginwelmsg">Enter 4 digit OTP</p>

            <div className="otpboxholder">
                <input className="otpbox" type="tel" maxLength={1} autoFocus/>
                <input className="otpbox" type="tel" maxLength={1}/>
                <input className="otpbox" type="tel" maxLength={1}/>
                <input className="otpbox" type="tel" maxLength={1}/>
            </div>
            <p className='otperror'>{invalidotperror}</p> {/*OTP entered is incorrect*/}

            <div className='otpmsgbox'>
                <p className='otpmsg'>OTP has been sent to <strong>{MobileNumber}</strong></p>
                <button className='phedit' onClick={() => navigate(-1)}>Edit</button>
            </div>

            <p className='otpnrmsg'>Havent received your OTP yet?</p>
            {timer > 0 ?
                <p className='otptimer'>Wait 00:{`${timer}`}</p> : null
            }
            {timer <= 0 ?
                <div className='resendotpbox'>
                    <button id='resendotpbtn' className='resendotpbtn' onClick={resendOTP}>Resend OTP</button>
                </div> : null
            }

            <button className='otpcontbutton' disabled={otp.length < 4 ? true : false} onClick={verifyUser} onTouchStart={otpError}>Continue</button>
        </div>
    </>)
}
export default Enterotp;