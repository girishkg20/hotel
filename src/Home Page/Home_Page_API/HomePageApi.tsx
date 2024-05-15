import { useEffect, useState } from "react";
import Homepagedata from './HomePageData.jsx';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveaddress } from "./UserAddressSlice.js";
import { sessionid, clearsessionid } from "./SessionIdSlice.js";
import { merchantsData } from "./MerchantsdataSlice.js";


const Homepageapi = ({ children }: { children: React.ReactNode }) => {

  const Dispatch = useDispatch();
  let {hotelid} = useParams();

  const [sessid, setsessid] = useState<string>();

  const sessionID = useSelector((state:any) => state.sesReducers.sessionid.value);
  const savedaddress = useSelector((state:any) => state.perReducers.saveaddress.value);

  const HotelID = savedaddress.merchant_sku;

  useEffect(() => {

    if (sessionID && HotelID != hotelid) {
      Dispatch(clearsessionid());
    }else{
      if (!sessionID) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = 10;
      
        let sessionId = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          sessionId += characters.charAt(randomIndex);
        };
        setsessid(sessionId);
      }else{
        setsessid(sessionID);
      };
    }

  },[sessionID])
  
  const [Hotelname, setHotelname] = useState('Loading...');
  const [Cuisines, setCuisines] = useState([]);
  const [Data, setData] = useState<[]>();

  useEffect(() => {
    if(!sessionID && sessid) {
      const mainurl = `${import.meta.env.VITE_BASE_URL}/hotel/merchant/${hotelid}?session_id=${sessid}`;
      fetch(mainurl)
        .then((response) => response.json())
        .then((data) => {
          window.scrollTo(0,0);
          setHotelname(data.response.data.name);

          Dispatch(saveaddress(data.response.data));
          Dispatch(sessionid(sessid));
        })
      .catch((error) => console.log(error));
    }else{
      window.scrollTo(0,0);
      setHotelname(savedaddress.name);
    }
  }, [sessid]);

  useEffect(() => {
    if(sessionID && HotelID === hotelid) {
      let limit = 100;
      let skip = 0;
      let latitude = savedaddress.location_lat;
      let longitude = savedaddress.location_long;
      let area = savedaddress.area_name;
      let hour_value = new Date().getHours();
      let hotel_merchant_id = savedaddress._id;
  
      let myurl = `${import.meta.env.VITE_BASE_URL}/hotel/es/restaurants/new?limit=${limit}&skip=${skip}&latitude=${latitude}&longitude=${longitude}&area_name=${area}&hour_value=${hour_value}&hotel_merchant_id=${hotel_merchant_id}`;
  
      fetch(myurl)
        .then(response => response.json())
        .then(data => {
          setCuisines(data.response.cuisines);
          setData(data.response.data);

          Dispatch(merchantsData(data.response.data));
        
          const url = `${import.meta.env.VITE_BASE_URL}/hotel/session_id/${sessionID}`;
          const payload = {
            page_name: `Home Page - ${data.response.data.length} Restaurants`,
          };
          
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }).catch((error) => console.log(error));
  
        })
      .catch((error) => console.log(error));
    }
  },[sessionID, HotelID])
  
  return ( <Homepagedata.Provider value={{ Hotelname, Cuisines, Data}}>
            { children } 
          </Homepagedata.Provider>
  );

};
export default Homepageapi;