import { useEffect, useState } from 'react';
import './EnterOTP.css';
import { useNavigate } from 'react-router-dom';

const Enterotp = () => {

    const [timer, settimer] = useState(30);
    const [otp, setotp] = useState('');
    const [invalidotperror, setinvalidotperror] = useState(null);
    const navigate = useNavigate();

    let starttime = 29;
    let startinterval;
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
    },[]);



///////////////////OTP BOXES
    
    const otpBoxes = document.querySelectorAll('.otpbox');

    otpBoxes.forEach((box, index) => {
        //handle input
        box.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            const value = e.target.value;

            setotp(otpBoxes[0].value + otpBoxes[1].value + otpBoxes[2].value + otpBoxes[3].value)

            if (value.length === 1 && index < otpBoxes.length - 1) {
            otpBoxes[index + 1].focus();
            }
        });

        //handle backspace
        box.addEventListener('keydown', (e) => {
            setotp(otpBoxes[0].value + otpBoxes[1].value + otpBoxes[2].value + otpBoxes[3].value)

            if (e.key === 'Backspace' && index > 0 && !box.value) {
                otpBoxes[index - 1].value = '';
                otpBoxes[index - 1].focus();
            }
        });

        // Handle pasting
        box.addEventListener('paste', (e) => {
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
        box.addEventListener('focus', (e) => {
            otpBoxes[index].select();
        });

    });

    const otpError = () => {
        if(otp.length < 4) {
            setinvalidotperror("Kindly enter a 4-digit OTP")
        }else{
            setinvalidotperror(null)
        }
    }

    useEffect(() => {
       if (otp.length >= 4) {
            setinvalidotperror(null)
        };
        console.log(otp);
    },[otp.length])

    //collect all OTP numbers
    const authOTP = () => {
        
        console.log(otp);
    }
    
////////////////////////OTP BOXES



    

    return(<>
        <div className="otppopover">
            <p className="loginwelmsg">Enter 4 digit OTP</p>

            <div className="otpboxholder">
                <input className="otpbox" type="tel" maxLength={1}/>
                <input className="otpbox" type="tel" maxLength={1}/>
                <input className="otpbox" type="tel" maxLength={1}/>
                <input className="otpbox" type="tel" maxLength={1}/>
            </div>
            <p className='otperror'>{invalidotperror}</p> {/*OTP entered is incorrect*/}

            <div className='otpmsgbox'>
                <p className='otpmsg'>OTP has been sent to <strong>9999999999</strong></p>
                <button className='phedit' onClick={() => navigate(-1)}>Edit</button>
            </div>

            <p className='otpnrmsg'>Havent received your OTP yet?</p>
            {timer > 0 ?
                <p className='otptimer'>Wait 00:{`${timer}`}</p> : null
            }
            {timer <= 0 ?
                <div className='resendotpbox'>
                    <button className='resendotpbtn'>Resend OTP</button>
                </div> : null
            }

            <button className='otpcontbutton' disabled={otp.length < 4 ? true : false} onClick={authOTP} onTouchStart={otpError}>Continue</button>
        </div>
    </>)
}
export default Enterotp;