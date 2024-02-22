import { useSelector } from 'react-redux';
import './TopCuisinesPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import discountimg from './Source/offer.png';
import locationpin from './Source/location pin.png';
import Endimage from '../../Home Page/End_Image/EndImage';


const Topcuisinespage = () => {

    const Useraddress = useSelector((state:any) => state.perReducers.saveaddress.value);
    const [Data, setData] = useState([]);

    const {cuisineid} = useParams();
    const navigate = useNavigate();

    const Default_Cover_Image = "https://res.cloudinary.com/tipplr-server/image/upload/fl_lossy,f_auto,q_auto,c_fill,w_512,h_256/v1679409245/ty1nlgx7buizm5onqseu.jpg";


    useEffect(() => {
        const baseurl = "https://prod-server.tipplr.in/hotel/es/restaurants/new";
        const queryparams = new URLSearchParams({
            limit: "50",
            skip: "0",
            latitude: Useraddress.location_lat,
            longitude: Useraddress.location_long,
            delivery_available: "1",
            'cuisines:in': `${cuisineid}`,
        });
        const url = baseurl + "?" + queryparams.toString();
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then((data) => setData(data.response.data))
        ;
    },[])
    

    return(<>
        <h1>Top Cuisines Page</h1>
        <h5 className="restaurantheading">Restaurants Around You</h5>

        <div className="restaurantholder" id="restaurantscontainer">
        {Data && Data.map((eachRestaurant: any) => (
            <div key={eachRestaurant._id} className="restaurantcard" onClick={()=>navigate(eachRestaurant._id)}>
            <img
                className="restaurantimg"
                loading="lazy"
                src={eachRestaurant.cover_image ?? Default_Cover_Image}
            />

            {eachRestaurant.discount_banner ? (
                <div className="offerbox">
                <div className="discount">
                    <img className="discountimg" src={discountimg} />
                    <p>{eachRestaurant.discount_banner}</p>
                </div>
                
                <p>{eachRestaurant.delivery_discount_banner}</p>
                </div>
            ) : null}

            <div className="namerating">
                <p className="restaurantname">{eachRestaurant.name}</p>

                {eachRestaurant.rating > 0 ? (
                <p className="rlrating">
                    <span className="rlstar">⭐ &nbsp;</span>
                    {eachRestaurant.rating.toFixed(1)}
                </p>
                ) : null}
            </div>

            <p className="restaurantcuisines">
                {eachRestaurant.cuisines
                .map((eachCuisine: any) => eachCuisine.name)
                .join(", ")}
            </p>

            <div className="areac42">
                <p className="area">{eachRestaurant.area_name}</p>
                <p>{`₹ ${eachRestaurant.cost_for_two} for two`}</p>
            </div>

            <hr className="divider" />

            <div className="peopledistance">
                <p className="orders">
                {eachRestaurant.order_count == 0
                    ? "Be the first to order from this place"
                    : `${eachRestaurant.order_count} people have ordered from this place`}
                </p>

                <div className="distanceholder">
                <img className="locationpin" src={locationpin} />
                <p className="rldistance">{`${eachRestaurant.distance} km`}</p>
                </div>
            </div>
            </div>
        ))}
        </div>
        <Endimage/>
    </>)
}
export default Topcuisinespage;