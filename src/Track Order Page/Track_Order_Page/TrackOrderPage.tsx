import './TrackOrderPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import backbutton from "./Source/back.png";
import helmet from "./Source/helmet.png";
import pin from "./Source/userlocation.png";
import restopin from "./Source/restaurant.png";
import cooking from "./Source/cooking.svg";
import out from "./Source/out.svg";
import delivered from "./Source/delivered.svg";
import placedp from "./Source/placedp.svg";
import cookingp from "./Source/cookingp.svg";
import outp from "./Source/outp.svg";
import right from "./Source/rightpurple.png";
import support from "./Source/support.png";
import deliveryboy from "./Source/deliveryboy.png";
import call from "./Source/call.png";







const Trackorderpage = () => {

    const {orderid} = useParams();
    const navigate = useNavigate();
    document.body.removeAttribute('style');

    const [orderdata, setorderdata] = useState<any>();
    const [latlongs, setlatlongs] = useState<any>();

    const userdata = useSelector((state:any) => state.perReducers.auth.value);
    const loggedin = userdata.token;

    const getorderdetails = () => {
        if(loggedin && orderid) {
            const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/${orderid}?delivery_details=1`
            
            fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loggedin
                }
            })
            .then((response) => response.json())
            .then((data) => setorderdata(data.response.data));
        };
    };

    // //// REMOVE THIS AND UNCOMMENT THE ABOVE FUNCTION
    // const getorderdetails = () => {
    //     if(orderid) {
    //         const url = `https://secondary.tipplr.in/food-order/${orderid}/delivery-status`;
            
    //         fetch(url, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4tMTY3ODA4NDIzMDI5NTkzMjA3IiwiaWF0IjoxNzE0NzIxMjM4LCJleHAiOjE3MTczMTMyMzh9.G-otA4Ts-lUn5mxOMFt-swbQbtD738C7fwKpFvf-ZXs"
    //             }
    //         })
    //         .then((response) => response.json())
    //         .then((data) => setorderdata(data.response.data));
    //     };
    // };
    // //// REMOVE THIS AND UNCOMMENT THE ABOVE FUNCTION

    useEffect(() => {
        getorderdetails();

        const interval = setInterval(getorderdetails, 30000);
        return () => clearInterval(interval);
    },[])

    useEffect(() => {
        if(orderdata) {

            if(orderdata.status === "order_cancelled" || orderdata.status === "order_delivered") {
                return navigate("details", {replace: true});
            }
            
            const del_lat = orderdata.delivery_address.location_lat;
            const del_long = orderdata.delivery_address.location_long;

            const resto_lat = orderdata.merchant_details.location_lat;
            const resto_long = orderdata.merchant_details.location_long;

            const boy_lat = orderdata.delivery_agent.delivery_agent_position.length === 2 ? orderdata.delivery_agent.delivery_agent_position[0] : null;
            const boy_long = orderdata.delivery_agent.delivery_agent_position.length === 2 ? orderdata.delivery_agent.delivery_agent_position[1] : null;

            const oldDelLat = latlongs ? latlongs[0].lat : 0;
            const oldDelLong = latlongs ? latlongs[0].lng : 0;
            const oldRestoLat = latlongs ? latlongs[1].lat : 0;
            const oldRestoLong = latlongs ? latlongs[1].lng : 0;
            const oldBoyLat = latlongs ? latlongs[2] && latlongs[2].lat : 0;
            const oldBoyLong = latlongs ? latlongs[2] && latlongs[2].lng : 0;

            if (del_lat !== oldDelLat || del_long !== oldDelLong || resto_lat !== oldRestoLat || resto_long !== oldRestoLong || boy_lat !== oldBoyLat || boy_long !== oldBoyLong) {
                const latlong = [
                    {lat: del_lat, lng: del_long},
                    {lat: resto_lat, lng: resto_long}
                ]

                if(boy_lat && boy_long) {
                    latlong.push({lat: boy_lat, lng: boy_long})
                };
    
                setlatlongs(latlong);
            };

            //updating status bar on the map

            const cookingimg = document.getElementById("cooking") as HTMLImageElement;
            const cookinghr = document.getElementById("cookinghr") as HTMLHRElement;

            const outimg = document.getElementById("out") as HTMLImageElement;
            const outhr = document.getElementById("outhr") as HTMLHRElement;

            if(cookingimg && cookinghr && outimg && outhr) {

                if(orderdata.status === "order_accepted" || orderdata.status === "ready_for_pickup") {
                    cookingimg.src = cookingp;
                    cookinghr.style.borderColor = "#6410F5";

                    outimg.src = out;
                    outhr.style.borderColor = "#C4C4C4";
                }else{
                    if(orderdata.status === "order_out_for_delivery") {
                        cookingimg.src = cookingp;
                        cookinghr.style.borderColor = "#6410F5";
    
                        outimg.src = outp;
                        outhr.style.borderColor = "#6410F5";
                    }else{
                        cookingimg.src = cooking;
                        cookinghr.style.borderColor = "#C4C4C4";
    
                        outimg.src = out;
                        outhr.style.borderColor = "#C4C4C4";
                    }
                }

            };
 
        }
    },[orderdata])
    
    async function initMap(): Promise<void> {

        const position = latlongs;
        
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const map = new Map(document.getElementById('map') as HTMLElement, {
            
            zoom: 15,
            center: position[0],
            mapId: 'DEMO_MAP_ID',
            // mapId: '8e0a97af9386fef',
            // mapId: '6ff586e93e18149f',
            disableDefaultUI: true,
            clickableIcons: false
            
        });
        
        // Map directions
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: '#7427F5',
                strokeOpacity: 1,
                // strokeWeight: 3
            }
        });

        const calculateAndDisplayRoute = (directionsService: google.maps.DirectionsService, directionsRenderer: google.maps.DirectionsRenderer) => {
          
            directionsService.route({
                origin: latlongs[2],
                destination: latlongs[0],
                travelMode: google.maps.TravelMode['DRIVING'],
            })
            .then((response) => {
                directionsRenderer.setDirections(response);
            })
            .catch((e) => window.alert("Directions request failed due to " + e));

        }

        if(orderdata.status === "order_out_for_delivery" && latlongs[2] && latlongs[2].lat) {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
        // Map directions

        const bounds = new google.maps.LatLngBounds();
        position.forEach((location:any) => {
            bounds.extend(location);
        });
        map.fitBounds(bounds, {top:10,right:30,bottom:10,left:10});

        const deliverypointer = document.createElement('img');
        deliverypointer.src = pin;
        deliverypointer.height = 37;

        const deliveryMarker = new AdvancedMarkerElement({
            position: latlongs[0],
            map: map,
            title: 'Delivery Point',
            content: deliverypointer,
        });

        const restopointer = document.createElement('img');
        restopointer.src = restopin;
        restopointer.height = 37;

        const restoMarker = new AdvancedMarkerElement({
            position: latlongs[1],
            map: map,
            title: 'Restaurant',
            content: restopointer,
        });

        const riderpointer = document.createElement('img');
        riderpointer.style.transform = "translate(10px, 10px)";
        riderpointer.src = helmet;
        riderpointer.height = 30;

        const riderMarker = new AdvancedMarkerElement({
            position: latlongs[2],
            map: map,
            title: 'Rider',
            content: riderpointer,
        });

    };

    useEffect(() => {
        if(latlongs) {
            initMap();
        }
    },[latlongs])

    const unixtodateandtime = (unix:any) => {

        const date = new Intl.DateTimeFormat(
            'en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }
        ).format(unix*1000);

        return date;
    };

    



    return(<>{orderdata && <>
        <img className='mapbackbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
        <div className="map" id='map'></div>
        <div className="statusbarholder">
            <div className="statusbar">
                <img src={placedp} alt="placed" width={"34px"}/>
                <hr style={{borderColor: "#6410F5"}}/>
                <img id='cooking' src={cooking} alt="preparing" width={"45px"}/>
                <hr id='cookinghr'/>
                <img id='out' src={out} alt="out" width={"45px"}/>
                <hr id='outhr'/>
                <img src={delivered} alt="delivered" width={"45px"}/>
            </div>
        </div>

        <div className="trackbottomholder">
            <div className='trackorderstatusholder'>
                <p className="trackorderstatus">{
                    orderdata.status === "order_pending" || orderdata.status === "order_received" ? "Order Placed" :
                    orderdata.status === "order_accepted" || orderdata.status === "ready_for_pickup" ? "Preparing your Order" :
                    orderdata.status === "order_out_for_delivery" ? "Order is on the way" :
                    null
                }</p>
            </div>

            <div className="tobody">

                <hr className='todescriptiondivider'/>
                <div className="todescriptionholder">
                    <p className='todescription'>{
                        orderdata.status === "order_pending" || orderdata.status === "order_received" ? "“Awaiting restaurant to accept your order”" :
                        orderdata.status === "order_accepted" || orderdata.status === "ready_for_pickup" ? "“Your order is being prepared for delivery”" :
                        orderdata.status === "order_out_for_delivery" ? "“Your order is out for delivery. It's on the way!”" :
                        null
                    }</p>
                </div>
                <hr className='todescriptiondivider'/>

                {orderdata.delivery_agent.delivery_agent_name && <>
                    <div className="riderholder">
                        <div className="riderleft">
                            <img src={deliveryboy} alt="rider" width={80}/>
                            <div>
                                <p className="ridername">Hi, I'm {orderdata.delivery_agent.delivery_agent_name}</p>
                                <p className="riderdesc">(Delivery Partner)</p>
                                <p className="ridermob">Mobile Number: {orderdata.delivery_agent.delivery_agent_phone}</p>
                            </div>
                        </div>
                        <a href={`tel:+91 ${orderdata.delivery_agent.delivery_agent_phone}`}>
                            <img src={call} alt="call" width={50}/>
                        </a>
                    </div>
                    <hr className='todescriptiondivider'/>
                </>}

                <p className="torestoname">{orderdata.merchant_details.name}</p>
                <p className="toordernu">Order Number: {orderdata.order_number}</p>
                <p className="toordernu">Total: ₹ {orderdata.total.toFixed(2)}</p>
                <p className="toorderdate">{unixtodateandtime(orderdata.created_time)}</p>
                <button className='toodbutton' onClick={() => navigate("details")}>
                    <p>Order Details</p>
                    <img src={right} alt=">" width={"8px"}/>
                </button>

                <a href="tel:+91 8929221233" className='tosupportcard'>
                    <div>
                        <p className='tosupportheading'>Help</p>
                        <p className='tosupportdesc'>Get in touch with our customer support</p>
                    </div>
                    <img src={support} alt="support" width={"42px"}/>
                </a>

            </div>
        </div>
    </>}</>)
}
export default Trackorderpage;