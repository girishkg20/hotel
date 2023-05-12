import { ReactNode, useEffect, useState } from "react";
import Homepagedata from './HomePageData.jsx';


const Homepageapi = ({ children }: { children: React.ReactNode }) => {

    let hotelid = "H002";
    let mainurl = `https://prod-server.tipplr.in/hotel/merchant/${hotelid}`;
  
    const [Hotelname, setHotelname] = useState('Loading...');
    const [Cuisines, setCuisines] = useState([]);
    const [Data, setData] = useState([]);
  
    useEffect(() => {
      fetch(mainurl)
        .then((response) => response.json())
        .then((data) => {
          setHotelname(data.response.data.name);
  
          let limit = 100;
          let skip = 0;
          let latitude = data.response.address.location_lat;
          let longitude = data.response.address.location_long;
          let area = data.response.address.area;
  
          let myurl = `https://prod-server.tipplr.in/hotel/es/restaurants/new?limit=${limit}&skip=${skip}&latitude=${latitude}&longitude=${longitude}&area_name=${area}&hour_value=20&hotel_merchant_id=merchant-165175081350446196&session_id=9W8XEH8SXJ`;
  
          fetch(myurl)
            .then(response => response.json())
            .then(data => {
              setCuisines(data.response.cuisines)
              setData(data.response.data)
            })
          .catch((error) => console.log(error));
        })
      .catch((error) => console.log(error));
    
    }, []);
    
    return ( <Homepagedata.Provider value={{Hotelname, Cuisines, Data}}>
              { children } 
            </Homepagedata.Provider>
    );
  
  };
  export default Homepageapi;