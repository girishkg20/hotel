import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import backbutton from "./Source/back.png";
import offer from "./Source/offer.png";
import veg from './Source/veg.png';
import egg from './Source/egg.png';
import non_veg from './Source/non-veg.png';




const Orderdetails = () => {

    const navigate = useNavigate();
    const {orderid} = useParams();
    document.body.style.overflow = "hidden";

    const [orderdata, setorderdata] = useState<any>();
    const [totaldiscount, settotaldiscount] = useState<any>();
    const [deliverydiscount, setdeliverydiscount] = useState<any>();

    const auth = useSelector((state:any) => state.perReducers.auth.value);
    const loggedin = auth.token;

    useEffect(() => {
        const url = `${import.meta.env.VITE_BASE_URL}/app/user/food-order/${orderid}`; //?delivery_details=0
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': loggedin
            }
        })
        .then((response) => response.json())
        .then((data) => setorderdata(data.response.data))
    },[])

    const unixtodateandtime = (unix:any) => {

        const date = new Intl.DateTimeFormat(
            'en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }
        ).format(unix*1000);

        return date;
    }

    useEffect(() => {
        if(orderdata) {

            const deldiscount = orderdata.preferred_delivery_charges - orderdata.available_delivery_discount;
        
            if(deldiscount < 0) {
                setdeliverydiscount(orderdata.preferred_delivery_charges);
            }else{
                setdeliverydiscount(orderdata.available_delivery_discount);
            }

        }
    },[orderdata]);
    
    useEffect(() => {

        if(!isNaN(deliverydiscount)) {
            settotaldiscount(Math.round(orderdata.delivery_discount + deliverydiscount + (orderdata.promo_used && orderdata.promo_used.value || 0)));
        }

    },[deliverydiscount]);

    const openclosepop = (id:any) => {
        const popelement = document.getElementById(id);
        const popoverlay = document.getElementById(`${id}_overlay`);
         
        if(popelement!.style.display == 'block') {
            popelement!.style.display = 'none';
            popoverlay!.style.display = 'none';
        }else{
            popelement!.style.display = 'block';
            popoverlay!.style.display = 'block';
        }
    }


    return(<div className="newpage">{orderdata && <>

        <div className='odpheader'>
            <div className='backtitle'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={() => navigate(-1)}/>
                <div className='odheadertext'>
                    <p className="odheadertoptext">{`ORDER #${orderdata.order_number}`}</p>
                    <div className="odheaderbottom">
                        {orderdata.status === "order_delivered" && <p className="oddelivered">Delivered</p>}
                        {orderdata.status === "order_cancelled" && <p className="odcancelled">Cancelled</p>}
                        <hr className="odtimestatusdivider"/>
                        <p className="odheaderbottomtext">{unixtodateandtime(orderdata.created_time)}</p>
                    </div>
                </div>
            </div>
            <p className="odhelpbutton" onClick={() => navigate("support")}>HELP</p>
        </div>

        {deliverydiscount > 0 &&
            <div className='odsavingsheader'>
                <div className='tsavingscontainer'>
                    <img className='tsavingsiconh' src={offer} alt="offer"/>
                    <p className='tsavingstexth'>You've <strong>{`saved ₹${totaldiscount}`}</strong> on this order!</p>
                </div>
            </div>
        }

        <div className="odfromtoholder">

            <div className="odfromholder">
                {orderdata.delivery_address && <span className="odfromline"></span>}
                <div style={{overflow: "hidden"}}>
                    <p className="odaddressheader">{orderdata.merchant_details.name}</p>
                    <p className="odaddresslinetop">{orderdata.merchant_details.full_address}</p>
                </div>
            </div>

            {orderdata.delivery_address && <>
                <div className="odfromholder">
                    <span className="odtoline"></span>
                    <p className="odaddressheader">{orderdata.delivery_address.block_no}</p>
                </div>
                <p className="odaddresslinebottom">{orderdata.delivery_address.address_line}</p>
            </>}
            
        </div>

        <div className="odfooditemsholder">

            {orderdata.food_items.map((eachfooditem:any, index:number) => (
                <div key={`${eachfooditem.name}_${index}`}>

                    <div className='oditemnameholder'>
                        <img className="odvegstatus" src={
                            eachfooditem.original_food_item.veg_status == "veg" ? veg :
                            eachfooditem.original_food_item.veg_status == "egg" ? egg : non_veg
                        } alt="Veg Status" />
                        <div className='oditemnamecontainer'>
                            <p className='oditemname'>{eachfooditem.quantity + " × " + eachfooditem.name}</p>
                            <div className='odpriceholder'>
                                {eachfooditem.delivery_discount > 0
                                    ? <>
                                        <p className='oditemprice'>{`₹${Math.round(eachfooditem.total)}`}</p>
                                        <p className='oddisplayprice'>{`₹${Math.round(eachfooditem.total - eachfooditem.delivery_discount)}`}</p>
                                    </>
                                    : <p className='oddisplayprice'>{`₹${Math.round(eachfooditem.total)}`}</p>
                                }
                            </div>
                        </div>
                    </div>
                    
                    {
                        eachfooditem.variant_group && eachfooditem.variant_group[0]
                        ? <p className="odaddonsname">{eachfooditem.variant_group.map((eachvarient:any)=>(eachvarient.title)).join(", ")}</p>
                        : eachfooditem.variant_group && eachfooditem.customisation_steps[0]
                        ? <p className="odaddonsname">{eachfooditem.customisation_steps.map((eachoption:any)=>(eachoption.item_name)).join(", ")}</p>
                        : null
                    }

                    {orderdata.food_items.length  > index + 1 &&
                        <hr className="oditemsdivider"/>
                    }
                      
                </div>
            ))}

        </div>

        <div className='odcartholders'>
            {orderdata.total_item_total > 0 &&
                <div className='cbdcontainer'>
                    <p className='cbdtextl'>Item Total</p>
                    <p className='cbdtextr'>₹{orderdata.total_item_total.toFixed(2)}</p>
                </div>
            }
            {orderdata.delivery_discount > 0 &&
                <div className='cbdcontainer'>
                    <p className='cbdtextl'>Item Discount</p>
                    <p className='cbdtextr'>- ₹{orderdata.delivery_discount.toFixed(2)}</p>
                </div>
            }
            <div className='cbdcontainer'>
                <p className='cbdtextl'>Sub Total</p>
                <p className='cbdtextr'>₹{(orderdata.total_item_total ? (orderdata.total_item_total - orderdata.delivery_discount) : (orderdata.sub_total)).toFixed(2)}</p>
            </div>
            <div className='cbdcontainer'>
                <p className='cbdtextlclick' onTouchStart={() => openclosepop("tandcpop")}>Taxes and Charges</p>

                <div className='tandcoverlay' id='tandcpop_overlay' onTouchStart={() => openclosepop("tandcpop")}></div>
                <div className='tandcpop' id='tandcpop'>
                    <p className='tandcheading'>Taxes and Charges</p>
                    <div className='tandctextholder'>
                        <p>Packaging Charges</p>
                        <p>₹{orderdata.total_packing_charges ? orderdata.total_packing_charges.toFixed(2) : 0}</p>
                    </div>
                    <div className='tandctextholder'>
                        <p>Service Fee</p>
                        <p>₹{orderdata.total_extra_charges ? orderdata.total_extra_charges.toFixed(2) : 0}</p>
                    </div>
                    <div className='tandctextholder'>
                        <p>GST</p>
                        <p>₹{orderdata.total_taxes ? orderdata.total_taxes.toFixed(2) : 0}</p>
                    </div>
                    <div className='tandctextholderl'>
                        <p>Total</p>
                        <p>₹{((orderdata.total_extra_charges ? orderdata.total_extra_charges : 0) + (orderdata.total_packing_charges ? orderdata.total_packing_charges : 0) + (orderdata.total_taxes ? orderdata.total_taxes : 0)).toFixed(2)}</p>
                    </div>
                </div>

                <p className='cbdtextr'>₹{((orderdata.total_extra_charges ? orderdata.total_extra_charges : 0) + (orderdata.total_packing_charges ? orderdata.total_packing_charges : 0) + (orderdata.total_taxes ? orderdata.total_taxes : 0)).toFixed(2)}</p>
            </div>
            {orderdata.preferred_delivery_charges &&
                <div className='cbdcontainer'>
                    <p className='cbdtextl'>Delivery Charges</p>
                    <div className='cbddeliveryfee'>
                        {orderdata.available_delivery_discount && orderdata.preferred_delivery_charges
                            ? (orderdata.preferred_delivery_charges - orderdata.available_delivery_discount) > 0
                                ? <>
                                    <p className='cbdtextrscratch'>₹{orderdata.preferred_delivery_charges}</p>
                                    <p className='cbdtextr'>₹{(orderdata.preferred_delivery_charges - orderdata.available_delivery_discount).toFixed(2)}</p>
                                </>
                                : <>
                                    <p className='cbdtextrscratch'>₹{orderdata.preferred_delivery_charges}</p>
                                    <p className='cbdfree'>FREE</p>
                                </>
                            : orderdata.preferred_delivery_charges && <p className='cbdtextr'>₹{orderdata.preferred_delivery_charges}</p>
                        }
                    </div>
                </div>
            }
            {orderdata.promo_used && orderdata.promo_used.value &&
                <div className='cbdcontainer'>
                    <p className='cbdtextl'>Coupon Discount</p>
                    <p className='cbdtextr'>- ₹{orderdata.promo_used.value}</p>
                </div>
            }
            <hr className='cartholderdividersnm'/>
            <div className='cbdcontainerlast'>
                <p className='cbdtextlarge'>Grand Total</p>
                <p className='cbdtextlarge'>₹{orderdata.total.toFixed(2)}</p>
            </div>
        </div>

        
        
    </>}<Outlet/></div>)
}
export default Orderdetails;