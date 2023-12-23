import KeepAlive from 'react-activation';

import Homepageapi from './Home_Page_API/HomePageApi.jsx';
import Homepage from './Home_Page/HomePage';


const Homepage1 = () => {

  
  return (
    <KeepAlive cacheKey='home'>
        <Homepageapi>
            <Homepage/>
        </Homepageapi>
    </KeepAlive>
  );

};
export default Homepage1;