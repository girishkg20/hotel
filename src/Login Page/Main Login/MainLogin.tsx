import './MainLogin.css';
import loginbackgroundimg from './Source/login background.png';
import backbutton from "./Source/back.png";

import { Outlet, useNavigate } from "react-router-dom";

const Mainlogin = () => {
    const navigate = useNavigate();

    return(<>
        <div>
            <img className='loginbackbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
            <img className="loginbgimage" src={loginbackgroundimg} alt="background" />
        </div>
        <Outlet/>
    </>)
}
export default Mainlogin;