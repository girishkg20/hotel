import KeepAlive from "react-activation";
import Topcuisinespage from "./Top_Cuisines_Page/TopCuisinesPage";


const Topcuisinespage1 = () => {

    return(<>
        <KeepAlive cacheKey="topcuisines" name="topcuisines">
            <Topcuisinespage/>
        </KeepAlive>
    </>)
}
export default Topcuisinespage1;