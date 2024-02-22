import { useEffect, useState } from "react";
import Homepagedata from './HomePageData.jsx';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveaddress } from "./UserAddressSlice.js";
import { sessionid } from "./SessionIdSlice.js";
import { useSelector } from "react-redux";


const Homepageapi = ({ children }: { children: React.ReactNode }) => {

  const Dispatch = useDispatch();
  let {hotelid} = useParams();

  const sessionId = useSelector((state:any) => state.sesReducers.sessionid.value);

  useEffect(() => {

    if (!sessionId) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const length = 10;
    
      let sessionId = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        sessionId += characters.charAt(randomIndex);
      }
      Dispatch(sessionid(sessionId));
    }

  },[sessionId])
  
  let mainurl = `https://prod-server.tipplr.in/hotel/merchant/${hotelid}?session_id=${sessionId}`;

  const [Useraddress, setUseraddress] = useState([]);
  const [Hotelname, setHotelname] = useState('Loading...');
  const [Cuisines, setCuisines] = useState([]);
  const [Data, setData] = useState<[]>();

  useEffect(() => {sessionId &&
    fetch(mainurl)
      .then((response) => response.json())
      .then((data) => {
        window.scrollTo(0,0);
        setUseraddress(data.response.address);
        setHotelname(data.response.data.name);

        Dispatch(saveaddress(data.response.address));
        
        let limit = 100;
        let skip = 0;
        let latitude = data.response.address.location_lat;
        let longitude = data.response.address.location_long;
        let area = data.response.address.area;
        let hour_value = new Date().getHours();
        let hotel_merchant_id = data.response.data._id;

        let myurl = `https://prod-server.tipplr.in/hotel/es/restaurants/new?limit=${limit}&skip=${skip}&latitude=${latitude}&longitude=${longitude}&area_name=${area}&hour_value=${hour_value}&hotel_merchant_id=${hotel_merchant_id}`;

        fetch(myurl)
          .then(response => response.json())
          .then(data => {
            setCuisines(data.response.cuisines)
            setData(data.response.data)
          
            const url = `https://prod-server.tipplr.in/hotel/session_id/${sessionId}`;
            const payload = {
              page_name: `Home Page - ${data.response.data.length} Restaurants`,
            };
            
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
            }).catch((error) => console.log(error));

          })
        .catch((error) => console.log(error));
      })
    .catch((error) => console.log(error));
  
  }, [sessionId]);
  
  return ( <Homepagedata.Provider value={{Useraddress, Hotelname, Cuisines, Data}}>
            { children } 
          </Homepagedata.Provider>
  );

};
export default Homepageapi;