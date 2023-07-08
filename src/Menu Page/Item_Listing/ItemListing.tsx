import './Item_Listing.css';
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';
import right from './Source/right.png'
import { useContext, useEffect, useState } from 'react';

import Menupagedata from '../Menu_Page_API/MenuPageData';
import React from 'react';




const Itemlisting = () => {

    const { menu } = useContext(Menupagedata);

    const [Menu, setMenu] = useState<any>([{}]);

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




    return (
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
                                            eachfooditem.veg_status == "nonveg" ? non_veg : egg
                                        } alt="Veg Status" />
                                        <p className="itemname">{eachfooditem.name}</p>
                                        <p className="itemprice">₹ {eachfooditem.original_price}</p>
                                        <p className="morebutton">
                                            More Details <img className="arrowright" src={right} alt="" />
                                        </p>
                                    </div>

                                    <div className="foodimageside">
                                        {eachfooditem.food_image && (
                                            <img className="foodimage" src={eachfooditem.food_image} alt="Food Image" />
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
                                                    eachfooditem.veg_status == "non_veg" ? non_veg : egg
                                                } alt="Veg Status"/>
                                                <p className="itemname">{eachfooditem.name}</p>
                                                <p className="itemprice">₹ {eachfooditem.original_price}</p>
                                                <p className="morebutton">
                                                    More Details <img className="arrowright" src={right} alt="" />
                                                </p>
                                            </div>

                                            <div className="foodimageside">
                                                {eachfooditem.food_image && (
                                                    <img className="foodimage" src={eachfooditem.food_image} alt="Food Image" />
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
        </>
    );
};
export default Itemlisting;