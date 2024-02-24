import { useContext, useEffect, useState } from 'react';
import './TopCuisines.css';
import Homepagedata from '../Home_Page_API/HomePageData.jsx';
import { useNavigate } from 'react-router-dom';


const Topcuisines = () => {
  const { Cuisines } = useContext(Homepagedata);
  let defaultcuisineimage = "https://tipplr-media.s3.ap-south-1.amazonaws.com/images/cuisine_imagezKI4Ho6kGTZ8UFNMo0DK.jpg";

  const navigate = useNavigate();

  return (
    <>
      <div className="cuisineset">

        <h5 className="cuisineheading">Top Cuisines</h5>

        <div className="cuisineholder" id="cuisineset">

          {Cuisines.map((eachCuisine: any) => (
            <div key={eachCuisine.name} className="cuisine" onClick={() => navigate('cuisine/'+ eachCuisine._id)}>
              <img className="cuisineimg" loading='lazy' src={eachCuisine.image ?? defaultcuisineimage} alt="" />
              <hr className="linevisible" />
              <p className="cuisinename">{eachCuisine.name}</p>
            </div>
          ))}

        </div>

      </div>
    </>
  );
}
export default Topcuisines;