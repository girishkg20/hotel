import './TopCuisinesPage.css';
import Endimage from '../../Home Page/End_Image/EndImage';
import Uniloader from '../../Universal Loader/UniLoader';

import discountimg from './Source/offer.png';
import locationpin from './Source/location pin.png';
import backbutton from './Source/back.png';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';




const Topcuisinespage = () => {

    const Useraddress = useSelector((state:any) => state.perReducers.saveaddress.value);
    const [Data, setData] = useState<any>([]);
    const [cuisine, setcuisine] = useState<any>();
    const [loading, setloading] = useState<boolean>(true);

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

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setData(data.response.data);
                const cuisineindex = data.response.cuisines.findIndex((eachcuisines:any) => eachcuisines._id === cuisineid);
                setcuisine(data.response.cuisines[cuisineindex]);
                setloading(false);
                window.scrollTo(0, 0);
            })
        .catch((error) => console.log(error));
    },[])

    const fixheader = () => {
        const header = document.getElementById('mpheader');
        const headertext = document.getElementById('headertext');

        if(header && headertext) {
            if (window.scrollY > 55) {
                header!.classList.add('fixed')
                headertext!.style.display = "flex";
            }else{
                header!.classList.remove('fixed')
                headertext!.style.display = "none";
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', fixheader)
        return () => {
            window.removeEventListener('scroll', fixheader);
        };
    },[])

    const navtorestaurant = (id:any) => {
        const hotelid = window.location.pathname.split("/")[1];
        navigate(`/${hotelid}/${id}`)
    }

    if(loading) {
        return(<Uniloader/>)
    };

    return(<>{Data && cuisine && <div className='cuisinepage'>
        <div className='mpheader' id='mpheader'>
            <div className='backtitle'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='headertext' id='headertext'>{cuisine.name}</h3>
            </div>
        </div>

        <div className='cuisinestop' style={{backgroundImage: `url(${cuisine.image})`}}>
            <div className='cuisinestoplayer'>
                {cuisine.image &&
                <div className='tccuisineimgholder'>
                    <img className='tccuisineimg' src={cuisine.image} alt="cuisine"/>
                </div>
                }
                <p className='tccuisinename'>{cuisine.name}</p>
            </div>
        </div>

        <h5 className="tcrestaurantheading">{`Restaurants Serving ${cuisine.name}`}</h5>

        <div className="restaurantholder" id="restaurantscontainer">
        {Data && Data.map((eachRestaurant: any) => (
            <div key={eachRestaurant._id} className="restaurantcard" onClick={()=>navtorestaurant(eachRestaurant._id)}>
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
    </div>}</>)
}
export default Topcuisinespage;