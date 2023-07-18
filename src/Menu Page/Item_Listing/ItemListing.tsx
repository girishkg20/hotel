import './Item_Listing.css';
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';
import right from './Source/right.png'
import { useContext, useEffect, useState } from 'react';

import Menupagedata from '../Menu_Page_API/MenuPageData';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';





const Itemlisting = () => {

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

    useEffect(() => {

        if (menu && menu.foodItemCategory) {
            setMenu(menu.foodItemCategory)
            console.log(Menu);          ///////////Last Remove this log

        } else {
            console.log("Menu not set");
        }

    }, [menu])


    useEffect(() => {

        Object.keys(Menu).forEach((eachcatagorykey) => {
            
            const showcatname = () => {

                if (document.getElementById(eachcatagorykey) && document.getElementById(eachcatagorykey)!.style) {

                    if (window.scrollY > document.getElementById(Menu[eachcatagorykey].name)!.offsetTop - 90) {
                        document.getElementById(eachcatagorykey)!.style.visibility = 'visible'; 
                    } else {
                        document.getElementById(eachcatagorykey)!.style.visibility = 'hidden';
                    };

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
    
    const generateData = (
            iimage: any,
            iname: any,
            vstate: any,
            iprice: any,
            diprice: any,
            defaultp: any,
            discountp: any,
            idescription: any,
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

        navigate(itemid)
    }
    



    return (<Menupagedata.Provider value={{image, item_name, veg_status, price, dprice, defprice, dcprice, description}}>
        <>
            <div className="fullmenu">
                <div><h2 className="menuheading">- Menu -</h2></div>

                {Object.keys(Menu).map((eachcatagorykey) => (
                    <div className="catagory" key={`catagory-${eachcatagorykey}`}>

                        <h3 className="cat" id={Menu[eachcatagorykey].name}>{Menu[eachcatagorykey].name}</h3>
                        <div className='catfixed' id={eachcatagorykey}>
                            <h3 className='catname'>{Menu[eachcatagorykey].name}</h3>
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
                                                    eachfooditem._id
                                                )
                                            }>
                                            More Details <img className="arrowright" src={right} alt="" />
                                        </p>
                                    </div>

                                    <div className="foodimageside">
                                        {eachfooditem.food_image && (
                                            <img className="foodimage" loading='lazy' src={eachfooditem.food_image} alt="Food Image" onClick={() =>
                                                generateData(
                                                    eachfooditem.food_image,
                                                    eachfooditem.name,
                                                    eachfooditem.veg_status,
                                                    eachfooditem.price,
                                                    eachfooditem.offer_price,
                                                    eachfooditem.default_price,
                                                    eachfooditem.discounted_price_rupees,
                                                    eachfooditem.description,
                                                    eachfooditem._id
                                                )
                                            }/>
                                        )}
                                        <button className="addbutton">ADD</button>
                                    </div>

                                </div>
                            ))
                        }

                        {
                            Menu[eachcatagorykey].subcategories &&

                            Object.keys(Menu[eachcatagorykey].subcategories).map((eachsubcategorieskey) => (
                                <React.Fragment key={`subcat-${eachcatagorykey}-${eachsubcategorieskey}`}>
                                    <h4 className="subcat">{Menu[eachcatagorykey].subcategories[eachsubcategorieskey].name}</h4>

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
                                                        eachfooditem._id
                                                    )
                                                }>
                                                    More Details <img className="arrowright" src={right} alt="" />
                                                </p>
                                            </div>

                                            <div className="foodimageside">
                                                {eachfooditem.food_image && (
                                                    <img className="foodimage" loading='lazy' src={eachfooditem.food_image} alt="Food Image" onClick={() =>
                                                        generateData(
                                                            eachfooditem.food_image,
                                                            eachfooditem.name,
                                                            eachfooditem.veg_status,
                                                            eachfooditem.price,
                                                            eachfooditem.offer_price,
                                                            eachfooditem.default_price,
                                                            eachfooditem.discounted_price_rupees,
                                                            eachfooditem.description,
                                                            eachfooditem._id
                                                        )
                                                    }/>
                                                )}
                                                <button className="addbutton">ADD</button>
                                            </div>

                                        </div>
                                    ))}
                                </React.Fragment>
                            ))
                        }
                    </div>
                ))}
            </div>
            <Outlet/>
        </></Menupagedata.Provider>
    );
};
export default Itemlisting;