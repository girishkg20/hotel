import "./HomePage.css";
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useAliveController } from "react-activation";

//components
import Brandbanner from '../Brand_Banner/BrandBanner';
import Appbar from '../App_Bar/AppBar';
import Breakfastbanner from '../Breakfast_Banner/BreakfastBanner.jsx';
import Topcuisines from '../Top_Cuisines/TopCuisines.jsx';
import Restaurantslisting from '../Restaurants_Listing/RestaurantsListing.jsx';
import Endimage from '../End_Image/EndImage.jsx';
import Uniloader from '../../Universal Loader/UniLoader';

//Resources
import Homepagedata from '../Home_Page_API/HomePageData.jsx';
import norestaurants from './Source/no_restaurants_found.png';
import {clearsearchdatapositions} from '../../Search Page/SearchDataSlice';


const Homepage = () => {

  const {Data} = useContext(Homepagedata);

  const dispatch = useDispatch();

  const [loading, setloading] = useState<boolean>(true);
  const [restaurantfound, setrestaurantfound] = useState<boolean>(false);

  // clearing unwanted data
  const {dropScope} = useAliveController();
  const searchdatapos = useSelector((state:any) => state.searchdatapositions.value.searchkey);

  dropScope("topcuisines");
  searchdatapos && dispatch(clearsearchdatapositions());
  // clearing unwanted data
  
  useEffect(() => {
    
    if(Data) {
      setloading(false);
    }

    if(Data && Data.length > 0) {
      setrestaurantfound(true);
    }

  },[Data])

  if(loading) {
    return(<Uniloader/>)
  };

  if(!restaurantfound) {

    return(
      <div className="nrholder">
        <img src={norestaurants} alt="!" width={192}/>
        <h6 className="nrmessage">Unfortunately, we are not serviceable at this location :&#40;</h6>
      </div>
    )

  };
  
  return (<>
    <Brandbanner />
    <Appbar />
    <Breakfastbanner />
    <Topcuisines />
    <Restaurantslisting />
    <Endimage />
  </>);

};
export default Homepage;