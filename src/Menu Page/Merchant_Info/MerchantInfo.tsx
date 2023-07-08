import { useContext, useEffect, useState } from 'react';
import './MerchantInfo.css';
import locationpin from './Source/location pin.png'
import Menupagedata from '../Menu_Page_API/MenuPageData';


const Merchantinfo = () => {

    const {menu, Actualdistance} = useContext(Menupagedata);

    const [Restaurant_Name, setRestaurant_Name] = useState("Loading...")
    const [Cuisines, setCuisines] = useState([{name: "..."}]);
    const [Area, setArea] = useState("...");
    const [Rating, setRating] = useState(0);
    const [Far, setFar] = useState(0);

    
    useEffect(() => {

        if (menu && menu.merchant && Actualdistance && Actualdistance.data) {
            setRestaurant_Name(menu.merchant.name);
            setCuisines(menu.merchant.cuisines);
            setArea(menu.merchant.area_name);
            setRating(menu.merchant.rating.toFixed(1));

            if (Actualdistance.data == "") {
                console.log("Dunzo request failed");
            }else{
                setFar(Actualdistance.data[0].distance);
            }
              
        }
        
    },[Actualdistance])
    

    return(
        <div className='infocard'>

            <div className='infoheading'>
                <h1 className='name'>{Restaurant_Name}</h1>
                {
                    Rating == 0
                    ? null
                    : <p className='rating'><span className='star'>⭐</span>{Rating}</p>
                } 
            </div>
            
            <p className='cuisines'>{Cuisines.map((eachCuisine: any) => eachCuisine.name).join(", ")}</p>

            <div className='place'>
                <p>{Area}</p>
                {
                    Far == 0
                    ? null
                    :<div className='distance'>
                        <img className='location' src={locationpin} alt="Place"/>
                        <p>{Far} km</p>
                    </div>
                }
            </div>
            
        </div>
    );
};
export default Merchantinfo;