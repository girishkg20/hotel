import "./PaymentPolicy.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backbutton from "./Source/back.png";







const Paymentpolicy = () => {

    const navigate = useNavigate();
    document.body.style.overflow = "hidden";

    const [header, setHeader] = useState <HTMLDivElement | null>();
    const [headertext, setHeadertext] = useState <HTMLHeadingElement | null>();
    const [newpage, setNewpage] = useState <HTMLDivElement>();

    useEffect(() => {

        setHeader(document.getElementById("pspheader") as HTMLDivElement | null);
        setHeadertext(document.getElementById("pspheadertext") as HTMLHeadingElement | null);
        setNewpage(document.getElementById("newpage") as HTMLDivElement);

        if (header && headertext && newpage) {
            newpage.addEventListener('scroll', fixheader)
            
            return () => {
                newpage.removeEventListener('scroll', fixheader);
            }
        };

    },[header]);

    const fixheader = () => {
        
        if (newpage!.scrollTop > 55) {
            header!.classList.add('fixed')
            headertext!.style.display = "flex";
        }else{
            header!.classList.remove('fixed')
            headertext!.style.display = "none";
        }
        
    }




    return(<div className="newpage" id="newpage">

        <div className='ppheader' id='pspheader'>
            <div className='backtitle'>
                <img className='backbutton' src={backbutton} alt="Back" onClick={()=>navigate(-1)}/>
                <h3 className='headertext' id='pspheadertext'>Payment Policy</h3>
            </div>
        </div>

        <div className="pspcontentsholder">

            <h1 style={{fontSize: "20px"}}><strong><center>FOOD SPACE TECHNOLOGY PVT. LTD.</center></strong></h1>
            <h1 style={{fontSize: "18px"}}><strong><center>PAYMENT AND REFUND POLICY</center></strong></h1>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>This policy describes payment and refund regulations when you (&ldquo;You/User&rdquo;) use the company&rsquo;s application, website, sites, content and services (&ldquo;Services&rdquo;). It also provides information about how we refund, payment terms or charges and what choices you have with respect to the transactions. This policy is designed to ensure that we safely handle your all payments and refunds.</p>
            <p>&nbsp;</p>
            <p>This policy is supplementary to our Terms and Conditions and Privacy Policy. In the event of any inconsistency or conflict between this Policy and our Terms and Conditions, this Policy will govern.</p>
            <p>&nbsp;</p>
            <p>You have been provided an opportunity to freely access the policy and agree to our Terms and Conditions before using our Services, having regard to Indian Contract Act, 1872 and Information Technology Act, 2000.</p>
            <p>&nbsp;</p>
            <p><strong>DEFINITIONS</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p><em>&ldquo;Chargeback&rdquo;</em> means a fee charged to us by a financial institution (e.g., a customer&rsquo;s card issuing bank or merchant acquirer) in relation to the reversal of a card transaction.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;User&rdquo;</em> means a natural person or legal entity who has used the Platform to place an Order</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Payment Services&rdquo;</em> means collecting and securing payments from User and transferring these payments to Restaurants; as well as managing and processing of refunds on behalf of Restaurants.</p>
            <p>&nbsp;</p>
            <p><strong>FOOD ORDER ERROR </strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>In situations where your order is out-of-stock, wrong delivery or missing as the result of an order error, Tipplr will use its best good faith efforts to provide the Order to you as soon as possible. Should this effort require extra expense, it will be the responsibility of the erring party to pay those expenses. You may accept the fresh order delivered at a revised delivery time or opt for refund of the full amount credited or charged only. Tipplr reserves the discretion.</p>
            <p>&nbsp;</p>
            <p>The credit card payments, you will be refunded the full price.</p>
            <p>&nbsp;</p>
            <p><strong>FOOD ALLERGIES</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>Our ingredients and sources may contain nuts, fish, msg, and so on, please notify us of any kind of allergy before placing your order. gluten-free is available for some dishes, please don&rsquo;t hesitate to call to find out. You are responsible to double-check your order before paying and completing placing your online, call-in, walk-in order. We do not take any responsibilities of any allergies that you do not mention prior to completing placing an order. No refund is allowed in such circumstances.</p>
            <p>&nbsp;</p>
            <p><strong>COMPLIMENTARY FOOD, DISCOUNT AND OFFERS</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>When you have availed our special discounts on Tipplr like complimentary food, discounts and offers etc. We cannot provide a refund, store credit or cash value on any complimentary food, discount and offers. We reserve the right to change our price, discounts and offers anytime without notice.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong>CANCEL ORDER</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>You must notify the participating restaurant immediately if you decide to cancel your order, preferably by phone, and quote your order number. If the restaurant accepts your cancellation, no cancellation fee applies. If the restaurant refuses cancellation, (e.g. preparation of order placed by you has been completed and/or delivery personnel has already been dispatched), we will not be able to refund any order, which has been already dispatched. As a general rule, you shall not be entitled to cancel your order once you have received confirmation of the same from the restaurant. Usually, this is within 5 minutes of placing an order. Tipplr does not provide a refund or give store credit if you change your mind or mistakenly order an item after the restaurant&rsquo;s refusal to cancel the Order.</p>
            <p>&nbsp;</p>
            <p>If the cancellation was made in time and once the restaurant has accepted your cancellation, we will refund or re-credit your debit or credit card with the full amount within 14 days which includes the initial delivery charge (where applicable) which you paid for the delivery of the Goods or the Services, as applicable.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong>ORDER CANCELLED DELIVERY PARTNER</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>Subject to our Terms and Conditions, it&rsquo;s possible your delivery partner might cancel the delivery if they&rsquo;re unable to find or reach you after 15 (fifteen) minutes of reaching your location. When they arrive at your delivery address, they&rsquo;re prompted to contact you so it&rsquo;s a good idea to keep your phone nearby when you&rsquo;re expecting the food to arrive. If a delivery partner made a reasonable effort to contact you after arriving at your requested location, you may not be eligible for a refund.</p>
            <p>&nbsp;</p>
            <p><strong>CHARGES</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>Tipplr reserves the right to charge subscription and / or membership fees from a user, by giving reasonable prior notice, in respect of any product, service or any other aspect of this site.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong>CONTACT US</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>If you wish to contact us regarding any questions or comments you may have, please send an email <a href="mailto:support@tipplr.in">support@tipplr.in</a> to our customer support email or via our in-app customer support chat feature or through call centre - <a href="tel:8929221233">8929221233</a></p>
            <p>&nbsp;</p>
            <p><strong>ALL LIABILITIES ARISING FROM ANY CLAIMS OF DEFICIENCY OF SERVICE SHALL NOT EXCEED THE PRICE VALUE OF THE ORDER PLACED BY YOU. </strong></p>
            <p><strong>&nbsp;</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>These Terms were last updated on Nov 2022 and deemed to be effective as of today.</p>
            <p>&nbsp;</p>

        </div>
    
    </div>)
}
export default Paymentpolicy;