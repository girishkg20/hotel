import { useContext, useEffect, useState } from "react";
import Menupagedata from "./MenuPageData";
// import Homepagedata from "../../Home Page/Home_Page_API/HomePageData";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";



const Menupageapi = ({ children }: any) => {

    const Useraddress = useSelector((state:any) => state.perReducers.saveaddress.value);
    const sessionID = useSelector((state:any) => state.sesReducers.sessionid.value);
    
    const [menu, setMenu] = useState<any>([]);
    const [Actualdistance, setActualdistance] = useState<any>([]);
    
    const FullDate = new Date();
    const YYYY = FullDate.getFullYear();
    const MM = FullDate.getMonth() + 1;
    const DD = FullDate.getDate();
    const FormatedDate = `${YYYY}/${MM}/${DD}`;

    const {merchantid} = useParams();
    let CurrentDate = FormatedDate;

    let MenuURL = `${import.meta.env.VITE_BASE_URL}/hotel/explore/restaurants/${merchantid}/restaurant-details?date=${CurrentDate}`;

    useEffect(() => {
        if (Useraddress.location_lat && merchantid) {
            fetch(MenuURL)
                .then((response) => response.json())
                .then((data) => {
                    window.scrollTo(0,0);
                    setMenu(data.response);

                    //log
                    const url = `${import.meta.env.VITE_BASE_URL}/hotel/session_id/${sessionID}`;
                    const payload = {
                        page_name: `Menu Page - ${data.response.merchant.name} (${data.response.merchant.area_name})`,
                        // phone_number: "9999999999"
                    }
                    
                    fetch(url, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload)
                    }).catch((error) => console.log(error));
                    //log

                    const UseraddressURL = `${import.meta.env.VITE_BASE_URL}/hotel/delivery-quotes/merchant`;

                    const PostData = {
                        "merchant_lat": data.response.merchant.location_lat,
                        "merchant_long": data.response.merchant.location_long,
                        "user_lat": Useraddress.location_lat,
                        "user_long": Useraddress.location_long,
                        "merchant_id": merchantid
                    };

                    const Options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(PostData),
                    };

                    fetch(UseraddressURL, Options)
                    .then((response) => response.json())
                    .then((data) => setActualdistance(data.response))
                    .catch((error) => console.log(error));

                })
                .catch((error) => console.log(error));
        }

    }, [Useraddress.location_lat, merchantid]);


    return (
        <Menupagedata.Provider value={{menu,Actualdistance}}>
            {children}
        </Menupagedata.Provider>
    );

};
export default Menupageapi;
