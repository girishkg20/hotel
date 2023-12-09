import "./CustPopup.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import _ from 'lodash';

import veg from "./Source/veg.png";
import egg from "./Source/egg.png";
import non_veg from "./Source/non-veg.png";
import close from "./Source/close.png";
import tick from "./Source/tick.png";
import back from "./Source/back.png";

import Menupagedata from "../Menu_Page_API/MenuPageData";
import { addItem } from "../CartSlice";


const Custpopup = () => {
    const {fooditemdata} = useContext(Menupagedata);
    const fooditem = fooditemdata?.cart_data.food_items[0].original_food_item;
    const Fooditem = {...fooditemdata?.cart_data.food_items[0]};
    const payload = {...fooditemdata,
        cart_data: {...fooditemdata.cart_data,
            food_items: [Fooditem],
        }
    };
    
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    const [totalcards, settotalcards] = useState(0);
    const [activecard, setactivecard] = useState(0);
    const [varient, setvarient] = useState<any>([]);
    


    if(fooditemdata){
        document.body.style.overflow = "hidden"

        const handlePopstate = () => {
            document.body.style.overflow = "scroll";
            window.removeEventListener("popstate", handlePopstate);
        };
        window.addEventListener("popstate", handlePopstate);
    }

    
    useEffect(() => {
        const AllSteps = document.querySelectorAll("#AddonStepsCard");
        settotalcards(AllSteps.length);
        
        AllSteps.forEach((eachstep:any) => {
            eachstep.style.display = "none";
        })

        const ActiveStep = AllSteps[activecard] as HTMLElement;
        ActiveStep && (
            ActiveStep.style.display = "block"
        );
    },[activecard, fooditemdata])


    let selectedvarient:any;
    const nextStep = (name:any) => {

        const radiobtns = document.getElementsByName(name);

        radiobtns.forEach((radiobtn:any)=>{
            radiobtn.checked && (selectedvarient = JSON.parse(radiobtn.value));
        })
        
        if (selectedvarient == null) {
            
            const alertbox = document.getElementById('myAlert') as HTMLDivElement;
            alertbox.style.display = "block";
            alertbox.innerText = "Please select atlease 1 option";

            setTimeout(() => {
                alertbox.style.display = "none";
            },4000);

        }else{
            varient.push(selectedvarient);
            setactivecard(activecard + 1);
        }

    }

    const preStep = () => {
        varient.pop();
        setactivecard(activecard - 1);
    }



    const submitAll = (name:any) => {
        
        const radiobtns = document.getElementsByName(name);

        radiobtns.forEach((radiobtn:any)=>{
            radiobtn.checked && (selectedvarient = JSON.parse(radiobtn.value));
        })
        
        if (selectedvarient == null) {
            
            const alertbox = document.getElementById('myAlert') as HTMLDivElement;
            alertbox.style.display = "block";
            alertbox.innerText = "Please select atlease 1 option";

            setTimeout(() => {
                alertbox.style.display = "none";
            },4000);

        }else{
            varient.push(selectedvarient);
            Fooditem.variant_group = varient;
            pushtocart();
            navigate(-1);
        }
        
    };

    let selectedaddons:any[] = [];
    const submitAddons = (name:any) => {

        const addoncards = document.querySelectorAll('#cardcheck');
        let notselected = 0;

        addoncards.forEach( (eachcard:any) => {
            const requiredcount = eachcard.dataset.value1;
            let selectedcount = 0;

            const checkboxes = eachcard.querySelectorAll('[name="alladdons"]');

            checkboxes.forEach((eachcheckbox:any) => {
                eachcheckbox.checked && (selectedcount++);
            });

            selectedcount < requiredcount && (
                notselected++,
                eachcard.style.outline = '1px solid #D44222',
                eachcard.classList.add('shake'),
                setTimeout(() => {
                    eachcard.classList.remove('shake')
                    eachcard.style.removeProperty('outline')
                }, 800)
            );
        });

        if(notselected == 0) {
            const checkboxes = document.getElementsByName(name);

            checkboxes.forEach((checkbox:any)=>{
                checkbox.checked && (selectedaddons.push(JSON.parse(checkbox.value)));
            })

            varient.push(...selectedaddons);
            Fooditem.variant_group = varient;
            pushtocart();
            navigate(-1);
        }

    };

    ///////////////////////////// Our Customization

    let selectedcustomizations:any[] = [];
    const custsubmit = (id:any) => {

        const stepcard = document.getElementById(id);
        const addoncards = stepcard!.querySelectorAll('#cardcheck');
        let notselected = 0;

        addoncards.forEach((eachcard:any)=>{
            const requiredcount = eachcard.dataset.value1;
            let selectedcount = 0;

            const checkboxes = eachcard.querySelectorAll('[id="custselection"]');

            checkboxes.forEach((eachcheckbox:any) => {
                eachcheckbox.checked && (selectedcount++);
            });

            selectedcount < requiredcount && (
                notselected++,
                eachcard.style.outline = '1px solid #D44222',
                eachcard.classList.add('shake'),
                setTimeout(() => {
                    eachcard.classList.remove('shake')
                    eachcard.style.removeProperty('outline')
                }, 800)
            );
        });

        if(notselected == 0) {
            if(totalcards == activecard + 1) {
                const checkboxes = document.querySelectorAll('[id="custselection"]');

                checkboxes.forEach((checkbox:any)=>{
                    checkbox.checked && (selectedcustomizations.push(JSON.parse(checkbox.value)));
                })

                varient.push(...selectedcustomizations);
                Fooditem.customisation_steps = varient;
                pushtocart();
                navigate(-1);
            }else{
                setactivecard(activecard + 1);
            }
        };

    }

    ///////////////////////////// Our Customization

    const actualpayload = useSelector((state:any) => state.perReducers.addItem.value)
    const pushtocart = () => {

        if(actualpayload.hasOwnProperty("cart_data")) {
            const existingitem = actualpayload.cart_data.food_items.findIndex((eachitems:any) =>
                eachitems._id === Fooditem._id
                && _.isEqual(eachitems.addon_group, Fooditem.addon_group)
                && _.isEqual(eachitems.customisation_steps, Fooditem.customisation_steps)
                && _.isEqual(eachitems.variant_group, Fooditem.variant_group)
            )
            
            if (existingitem >= 0) {
                
                const duplicatepayload = {...actualpayload, 
                    cart_data: {...actualpayload.cart_data,
                        food_items: [...actualpayload.cart_data.food_items.slice(0, existingitem),
                            {...actualpayload.cart_data.food_items[existingitem],
                                quantity: actualpayload.cart_data.food_items[existingitem].quantity + Fooditem.quantity
                            },
                            ...actualpayload.cart_data.food_items.slice(existingitem + 1),
                        ],
                    },
                };

                const removeditem = duplicatepayload.cart_data.food_items.findIndex((eachitems:any) => eachitems.quantity < 1)
                removeditem >= 0 && duplicatepayload.cart_data.food_items.splice(removeditem, 1);
                
                Dispatch(addItem(duplicatepayload));
                
            }else{
                const duplicatepayload = {...actualpayload,
                    cart_data: {...actualpayload.cart_data,
                        food_items: [...actualpayload.cart_data.food_items, Fooditem]
                    }
                };

                Dispatch(addItem(duplicatepayload));
            };

        }else{
            Dispatch(addItem(payload));
        };

    };



    return(<>{ fooditemdata ? <>
        <div className='custpopoverlay' onClick={() => navigate(-1)}></div>

        <div className="custpopover">
            <div className="myAlert" id="myAlert"></div>
            <img className="custclosebutton" src={close} alt="Close" onClick={() => navigate(-1)}/>
            <div className="custheader">
                {fooditem.food_image && (
                    <img className="shortimage" src={fooditem.food_image} alt="Food Image"/>
                )}
                <div>
                    <img className="custvegstatus" src={
                        fooditem.veg_status == "veg" ? veg :
                        fooditem.veg_status == "egg" ? egg : non_veg
                    } alt="Veg Status" />
                    <p className="custitemname">{fooditem.name}</p>
                </div>
            </div>

            {activecard > 0 && varient.length > 0
                ?<div className="precardbtn" onClick={preStep}>
                    <p className="selecteditem">{varient[varient.length - 1].title}</p>
                    <p className="changeselecteditem">Change</p>
                </div>

                :activecard > 0 &&
                <div className="prebackbtn" onClick={() => setactivecard(activecard - 1)}>
                    <img className="backicon" src={back} alt="<" />
                    <p className="backselecteditem">Back</p>
                </div>
            }


            {fooditem.variant_group.length > 0 && (<>
                {fooditem.variant_group.map((eachaddon:any, index:number) => (<div id="AddonStepsCard" key={`${eachaddon.title}_${index}`}>
                    <div className="addonscard">
                        <div className="addonstitleholder">
                            <h3 className="addontitle">{eachaddon.title}</h3>
                            <p className="custdescription">
                                {(eachaddon.item_required_count > 0)
                                ? `Select atleast ${eachaddon.item_required_count} option`
                                : "Customize as you wish (Optional)"}
                            </p>
                        </div>
                        {eachaddon.variants.map((eachvariants:any) => (
                            <label className="addonitem" key={eachvariants.option_code}>
                                <div className="addonnameprice">
                                    <p className="addonname">{eachvariants.title}</p>
                                    <p className="addonprice">{`₹ ${eachvariants.price + fooditem.price}`}</p>
                                </div>
                                
                                <input className="varientcheck" type="radio" value={JSON.stringify({...eachvariants, varient_title: eachaddon.title})} name={`${eachaddon.title}_${index}`}/>
                                <div className="checkboxbg"></div>
                            </label>
                        ))}
                    </div>

                    <div className="custfooter">
                        {totalcards == activecard + 1
                            ?<button className="additembtn" onClick={() => submitAll(`${eachaddon.title}_${index}`)}>
                                <p>Add Item</p>
                            </button>
                            :<button className="additembtn" onClick={() => nextStep(`${eachaddon.title}_${index}`)}>
                                <p>{`Step ( ${activecard + 1}/${totalcards} ) - Continue`}</p>
                            </button>
                        }
                    </div>

                </div>))}
            </>)}


            {fooditem.addon_group.length > 0 && (<div id="AddonStepsCard">
                {fooditem.addon_group.map((eachaddon:any, index:number)=>(<div className="addonscard" id="cardcheck" key={`${eachaddon.title}_${index}`} data-value1={eachaddon.item_required_count}>
                    <div className="addonstitleholder">
                        <h3 className="addontitle">{eachaddon.title}</h3>
                        <p className="custdescription">
                            {(eachaddon.item_required_count > 0)
                            ? `Select atleast ${eachaddon.item_required_count} options`
                            : "Customize as you wish (Optional)"}
                        </p>
                    </div>
                    {eachaddon.addons.map((eachaddons:any)=>(
                        <label className="addonitem" key={eachaddons.option_code}>
                            <div className="addonnameprice">
                                <p className="addonname">{eachaddons.title}</p>
                                {eachaddons.price > 0 && <p className="addonprice">{`+₹ ${eachaddons.price}`}</p>}
                            </div>
                            
                            <input className="addoncheck" type="checkbox" value={JSON.stringify({...eachaddons, varient_title: eachaddon.title})} name={'alladdons'}/>
                            <div className="checkmark">
                                <img className="tickmark" src={tick} alt="✔"/>
                            </div>
                            <div className="checkboxbg"></div>
                        </label>
                    ))}
                </div>))}

                <div className="custfooter">
                    <button className="additembtn" onClick={() => submitAddons('alladdons')}>
                        <p>Add Item </p>
                    </button>
                </div>

            </div>)}


            {fooditem.customisation_steps.length > 0 && (<>
                {fooditem.customisation_steps.map((eachcustomisation:any, index:number)=>(<div id="AddonStepsCard" key={`${eachcustomisation.step_name}_${index}`}>
                    <div id={`${eachcustomisation.step_name}_${index}`}>
                        <h3 className="custstepname">{eachcustomisation.step_name}</h3>

                        {eachcustomisation.add_ons.map((eachaddon:any, childindex:number) => (<React.Fragment key={`${eachaddon.item_name}_${childindex}`}>
                            <div className="addonscard" id="cardcheck" data-value1={eachaddon.item_required_count}>
                                <div className="addonstitleholder">
                                    <h3 className="addontitle">{eachaddon.item_name}</h3>
                                    <p className="custdescription">
                                        {(eachaddon.item_required_count > 0)
                                        ? `Select atleast ${eachaddon.item_required_count} options`
                                        : (eachaddon.item_type == "singleselect")
                                            ? "Select atleast 1 option"
                                            : "Customize as you wish (Optional)"
                                        }
                                    </p>
                                </div>
                                {eachaddon.item_options.map((eachoptions:any, nestedindex:number)=>(
                                    <label className="addonitem" key={eachoptions.option_code}>
                                        {eachaddon.item_type == "singleselect"
                                            ? <>
                                                <div className="addonnameprice">
                                                    <p className="addonname">{eachoptions.option_name}</p>
                                                    <p className="addonprice">{`₹ ${eachoptions.price + fooditem.price}`}</p>
                                                </div>
                                                
                                                <input className="varientcheck" type="radio" id="custselection" defaultChecked={nestedindex === 0} value={JSON.stringify(eachoptions)} name={`${eachaddon.item_name}_${index}`}/>
                                                <div className="checkboxbg"></div>
                                            </>
                                            : <>
                                                <div className="addonnameprice">
                                                    <p className="addonname">{eachoptions.option_name}</p>
                                                    <p className="addonprice">{`+₹ ${eachoptions.price}`}</p>
                                                </div>
                                                
                                                <input className="addoncheck" type="checkbox" id="custselection" value={JSON.stringify(eachoptions)} name="alladdons"/>
                                                <div className="checkmark">
                                                    <img className="tickmark" width="10px" height="10px" src={tick} alt="✔"/>
                                                </div>
                                                <div className="checkboxbg"></div>
                                            </>
                                        }
                                    </label>
                                ))}
                            </div>

                        </React.Fragment>))}


                        <div className="custfooter">
                            {totalcards == activecard + 1
                                ?<button className="additembtn" onClick={()=>custsubmit(`${eachcustomisation.step_name}_${index}`)}>
                                    <p>Add Item</p>
                                </button>
                                :<button className="additembtn" onClick={()=>custsubmit(`${eachcustomisation.step_name}_${index}`)}>
                                    <p>{`Step ( ${activecard + 1}/${totalcards} ) - Continue`}</p>
                                </button>
                            }
                        </div>
                    </div>

                </div>))}

            </>)}

        </div>
    </>:null}</>)
}
export default Custpopup;