import { useEffect } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';

import Homepageapi from './Home_Page_API/HomePageApi.jsx';
import Homepage from './Home_Page/HomePage';


const Homepage1 = () => {

  const {dropScope} = useAliveController();

  useEffect( () => {
    dropScope("menu");
  },[]);
  
  
  return (
    <KeepAlive cacheKey='home'>
        <Homepageapi>
            <Homepage/>
        </Homepageapi>
    </KeepAlive>
  );

};
export default Homepage1;