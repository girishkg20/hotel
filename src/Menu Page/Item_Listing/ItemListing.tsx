import './ItemListing.css';
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';
import right from './Source/right.png';
import menulogo from './Source/menu.png';
import Loginpage from '../../Login Page/LoginPage';
import { useContext, useEffect, useState } from 'react';

import Menupagedata from '../Menu_Page_API/MenuPageData';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';





const Itemlisting = () => {

    const filterclicked = useSelector((state:any) => state.VegFilterSlice.value);

    const { menu } = useContext(Menupagedata);

    const [Menu, setMenu] = useState<any>([{}]);

    const [image, setimage] = useState<any>();
    const [item_name, setitem_name] = useState<any>();
    const [veg_status, setveg_status] = useState<any>();
    const [price, setprice] = useState<any>();
    const [dprice, setdprice] = useState<any>();
    const [defprice, setdefprice] = useState<any>();
    const [dcprice, setdcprice] = useState<any>();
    const [description, setdescription] = useState<any>();
    const [avail, setavail] = useState<any>();
    const [availmsg, setavailmsg] = useState<any>();
    const [customisable, setcustomisable] = useState<any>();
    const [addon, setaddon] = useState<any>();

    useEffect(() => {

        if (menu && menu.foodItemCategory && menu.vegfoodItemCategory) {

            if (filterclicked == true) {
                setMenu(menu.vegfoodItemCategory)
            } else {
                setMenu(menu.foodItemCategory)
            }
            
            console.log(Menu);          ///////////Last Remove this log

        } else {
            console.log("Menu not set");
        }

    }, [menu, filterclicked])


    useEffect(() => {

        Object.keys(Menu).forEach((eachcatagorykey) => {
            
            const showcatname = () => {

                if (document.getElementById(eachcatagorykey) && document.getElementById(eachcatagorykey)!.style && document.getElementById(Menu[eachcatagorykey].name) && document.getElementById(Menu[eachcatagorykey].name)!.style) {

                    if (window.scrollY > document.getElementById(Menu[eachcatagorykey].name)!.offsetTop - 90) {
                        document.getElementById(eachcatagorykey)!.style.visibility = 'visible';
                    } else {
                        document.getElementById(eachcatagorykey)!.style.visibility = 'hidden';
                    };

                    window.scrollY > document.getElementById(Menu[eachcatagorykey].name)!.offsetTop - 145 && (
                        activefab(`fab-${eachcatagorykey}`)
                    );

                };
                
            };

            window.addEventListener('scroll', showcatname);
            return () => {
                window.removeEventListener('scroll', showcatname);
            }

        });

    },[Menu]);

    const navigate = useNavigate();
    const {itemid} = useParams();

    const openclose = (fid:string, iid:string) => {
        const foodcard = document.getElementById(fid);
        const foodcardbtn = document.getElementById(iid);

        if (foodcard!.style.display == 'none') {
            foodcard!.style.display = ''
            foodcardbtn!.style.rotate = '270deg'
            foodcardbtn!.style.removeProperty('animation')
        }
        else{
            foodcard!.style.display = 'none'
            foodcardbtn!.style.rotate = '90deg'
            foodcardbtn!.style.animation = 'rotationanimation 0.5s ease'
        }
    };

    const fabopenclose = () => {
        let fab = document.getElementById('fabset');

        if (fab!.style.display != 'flex') {
            fab!.style.display = 'flex'
            document.body.style.overflow = "hidden"
        }else{
            fab!.style.display = 'none'
            document.body.style.overflow = 'scroll'
        }
    };

    const scrollto = (id:string) => {
        const headerheight = document.getElementById('mpheader')!.offsetHeight;
        const catdiv = document.getElementById(id);
        const catdivtop = catdiv!.getBoundingClientRect().top + window.scrollY;
        
        if (catdivtop) {
            window.scrollTo({
                top: catdivtop! - 80 - headerheight,
                behavior: 'smooth'
            });
        }

        fabopenclose();
    };

    const activefab = (id: string) => {
        const alreadyactivefab = document.querySelectorAll('.catactive');
        alreadyactivefab.forEach((element:any) => {element.classList.remove('catactive')})

        document.getElementById(id)!.classList.add('catactive');
    };
    
    const handlePopstate = () => {
        document.body.style.overflow = "scroll";
        window.removeEventListener("popstate", handlePopstate);
      };
    window.addEventListener("popstate", handlePopstate);

    let itemaddedcount = 0;

    const increaseitem = () => {
        itemaddedcount++
        console.log(itemaddedcount);
        
    }

    const decreaseitem = () => {
        itemaddedcount--
        console.log(itemaddedcount);
        
    }

    const checkAuth = () => {
        navigate("login");
    }

    
    const generateData = (
            iimage: any,
            iname: any,
            vstate: any,
            iprice: any,
            diprice: any,
            defaultp: any,
            discountp: any,
            idescription: any,
            iavail: any,
            iavailmsg: any,
            icustomisable: any,
            iaddon: any,
            itemid: any
            ) => {
        setimage(iimage)
        setitem_name(iname)
        setveg_status(vstate)
        setprice(iprice)
        setdprice(diprice)
        setdefprice(defaultp)
        setdcprice(discountp)
        setdescription(idescription)
        setavail(iavail)
        setavailmsg(iavailmsg)
        setcustomisable(icustomisable)
        setaddon(iaddon)

        navigate(itemid)
    }
    



    return (<Menupagedata.Provider value={{image, item_name, veg_status, price, dprice, defprice, dcprice, description, avail, availmsg, customisable, addon}}>
        <>
            <div className="fullmenu">
                <div><h2 className="menuheading">- Menu -</h2></div>

                {Object.keys(Menu).map((eachcatagorykey) => (
                    Menu[eachcatagorykey].count > 0 && (
                        <div className="catagory" key={`catagory-${eachcatagorykey}`}>

                            {Menu[eachcatagorykey].food_items.length > 0
                                ?<div className='catheadcard' onClick={() => openclose(`allfooditems-${eachcatagorykey}`,`catbutton-${eachcatagorykey}`)}>
                                    <h3 className="cat" id={Menu[eachcatagorykey].name}>{`${Menu[eachcatagorykey].name} (${Menu[eachcatagorykey].count})`}</h3>
                                    <div className='catbuttonbox'><img id={`catbutton-${eachcatagorykey}`} className="catbutton" src={right} alt=">"/></div>
                                </div>
                                :<h3 className="cat" id={Menu[eachcatagorykey].name}>{`${Menu[eachcatagorykey].name} (${Menu[eachcatagorykey].count})`}</h3>
                            }
                            <div id={`allfooditems-${eachcatagorykey}`}>
                                <div className='catfixed' id={eachcatagorykey}>
                                    <h3 className='catname'>{`${Menu[eachcatagorykey].name} (${Menu[eachcatagorykey].count})`}</h3>
                                </div>

                                {
                                    Menu[eachcatagorykey].food_items &&

                                    Menu[eachcatagorykey].food_items.map((eachfooditem: any) => (
                                        <div className="foodcard" key={`foodcard-${eachcatagorykey}-${eachfooditem.name}`}>

                                            <div className="fooditemside">
                                                <img className="vegstatus" src={
                                                    eachfooditem.veg_status == "veg" ? veg :
                                                    eachfooditem.veg_status == "egg" ? egg : non_veg
                                                } alt="Veg Status" />
                                                <p className="itemname">{eachfooditem.name}</p>

                                                {
                                                    eachfooditem.price == 0 ?
                                                        <div className='pricebox'>
                                                            <p className="itemprice">₹ {Math.round(eachfooditem.default_price)}</p>
                                                            <p className="displayprice">₹ {Math.round(eachfooditem.default_price - eachfooditem.discounted_price_rupees)}</p>
                                                        </div>:
                                                    eachfooditem.hasOwnProperty('offer_price')?
                                                        <div className='pricebox'>
                                                            <p className="itemprice">₹ {Math.round(eachfooditem.price)}</p>
                                                            <p className="displayprice">₹ {Math.round(eachfooditem.offer_price)}</p>
                                                        </div>:
                                                        <div className='pricebox'>
                                                            <p className="displayprice">₹ {Math.round(eachfooditem.price)}</p>
                                                        </div>
                                                }

                                                <p className="morebutton" onClick={() =>
                                                        generateData(
                                                            eachfooditem.food_image,
                                                            eachfooditem.name,
                                                            eachfooditem.veg_status,
                                                            eachfooditem.price,
                                                            eachfooditem.offer_price,
                                                            eachfooditem.default_price,
                                                            eachfooditem.discounted_price_rupees,
                                                            eachfooditem.description,
                                                            eachfooditem.availablity.availability,
                                                            eachfooditem.availablity.availability_message,
                                                            eachfooditem.customisation_steps.length,
                                                            eachfooditem.addon_group.length,
                                                            eachfooditem._id
                                                        )
                                                    }>
                                                    More Details <img className="arrowright" src={right} alt="" />
                                                </p>
                                            </div>

                                            <div className="foodimageside">
                                                {eachfooditem.food_image && (
                                                    <img className="foodimage" loading='lazy' style={eachfooditem.availablity.availability == false ? {filter: 'grayscale(80%)'}:{}} src={eachfooditem.food_image} alt="Food Image" onClick={() =>
                                                        generateData(
                                                            eachfooditem.food_image,
                                                            eachfooditem.name,
                                                            eachfooditem.veg_status,
                                                            eachfooditem.price,
                                                            eachfooditem.offer_price,
                                                            eachfooditem.default_price,
                                                            eachfooditem.discounted_price_rupees,
                                                            eachfooditem.description,
                                                            eachfooditem.availablity.availability,
                                                            eachfooditem.availablity.availability_message,
                                                            eachfooditem.customisation_steps.length,
                                                            eachfooditem.addon_group.length,
                                                            eachfooditem._id
                                                        )
                                                    }/>
                                                )}
                                                {eachfooditem.availablity.availability == false
                                                    ? <p className='notavailable'>{eachfooditem.availablity.availability_message}</p>
                                                    : <>
                                                        <button className="addbutton" onClick={() => checkAuth()}>ADD</button>
                                                        {/* <button className="addedbutton">
                                                            <p className='addsub' onClick={() => decreaseitem()}>-</p>
                                                            <p>{itemaddedcount}</p>
                                                            <p className='addsub' onClick={() => increaseitem()}>+</p>
                                                        </button> */}
                                                        {(eachfooditem.customisation_steps.length || eachfooditem.addon_group.length) > 0 &&
                                                            (<p className='custotext'>Customisable</p>)}
                                                    </>
                                                }
                                            </div>

                                        </div>
                                    ))
                                }

                                {
                                    Menu[eachcatagorykey].subcategories &&

                                    Object.keys(Menu[eachcatagorykey].subcategories).map((eachsubcategorieskey) => (
                                        Menu[eachcatagorykey].subcategories[eachsubcategorieskey].food_items.length > 0 && (
                                            <React.Fragment key={`subcat-${eachcatagorykey}-${eachsubcategorieskey}`}>

                                                <div className='subcatheadcard' onClick={() => openclose(`allfooditems-${eachsubcategorieskey}`, `catbutton-${eachsubcategorieskey}`)}>
                                                    <h4 className="subcat">{`${Menu[eachcatagorykey].subcategories[eachsubcategorieskey].name} (${Menu[eachcatagorykey].subcategories[eachsubcategorieskey].food_items.length})`}</h4>
                                                    <div className='subcatbuttonbox'><img id={`catbutton-${eachsubcategorieskey}`} className="catbutton" src={right} alt=">"/></div>
                                                </div>
                                                <div id={`allfooditems-${eachsubcategorieskey}`}>
                                                    {Menu[eachcatagorykey].subcategories[eachsubcategorieskey].food_items.map((eachfooditem: any) => (
                                                        <div className="foodcard" key={`foodcard-${eachcatagorykey}-${eachsubcategorieskey}-${eachfooditem.name}`}>

                                                            <div className="fooditemside">
                                                                <img className="vegstatus" src={
                                                                    eachfooditem.veg_status == "veg" ? veg :
                                                                    eachfooditem.veg_status == "egg" ? egg : non_veg
                                                                } alt="Veg Status"/>
                                                                <p className="itemname">{eachfooditem.name}</p>
                                                                
                                                                {
                                                                    eachfooditem.price == 0 ?
                                                                        <div className='pricebox'>
                                                                            <p className="itemprice">₹ {Math.round(eachfooditem.default_price)}</p>
                                                                            <p className="displayprice">₹ {Math.round(eachfooditem.default_price - eachfooditem.discounted_price_rupees)}</p>
                                                                        </div>:
                                                                    eachfooditem.hasOwnProperty('offer_price')?
                                                                        <div className='pricebox'>
                                                                            <p className="itemprice">₹ {Math.round(eachfooditem.price)}</p>
                                                                            <p className="displayprice">₹ {Math.round(eachfooditem.offer_price)}</p>
                                                                        </div>:
                                                                        <div className='pricebox'>
                                                                            <p className="displayprice">₹ {Math.round(eachfooditem.price)}</p>
                                                                        </div>
                                                                }

                                                                <p className="morebutton" onClick={() =>
                                                                    generateData(
                                                                        eachfooditem.food_image,
                                                                        eachfooditem.name,
                                                                        eachfooditem.veg_status,
                                                                        eachfooditem.price,
                                                                        eachfooditem.offer_price,
                                                                        eachfooditem.default_price,
                                                                        eachfooditem.discounted_price_rupees,
                                                                        eachfooditem.description,
                                                                        eachfooditem.availablity.availability,
                                                                        eachfooditem.availablity.availability_message,
                                                                        eachfooditem.customisation_steps.length,
                                                                        eachfooditem.addon_group.length,
                                                                        eachfooditem._id
                                                                    )
                                                                }>
                                                                    More Details <img className="arrowright" src={right} alt="" />
                                                                </p>
                                                            </div>

                                                            <div className="foodimageside">
                                                                {eachfooditem.food_image && (
                                                                    <img className="foodimage" loading='lazy' style={eachfooditem.availablity.availability == false ? {filter: 'grayscale(80%)'}:{}} src={eachfooditem.food_image} alt="Food Image" onClick={() =>
                                                                        generateData(
                                                                            eachfooditem.food_image,
                                                                            eachfooditem.name,
                                                                            eachfooditem.veg_status,
                                                                            eachfooditem.price,
                                                                            eachfooditem.offer_price,
                                                                            eachfooditem.default_price,
                                                                            eachfooditem.discounted_price_rupees,
                                                                            eachfooditem.description,
                                                                            eachfooditem.availablity.availability,
                                                                            eachfooditem.availablity.availability_message,
                                                                            eachfooditem.customisation_steps.length,
                                                                            eachfooditem.addon_group.length,
                                                                            eachfooditem._id
                                                                        )
                                                                    }/>
                                                                )}
                                                                {eachfooditem.availablity.availability == false
                                                                    ? <p className='notavailable'>{eachfooditem.availablity.availability_message}</p>
                                                                    : <><button className="addbutton">ADD</button>
                                                                        {(eachfooditem.customisation_steps.length || eachfooditem.addon_group.length) > 0 &&
                                                                        <p className='custotext'>Customisable</p>}
                                                                    </>
                                                                }
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </React.Fragment>
                                        )
                                    ))
                                }
                            </div>
                        </div>
                    )
                ))}
                <div id='fabset' className='fabset'>
                    <div className='popoverlay' onClick={() => fabopenclose()}></div>
                    <div className='menufab'>
                        <h3 className='fabheader'>- Menu -</h3>

                        {Object.keys(Menu).map((eachcatagorykey) => (
                            Menu[eachcatagorykey].count > 0 && (
                                <div key={`fab-${eachcatagorykey}`} id={`fab-${eachcatagorykey}`} className='fabcat' onClick={() => {
                                    scrollto(Menu[eachcatagorykey].name);
                                    activefab(`fab-${eachcatagorykey}`);
                                    }}>
                                    <div className='fabcatname'>{Menu[eachcatagorykey].name}</div>
                                    <div>{Menu[eachcatagorykey].count}</div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className='fabbutton' onClick={() => fabopenclose()}>
                    <img className='menulogo' src={menulogo} alt="Menu"/>
                    <p>Menu</p>
                </div>
                
            </div>
            <Outlet/>
        </></Menupagedata.Provider>
    );
};
export default Itemlisting;