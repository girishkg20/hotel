import "./StatusBar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import right from "./Source/right.png";




const Statusbar = () => {

    document.body.removeAttribute('style');

    const navigate = useNavigate();
    const {hotelid} = useParams();

    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const loggedin = userdata.token;

    const [allorders, setallorders] = useState<any>();

    const getallorders = () => {
        if(loggedin && window.location.pathname === `/${hotelid}`) {
            const url = `${import.meta.env.VITE_BASE_URL}/app/home/status-bar-updates`

            fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loggedin
                }
            })
            .then((response) => response.json())
            .then((data) => setallorders(data.response.data));
        };
    };

    useEffect(() => {
        getallorders();
        
        window.addEventListener('popstate', getallorders);
        return () => {
            window.removeEventListener('popstate', getallorders);
        }
    },[]);

    useEffect(() => {
        let interval:any;
        clearInterval(interval);
    
        if (allorders && allorders.length > 0) {
            interval = setInterval(getallorders, 30000);
        }
    
        return () => clearInterval(interval);
    }, [allorders]);
    


    return(<>
        {allorders && allorders.length > 0 && <div className='whiteshadowholder'>

            <div className="slidablefooters">

                {allorders.map((each:any) => (
                    <div className='sbcard' key={each.target_resource_id}>
                        <div style={{overflow:"hidden"}}>
                            <p className="sborderstatus">{
                                each.status === "order_pending" || each.status === "order_received" ? "Order Placed" :
                                each.status === "order_accepted" || each.status === "ready_for_pickup" ? "Preparing your Order" :
                                each.status === "order_out_for_delivery" ? "Order is on the way" :
                                null
                            }</p>
                            <p className='sbmerchantname'>{each.merchant_id.name}</p>
                        </div>
                        <button className='viewcartbtn' onClick={() => navigate(`trackorder/${each.target_resource_id}`)}>Track Order<img src={right} alt=">"/></button>
                    </div>
                ))}
                
            </div>

        </div>}
    </>)
}
export default Statusbar;