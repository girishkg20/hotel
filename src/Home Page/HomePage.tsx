import KeepAlive from 'react-activation';

//components
import Brandbanner from './Brand_Banner/BrandBanner.jsx';
import AppBar from './App_Bar/AppBar.jsx';
import Breakfastbanner from './Breakfast_Banner/BreakfastBanner.jsx';
import Topcuisines from './Top_Cuisines/TopCuisines.jsx';
import Restaurantslisting from './Restaurants_Listing/RestaurantsListing.jsx';
import Endimage from './End_Image/EndImage.jsx';
import Homepageapi from './Home_Page_API/HomePageApi.jsx';


const Homepage = () => {
  
  return (
    <KeepAlive cacheKey='home'>

      <Homepageapi>
        <Brandbanner />
        <AppBar />
        <Breakfastbanner />
        <Topcuisines />
        <Restaurantslisting />
        <Endimage />
      </Homepageapi>

    </KeepAlive>
  );

};
export default Homepage;