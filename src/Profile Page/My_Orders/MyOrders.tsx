import "./MyOrders.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Uniloader from "../../Universal Loader/UniLoader";

import backbutton from "./Source/back.png";
import right from "./Source/right_white.png";
import noorders from "./Source/no_food_orders.png";







const Myorders = () => {

    const navigate = useNavigate();
    document.body.style.overflow = "hidden";

    const [ordersdata, setordersdata] = useState<any>([]);
    const [skip, setskip] = useState(0);
    const [totalorders, settotalorders] = useState(0);
    const [scrolled, setscrolled] = useState(true);
    const [header, setHeader] = useState <HTMLDivElement | null>();
    const [headertext, setHeadertext] = useState <HTMLHeadingElement | null>();
    const [newpage, setNewpage] = useState <HTMLDivElement>();
    const [loading, setloading] = useState<boolean>(true);

    useEffect(() => {
        setHeader(document.getElementById("pspheader") as HTMLDivElement | null);
        setHeadertext(document.getElementById("pspheadertext") as HTMLHeadingElement | null);
        setNewpage(document.getElementById("newpage") as HTMLDivElement);
    },[ordersdata]);

    useEffect(() => {
        if (header && headertext && newpage) {
            newpage.addEventListener('scroll', fixheader);
            newpage.addEventListener('scroll', settingscrolled);

            return () => {
                newpage.removeEventListener('scroll', fixheader);
                newpage.removeEventListener('scroll', settingscrolled);
            }
        };
    },[header, scrolled])

    const fixheader = () => {
        
        if (newpage!.scrollTop > 55) {
            header!.classList.add('fixed')
            headertext!.style.display = "flex";
        }else{
            header!.classList.remove('fixed')
            headertext!.style.display = "none";
        }
 
    }

    const settingscrolled = () => {
        if(!scrolled && ordersdata.length < totalorders && newpage!.scrollTop >= (newpage!.scrollHeight - newpage!.clientHeight - 120)) {
            setscrolled(true);
        }
    }

    const auth = useSelector((state:any) => state.perReducers.auth.value);
    const loggedin = auth.token;

    useEffect(() => {

        if(loggedin && scrolled) {

            const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order?limit=25&skip=${skip}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loggedin
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setordersdata((predata:any) => [...predata, ...data.response.data]);
                settotalorders(data.response.count);
                setskip(skip + 25);
                setscrolled(false);
                setloading(false);
            })

        };

    },[scrolled])

    const unixtodateandtime = (unix:any) => {

        const date = new Intl.DateTimeFormat(
            'en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }
        ).format(unix*1000);

        return date;
    }






    if(loading) {
        return (<div className="newpage"><Uniloader/></div>);
    };

    return(<div className="newpage" id="newpage" style={{backgroundColor: "#F6F6F6"}}>{ordersdata && ordersdata.length > 0 ?
        <>
            <div className='ppheader' id='pspheader'>
                <div className='backtitle'>
                    <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                    <h3 className='headertext' id='pspheadertext'>My Orders</h3>
                </div>
            </div>

            <div className="myorderscontentsholder">
                {
                    ordersdata.map((eachorder:any) => (<div className="orderscard" key={eachorder._id} onClick={() => navigate(eachorder._id)}>

                        <div className="morestonameholder">
                            <div>
                                <p className="morestoname">{eachorder.merchant_details.name}</p>
                                <p className="moareaname">{`${eachorder.merchant_details.area}, ${eachorder.merchant_details.city}`}</p>
                            </div>
                            {
                                eachorder.status === "order_delivered" ? <p className="modelivered">Delivered<img src={right} height={"10px"} alt=">"/></p> :
                                eachorder.status === "order_cancelled" ? <p className="mocancelled">Cancelled<img src={right} height={"10px"} alt=">"/></p> :
                                <p className="moinprogress">In Progress<img src={right} height={"10px"} alt=">"/></p>
                            }
                        </div>
                        <p className="moprice">{`₹ ${eachorder.total}`}</p>
                        <hr className="modivider"/>
                        <p className="moitems">{
                            eachorder.food_items.map((eachfooditem:any) => eachfooditem.quantity + " × " + eachfooditem.name).join(", ")
                        }</p>
                        <p className="modatentime">{unixtodateandtime(eachorder.created_time)}</p>
                    </div>))
                }
                {scrolled &&
                    <section className="dots-container">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </section>
                }
            </div>
        </> :
        <>
            <div className="nrholder">
                <img src={noorders} alt="!" width={192}/>
                <h6 className="nrmessage">Unfortunately, no food orders were found :&#40;</h6>
                <div className='rcbtnholder'>
                    <button className='getotpbutton' onClick={() => navigate(-1)}>Back to Profile</button>
                </div>
            </div>
        </>
    }<Outlet/></div>)
}
export default Myorders; 