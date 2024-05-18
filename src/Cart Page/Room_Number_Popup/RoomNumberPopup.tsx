import "./RoomNumberPopup.css";
import close from './Source/close.png';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { roomnumber } from "../RoomnumberSlice";
import { profiledata } from "../../Profile Page/ProfileSlice";




const Roomnumberpopup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    document.body.style.overflow = "hidden";

    const [name, setname] = useState<string>();
    const [error, seterror] = useState<boolean>(false);

    const profile = useSelector((state:any) => state.perReducers.profiledata.value);
    const auth = useSelector((state:any) => state.perReducers.auth.value);
    const loggedin = auth.token;

    useEffect(() => {
        if(profile && profile.first_name) {
            setname(profile.first_name);
        }
    },[profile])

    const updateprofile = async (firstname:string, lastname:string) => {
        if(loggedin) {
            const url = `${import.meta.env.VITE_BASE_URL}/app/user/profile`;

            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loggedin
                },
                body: JSON.stringify({
                    "first_name": firstname,
                    "last_name": lastname
                })
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(profiledata(data.response.data));
            })
        };
    }

    const addroomnumber = async () => {

        if(name) {

            const room = document.getElementById('room') as HTMLInputElement;

            if(room.value.length < 1) {
                seterror(true);
            }else{
                seterror(false);
                dispatch(roomnumber(room.value));
                navigate(-1);
            }

        }else{

            const firstname = document.getElementById('firstname') as HTMLInputElement;
            const lastname = document.getElementById('lastname') as HTMLInputElement;
            const room = document.getElementById('room') as HTMLInputElement;

            if(firstname.value.length < 1 || lastname.value.length < 1 || room.value.length < 1) {
                seterror(true);
            }else{
                seterror(false);
                await updateprofile(firstname.value, lastname.value);
                
                dispatch(roomnumber(room.value));
                navigate(-1);
            }

        }

    }


    return(<>
       
        <div className='popoverlay' onClick={() => navigate(-1)}></div>

        {!name &&
            <div className='popup'>
                <img className="clrcartclosebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
                <h6 className='popupheading'>Provide Delivery Details</h6>
                <p className='rndescription'>Help us deliver your food right to you</p>
                <div className="rnholder">
                    <input className='rntext' id="firstname" type="text" placeholder="First Name*"/>
                    <input className='rntext' id="lastname" type="text" placeholder="Last Name*"/>
                    <input className='rntext' id="room" type="text" placeholder="Room Number*"/>
                </div>
                {error && <p className="rnrequirederror">All fields are required!</p>}
                <div className='twobuttons'>
                    <button className='nobutton' onClick={() => navigate(-1)}>Cancel</button>
                    <button className='resetbutton' onClick={addroomnumber}>Submit</button>
                </div>
            </div>
        }

        {name &&
            <label className='popup'>
                <img className="clrcartclosebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
                <h6 className='popupheading'>Enter Room Number</h6>
                <p className='rndescription'>Help us deliver your food right to you</p>
                <div className="rnholder">
                    <input className='rntext' id="room" type="text" placeholder="Room Number*"/>
                </div>
                {error && <p className="rnrequirederror">All fields are required!</p>}
                <div className='twobuttons'>
                    <button className='nobutton' onClick={() => navigate(-1)}>Cancel</button>
                    <button className='resetbutton' onClick={addroomnumber}>Submit</button>
                </div>
            </label>
        }
        
    </>)
}
export default Roomnumberpopup;