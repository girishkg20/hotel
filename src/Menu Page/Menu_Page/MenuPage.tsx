import './MenuPage.css';
import backbutton from './Source/back.png';
import Merchantinfo from '../Merchant_Info/MerchantInfo';
import Menusearchbar from '../Menu_Search_Bar/MenuSearchBar';
import Itemlisting from '../Item_Listing/ItemListing';
import veg from './Source/veg.png';
import reset from './Source/reset.png';
import search from './Source/search.png';
import fssai from './Source/fssai_logo.png';
import { useContext, useEffect, useState } from 'react';
import Menupagedata from '../Menu_Page_API/MenuPageData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectvegfilter } from '../VegfilterSlice';
import restaurantclosed from './Source/restaurant_closed.png';
import Uniloader from '../../Universal Loader/UniLoader';


const Menupage = () => {

    const Dispatch = useDispatch();
    
    const {menu} = useContext(Menupagedata);
    const [Restaurantname, setRestaurantname] = useState<any>();
    const [fssainumber, setfssainumber] = useState<any>("");
    const [area, setarea] = useState<any>();
    const [address, setaddress] = useState<any>();
    const [restaurantimage, setrestaurantimage] = useState<any>();
    const [loading, setloading] = useState<boolean>(true);
    const navigate = useNavigate();
    
    useEffect(() => {

        if (menu && menu.merchant && menu.merchant.name) {
          setRestaurantname(menu.merchant.name);
          setfssainumber(menu.merchant.fssi_certificate);
          setarea(menu.merchant.area_name);
          setaddress(menu.merchant.full_address);
          setrestaurantimage(menu.merchant.cover_image);
          Dispatch(selectvegfilter(false));
          setloading(false);
        } else {
          setRestaurantname("Loading...");
        }

    }, [menu]);
    

    const [vegbtn, setVegbtn] = useState <HTMLDivElement | null>();
    const [restbtn, setRestbtn] = useState <HTMLImageElement | null>();
    const [header, setHeader] = useState <HTMLDivElement | null>();
    const [headertext, setHeadertext] = useState <HTMLHeadingElement | null>();
    const [msearchbar, setMsearchbar] = useState <HTMLDivElement | null>();
    const [searchbtn, setSearchbtn] = useState <HTMLImageElement | null>();

    useEffect(() => {
        setVegbtn(document.getElementById("vegbutton") as HTMLDivElement | null);
        setRestbtn(document.getElementById("reset") as HTMLImageElement | null);
        setHeader(document.getElementById("mpheader") as HTMLDivElement | null);
        setHeadertext(document.getElementById("headertext") as HTMLHeadingElement | null);
        setMsearchbar(document.getElementById("msearchbar") as HTMLDivElement | null);
        setSearchbtn(document.getElementById("hsearchlogo") as HTMLImageElement | null);

        window.addEventListener('scroll', whenscroll)
        return () => {
            window.removeEventListener('scroll', whenscroll);
        };

    },[header, loading]);


    const select = () => {

        if (vegbtn!.classList.contains("selected")){
            vegbtn!.classList.remove('selected')
            restbtn!.style.display = "none";
            Dispatch(selectvegfilter(false))
        }else{
            vegbtn!.classList.add('selected');
            restbtn!.style.display = "flex";
            Dispatch(selectvegfilter(true))
        }
         
    }

    const fixheader = () => {

        if (window.scrollY > 55) {
            header!.classList.add('fixed')
            headertext!.style.display = "flex";
        }else{
            header!.classList.remove('fixed')
            headertext!.style.display = "none";
        }
        
    }

    const addsearchbutton = () => {

        let top = msearchbar?.offsetTop;
        let SBposition = top! - 40

        if (window.scrollY > SBposition!) {
            searchbtn!.style.display = "flex";
        }else{
            searchbtn!.style.display = "none";
        }
    }

    const whenscroll = () => {
        if (header && headertext && searchbtn) {
            fixheader();
            addsearchbutton();
        }
    }

    if(loading) {
        return (<Uniloader/>);
    };

    if((menu.merchant.open_status || menu.merchant.status) < 1) {
        return(<>
            <div className="nrholder">
              <img src={restaurantclosed} alt="!" width={192}/>
              <h6 className="nrmessage">Sorry, this restaurant is currently closed. Please try again later :&#40;</h6>
              <div className='rcbtnholder'>
                <button className='getotpbutton' onClick={() => navigate(-1)}>Back to Restaurants</button>
              </div>
            </div>
        </>)
    };
    

    return(<>
        <div className='mpheader' id='mpheader'>
            <div className='backtitle'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='headertext' id='headertext'>{Restaurantname}</h3>
            </div>
            <img className='hsearchlogo' id='hsearchlogo' src={search} alt="search"/>
        </div>

        <div className='menupagetop' style={{backgroundImage: `url(${restaurantimage})`}}><Merchantinfo/></div>
                 
        <div id='msearchbar'><Menusearchbar/></div>

        <div className='filters'>
            <hr className='filterline'/>
            <div className='vegbutton' id='vegbutton' onClick={select}>
                <img className='vegimg' src={veg} alt="Veg" />
                <p className='vegtext'>Veg</p>
                <img className='reset' id='reset' src={reset} alt="reset"/>
            </div>
        </div>

        <Itemlisting/>

        <div className='fssaicard'>
            {fssainumber != "" &&
                <div className='fssaiholder'>
                    <img className='fssailogo' src={fssai} alt="FSSAI" />
                    <p className='fssaino'>License No. {fssainumber}</p>
                </div>
            }
            <p className='frestaurantname'>{Restaurantname}</p>
            <p className='fareaname'>{area}</p>
            <p className='faddress'>{address}</p>
            <p className='fdisclaimer'>Disclaimer:</p>
            <ul className='fnote'>
                <li>Food image is for representational purposes only</li>
                <li>All prices are set directly by the merchants</li>
            </ul>
        </div>
        
    </>);
};
export default Menupage;