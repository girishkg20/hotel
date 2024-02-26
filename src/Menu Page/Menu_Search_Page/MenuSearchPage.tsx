import "./MenuSearchPage.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Menupagedata from "../Menu_Page_API/MenuPageData";
import Menusearchbar from "../Menu_Search_Bar/MenuSearchBar";






const Menusearchpage = () => {

    const {menu} = useContext(Menupagedata);
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    document.body.style.overflow = "hidden"

    // console.log(menu);

    
    

    return(<>
        <div className="newpage">
            {/* <h1>Search page</h1> */}
            <Menusearchbar/>
        </div>
    </>)
}
export default Menusearchpage;