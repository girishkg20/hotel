import './ClearCartPopup.css';
import close from './Source/close.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearItem } from '../CartSlice';


const Clearcartpopup = () => {

    const navigate = useNavigate();
    const Dispatch = useDispatch();

    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value);
    
    if(actualpayload) {
        document.body.style.overflow = "hidden"

        const handlePopstate = () => {
            document.body.style.overflow = "scroll";
            window.removeEventListener("popstate", handlePopstate);
        };
        window.addEventListener("popstate", handlePopstate);
    };

    const clearCart = () => {
        Dispatch(clearItem());
        navigate(-1);
    };


    return(<>{actualpayload ?<>

        <div className='popoverlay' onClick={() => navigate(-1)}></div>

        <div className='popup'>
            <img className="clrcartclosebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            <h6 className='popupheading'>Switching Restaurant ?</h6>
            <p className='popupdescription'>Your cart currently holds items from a different restaurant. Reset your cart to enjoy fresh picks from this one!</p>
            <div className='twobuttons'>
                <button className='nobutton' onClick={() => navigate(-1)}>No</button>
                <button className='resetbutton' onClick={clearCart}>Reset</button>
            </div>
        </div>
    
    </>:null}</>)
}
export default Clearcartpopup;