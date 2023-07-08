import Homepageapi from "../Home Page/Home_Page_API/HomePageApi";
import Menupage from "./Menu_Page/MenuPage";
import Menupageapi from "./Menu_Page_API/MenuPageApi";




const Menupage1 = () => {

    return(<>
    <Homepageapi>
    <Menupageapi>
        <Menupage/>

    </Menupageapi>
    </Homepageapi>
    </>)
}
export default Menupage1;