import KeepAlive from "react-activation";

import Menupage from "./Menu_Page/MenuPage";
import Menupageapi from "./Menu_Page_API/MenuPageApi";




const Menupage1 = () => {

    return(<>
        <KeepAlive cacheKey='menu' name="menu">
            <Menupageapi>
                <Menupage/>
            </Menupageapi>
        </KeepAlive>
    </>)
}
export default Menupage1;