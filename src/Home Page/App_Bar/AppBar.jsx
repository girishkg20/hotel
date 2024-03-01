import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./AppBar.css";
import profilelogo from "./Source/account.png";
import Searchbar from "../Search_Bar/SearchBar.tsx";
import Homepagedata from '../Home_Page_API/HomePageData.jsx';


const Appbar = () => {
  window.onscroll = function () {
    Headfix();
  };

  const {Hotelname} = useContext(Homepagedata);
  const [head, sethead] = useState();
  const [position, setposition] = useState();

  useEffect(() => {
    sethead (document.getElementById("header"));
    if (head) {
      setposition(head.offsetTop);
    }
  }, [head]);

  function Headfix() {
    if (window.scrollY > position) {
      head.classList.add("sticky");
    } else {
      head.classList.remove("sticky");
    }
  }


  return (
    <>
      <div className="header" id="header">

        <div className="appbar">

          <h3 className="hotelname" id="hotelname">{Hotelname}</h3>
          <Link id="profilelogo" to="profile">
            <img className="profile" id="profilebtn" src={profilelogo} alt="Profile"/>
          </Link>

        </div>

        <div className="searchbarcontainer">
          <Searchbar/>
        </div>

      </div>

      <hr className="linehidden" />
    </>
  );
};
export default Appbar;