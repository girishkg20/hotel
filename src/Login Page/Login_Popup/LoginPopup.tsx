import './LoginPopup.css'
import { useNavigate } from "react-router-dom";

const Loginpopup = () => {

    const navigate = useNavigate();

    return(<>
        <div className='loginpopoverlay' onClick={() => navigate(-1)}></div>
        <div className="loginpopover">
            <div className='loginbox'>
                <form action="submit">
                    <input type="tel" name="Mobile Number" required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </>);
}
export default Loginpopup;