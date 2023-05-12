import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./AppBar.css";
import profilelogo from "./Source/account.png";
import Searchbar from "../Search_Bar/SearchBar.tsx";
import Homepagedata from '../Home_Page_API/HomePageData.jsx';
// import {savetextentered} from '../Search_Bar/SearchBar.tsx';
// import { RootState } from '../../Redux/store';
import printpage from '../HomePage';
import { useSelector } from 'react-redux';

const Appbar = () => {
  window.onscroll = function () {
    Headfix();
  };
/////////////////////////////Redux

const entered = useSelector((state) => state.enteredText.value)
const savetextentered = () => {
        console.log(entered);
}


//////////////////////////////Redux
  const {Hotelname, Cuisines, Data} = useContext(Homepagedata);
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
          <Link id="profilelogo" to="profile" onClick={savetextentered}>
            <img className="profile" id="profilebtn" src={profilelogo} alt="Profile"/>
          </Link>

        </div>

        <Searchbar/>

      </div>

      <hr className="linehidden" /> 
    </>
  );
};
export default Appbar;