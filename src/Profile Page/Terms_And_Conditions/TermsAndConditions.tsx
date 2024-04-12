import "./TermsAndConditions.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backbutton from "./Source/back.png";







const Termsandconditions = () => {

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
                <h3 className='headertext' id='pspheadertext'>Terms & Conditions</h3>
            </div>
        </div>

        <div className="pspcontentsholder">

            <h1 style={{fontSize: "20px"}}><strong><center>FOOD SPACE TECHNOLOGY PVT. LTD.</center></strong></h1>
            <h1 style={{fontSize: "18px"}}><strong><center>TERMS AND CONDITIONS</center></strong></h1>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p><strong><u>NATURE AND APPLICABILITY</u></strong></p>
            <p>&nbsp;</p>
            <p>Please carefully go through the terms and conditions (&ldquo;Terms&rdquo;), before you decide to access the app, website and social media sites named &ldquo;Tipplr&rdquo; (&ldquo;Platform&rdquo;) or avail the Services offered. These Terms constitute a legal agreement (&ldquo;Agreement&rdquo;) between you and Food Space Technology Pvt Ltd (&ldquo;Company/Tipplr&rdquo;) (on its and its affiliates behalf) in relation to the Services as defined below.&nbsp;<strong>If you do not agree to the Terms and Conditions, you must immediately discontinue any use of its services.</strong></p>
            <p>&nbsp;</p>
            <p>This Agreement applies to</p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>A customer, his/her representatives or affiliates, searching for restaurants through the aforementioned Platform or</li>
                <li>A user of the Platform. This Agreement applies to those services provided by the Company on its Platform named Tipplr.</li>
                <li>The Services may change from time to time, at the sole discretion of the Tipplr, and the Agreement upon notification shall apply to you. Collectively referred to as (&ldquo;You&rdquo; or &ldquo;User&rdquo;)</li>
            </ol>
            <p>This Agreement is effective when Customer clicks to accept it (the "Effective Date"). If you are accepting on behalf of the User, you represent and warrant that (i) you have full legal authority to bind User to this Agreement; (ii) you have read and understand this Agreement; and (iii) you agree, on behalf of User, to this Agreement.</p>
            <p>&nbsp;</p>
            <p><strong><u>LEGAL COMPLIANCE</u></strong></p>
            <p>&nbsp;</p>
            <p>The Agreement is published in compliance of, and is governed by the provisions of Indian laws, including but not limited to:</p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>The Indian Contract Act, 1872;</li>
                <li>The (Indian) Information Technology Act, 2000;</li>
                <li>Food and Safety Standards Act, 2006;</li>
                <li>Intermediary Guidelines and Digital Media Ethics Code Rules, 2021</li>
                <li>Any other amendments, modifications, relevant and applicable laws in force at the time.</li>
            </ol>
            <p>&nbsp;</p>
            <p><strong><u>GENERAL</u></strong></p>
            <p>&nbsp;</p>
            <p>You hereby certify that you are (i) over the age of eighteen (18) or have the legal ability to use the Services and (ii) sound mind (iii) not legally disqualified by applicable laws of India to enter into this agreement (iv) freely consenting to this agreement and (v) You are located in a State Where We operate or consent to our jurisdiction.</p>
            <p>&nbsp;</p>
            <p>These Terms constitute the entire Agreement between the Tipplr and the User regarding the Service, and supersede and replace any prior agreements the User and Tipplr might have regarding the Service. Tipplr may revise these Terms from time to time and the same will be intimated to You.</p>
            <p>&nbsp;</p>
            <p><strong><u>DEFINITIONS</u></strong></p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Connection Method&rdquo;</em>&nbsp;means ordering devices and or any software, program or application provided which enables you to receive Orders in your Restaurant.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;User&rdquo;</em>&nbsp;means a natural person or legal entity who has uses the Platform to place an Order or who accesses or avail any Platform of the Company for the purpose of publishing, sharing, transacting, displaying or uploading information or views and includes other persons jointly participating in using the Platform of the Company.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Delivery Distance&rdquo;</em>&nbsp;means the distance between a Restaurant and the User, determined solely by Tipplr based on in-house IT support and algorithms.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Delivery Services&rdquo;</em>&nbsp;means a service provided by us to collect and deliver the Orders from a Restaurant to a User.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Delivery Time</em>&rdquo; means, either the delivery time indicated via the Connection Method (with a maximum of 60 minutes) or the delivery time priorly indicated by Tipplr on its Platform and confirmed by you.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Force Majeure Event&rdquo;&nbsp;</em>means an event beyond the reasonable control of either party including but not limited to strikes, lock-outs or other industrial disputes (whether involving the workforce of the party or a third party), failure of a material utility service or transport network, act of God, war, riot, act of terrorism, civil commotion, epidemic or pandemic, malicious damage by a third party, compliance with any law or governmental order, rule, regulation or direction by a third party, accidents, cyber-attacks, breakdown of plant or machinery, fire, weather phenomena (e.g.: lightning, ice, flooding, heavy rainfall) or capacity problems.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Order&rdquo;</em>&nbsp;means an order for products offered selected for delivery by a User via the Platform</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Platform&rdquo;&nbsp;</em>Mobile Applications, website, sites or social media sites launched by the company under the brand-name &ldquo;Tipplr&rdquo;</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Payment Partner&rdquo;</em>&nbsp;means a Restaurant that receives the Payment Services.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Restaurants/ Restaurant Partners&rdquo;</em> means the Restaurants who have been legally vetting and brought on board by the Company to offer their food and beverages (&ldquo;Goods&rdquo;) on sale on the Companies Platform and facilitate Contactless Dining Services.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Premises&rdquo;</em>&nbsp;means the physical premises at which the Restaurant operates.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Tip&rdquo;</em>&nbsp;means an amount presented by a User as a gift or voluntary gratuity in recognition of some service performed offered on the Platform voluntarily.</p>
            <p>&nbsp;</p>
            <p><em>&ldquo;Intellectual Property Rights&rdquo;&nbsp;</em>For purposes of this Agreement, Intellectual Property Rights shall be defined as all inventions, trade secrets, copyright, trademark, designs, know-how, developments, improvements, results, data, computer programs/software and other information in any form, patentable or unpatentable, patented or unpatented, copyrighted or uncopyrighted, copyrightable or not, trademarked or not, which are conceived, created, written, developed, reduced to practice, acquired, owned or controlled by Tipplr pursuant to this Agreement ( &ldquo;IPR(s)&rdquo;)</p>
            <p>&nbsp;</p>
            <p><strong><u>INTERMEDIARY ROLE</u></strong></p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>We provide the Services to you, as a result of which legally binding contracts for the sale of Services to Users will be concluded. Our role in the conclusion of these contracts is that of an intermediary;</li>
                <p>&nbsp;</p>
                <li>You recognize and acknowledge that the Company&rsquo;s Platform are merely Intermediary under the (Indian) Information Technology Act, 2000. Tipplr&rsquo;s role is limited to managing the platform for the display of the services/offers/deals provided by the restaurants and third parties and other incidental services to facilitate the dining transactions between the restaurant and the Users. Accordingly, Tipplr is merely an intermediary and is only a platform/facilitator where the restaurants and other service provider may offer its services/deals/offers and discounts for marketing purposes. The contract for service shall be a strictly bipartite contract between such service provider and the diner. At no time shall Tipplr have any obligations or liabilities in respect of such contract nor shall Tipplr hold any rights, title or interest in the services provided by such service provider. Tipplr shall not be responsible for any unsatisfactory or delayed performance or any actions or inactions of the restaurants/third party service provider including deficiency in services provided by such restaurants and the service providers.</li>
                <p>&nbsp;</p>
                <li>Tipplr is not a manufacturer, seller or distributor of food or beverages and merely accepts an order against the Restaurant Partner on behalf of the User pursuant to the aforesaid contract and facilitate the sale and purchase of food and beverages between User and Restaurant Partners.</li>
            </ol>
            <p>&nbsp;</p>
            <p><strong><u>OUR OBLIGATIONS</u></strong></p>
            <p>&nbsp;</p>
            <p>We will provide to you:</p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>Food, Delivery and Dining aggregator Services</li>
                <li>an order processing service which enables Users to place Orders at the Restaurant via the Platform;</li>
                <li>Payment Services</li>
                <li>Delivery Services</li>
                <li>provide reasonable training to enable you to use the Connection Method</li>
                <li>provide you with access to restaurant support services</li>
                <li>Customer Care Services</li>
                <li>manage, process and collect on each Restaurant&rsquo;s behalf any necessary refunds for Orders which are to be paid to User in accordance with our refund policy.</li>
                <li>other services as may be agreed from time to time,</li>
            </ol>
            <p>(Together, the &ldquo;Services&rdquo;)</p>
            <p>&nbsp;</p>
            <p><strong><u>USER WARRANTY AND REPRESENTATIONS</u></strong></p>
            <p>&nbsp;</p>
            <ol>
                <li>User of Platform acknowledges and agrees not to host, display, upload, modify, publish, transmit, update or share any information that:</li>
                <ol style={{listStyleType: "lower-alpha"}}>
                    <li>belongs to another person and to which the user does not have any right to;</li>
                    <li>is grossly harmful, harassing, blasphemous defamatory, obscene, pornographic, pedophilic, libelous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever;</li>
                    <li>harm minors in any way;</li>
                    <li>infringes any patent, trademark, copyright or other proprietary rights;</li>
                    <li>violates any law for the time being in force;</li>
                    <li>deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;</li>
                    <li>impersonate another person;</li>
                    <li>contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;</li>
                    <li>threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.</li>
                </ol>
            </ol>
            
            <p>Tipplr upon obtaining knowledge by itself or been brought to actual knowledge by an affected person in writing or through email signed with electronic signature about any such information as mentioned, shall act within thirty-six hours and where applicable, work with User or owner of such information to disable such information that is in contravention of this Clause. Further, Tipplr shall preserve such information and associated records for at least ninety days for investigation purposes.</p>
            <p>&nbsp;</p>
            <p>Any violations under this clause can be address as per the &ldquo;Redressal Mechanism&rdquo; clause under this agreement.</p>
            <p>&nbsp;</p>
            <p><strong><u>AMENDMENT AND TERMINATION TO THIS AGREEMENT</u></strong></p>
            <p>&nbsp;</p>
            <ol>
                <li>AMENDMENT</li>
                <p>&nbsp;</p>
                <ol style={{listStyleType: "lower-alpha"}}>
                    <li>Tipplr shall periodically and at least once a year inform Users about its terms, privacy policy and other rules or any change to them. An opportunity to accept material modifications shall be provided by (i) sending an email to the User Email Address; or (ii) posting a notice in the Platform; If User does not agree to the revised Agreement, User may stop using the Services.</li>
                    <p>&nbsp;</p>
                    <li>Except in the limited situations described in this Clause, the proposed amendment(s) will not take effect until at least 15 (fifteen) days from the date on which we notify you about them (and we will set out the effective date of the amendment(s) in the relevant notification). Whenever we notify you of a proposed amendment(s) to this Agreement, you will have the right to terminate this Agreement before expiry of the applicable notice period. If you do wish to terminate, and let us know during that notice period, termination will then take effect 15 (fifteen) days from your receipt of the notification. You may also choose to give up your right to terminate by either letting us know in writing, or by taking a clear affirmative action. If we do not hear from you by the end the notice period, you will be deemed to have agreed to the amendment(s).</li>
                    <p>&nbsp;</p>
                    <li>The minimum 15 (fifteen) day notice period in this Clause will not apply where: (a) we are subject to a legal or regulatory obligation which requires us to amend this Agreement in a way which does not allow us to give you that length of notice period; and (b) we need to amend this Agreement to address an unforeseen and imminent danger that relates to defending the Services, the Platform, Users or restaurant partners from fraud, malware, spam, data breaches or other cybersecurity risks.</li>
                    <p>&nbsp;</p>
                    <li>Tipplr reserves the right to charge a subscription and/or membership and/or a convenience fee from a user, by giving reasonable prior notice, in respect of any product, service or any other aspect of the Tipplr Platform anytime in future.</li>
                </ol>
                <p>&nbsp;</p>
                <li>TERMINATION RESTRICTION AND SUSPENSION</li>
                <p>&nbsp;</p>
                <ol style={{listStyleType: "lower-alpha"}}>
                    <li>Tipplr reserves the right to suspend / cancel, or discontinue any or all channels, products or service at any time.</li>
                    <li>Tipplr (acting reasonably) believe that you are in default of your obligations under this Agreement; Tipplr reserves its right to (a) refuse Service, (b) restrict, suspend, or terminate your account; (c) terminate this Agreement; (d) terminate or suspend your access to the site; (e) refuse, move or remove for any reason any Content / Image that you submit on or through the Services; (f) refuse, move, or remove any Content / Image that is available on or through the Services; (g) establish general practices and limits concerning use of the Services at any time and, (h) remove or edit contents or cancel orders (entered by you) in its sole discretion with cause, and with prior notice for any violation of the Terms of Use.</li>
                    <li>Tipplr may at any time on written notice, restrict, suspend, or terminate part of, the provision of the Services under this Agreement, including by suspending your profile on the Platform.</li>
                    <li>If we restrict, suspend, or terminate part of, the provision of Services to you as set out in this Clause, we will provide you with a clear explanation of our reasons for doing so (including the grounds we're relying on) by email or through our Platform on or before the date on which the restriction, suspension, or termination, becomes effective. If you wish, you can clarify the facts or circumstances that led to the restriction, suspension, or termination, using our complaint-handling system. We will then engage with you to discuss these, and if we determine after that discussion that the restriction, suspension, or termination, is not appropriate, we will reinstate the applicable Services, including where applicable your profile on the Platform, without undue delay.</li>
                    <li>Without affecting any other right or remedy available, either you or we may at any time on written notice terminate this Agreement (i) if the other is in significant breach of any of its obligations under this Agreement and that breach is not capable of remedy or, if the breach is capable of remedy, it has not been remedied to the satisfaction of the non-breaching party within 14 (fourteen) days' of notice of the breach by the non-breaching party; (ii) if the Company becomes insolvent, bankrupt, or enters into any similar or analogous solvency related procedure; (iv) if a Force Majeure Event makes the provision of the Services impractical or non-commercially viable; or (v) you or we are required to by a legal or regulatory obligation.</li>
                    <li>You can also terminate this Agreement for convenience, but you must provide us with at least 30 (thirty) days&rsquo; written notice before termination takes effect.</li>
                    <li>Regardless of anything else in this Agreement, you acknowledge and agree that search engines which have a licence to use your intellectual property or personal information arising from this Agreement may continue to hold or use same post termination. Cached versions of the Platform may continue to exist in the web browser and web servers of search engines and customers following termination. We will not have any liability to you in connection with these matters to the extent they lie outside of our control.</li>
                </ol>
            </ol>
            <p>&nbsp;</p>
            <p><strong><u>INTELLECTUAL PROPERTY RIGHTS</u></strong></p>
            <p>&nbsp;</p>
            <p>Unless otherwise stated, all intellectual property rights in all material presented on the Platform or physically (including but not limited to text, packaging, audio, video or graphical images), trademarks and logos appearing on the Platform are the property of Food Space Technology Pvt Ltd, its parent, affiliates and associates and are protected under applicable Indian laws. You agree not to use any framing techniques to enclose any trademark or logo or other proprietary information of Tipplr; or remove, conceal or obliterate any copyright or other proprietary notice or any credit-line or date-line on other mark or source identifier included on the site / service, including without limitation, the size, colour, location or style of all proprietary marks. Any infringement shall be vigorously defended and pursued to the fullest extent permitted by law.</p>
            <p>&nbsp;</p>
            <p>During the Term, you must not do or say anything derogatory that might bring our Trademark, business or brand into disrepute or adversely affect our reputation.</p>
            <p><strong>&nbsp;</strong></p>
            <p>Tipplr respects third party Intellectual Property rights and actively supports protection of all third-party Intellectual Property including Copyrights and Trademarks. It is our policy to expeditiously respond to clear notices of alleged IPR infringement. We do not endorse our Restaurants IP Violations or any third-party violations.</p>
            <p><strong>&nbsp;</strong></p>
            <p>Any violations under this clause can be address as per the &ldquo;Redressal Mechanism&rdquo; clause under this agreement.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>LIMITED PERMISSION TO COPY</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>Tipplr grants you permission to only access and make personal use of the site and you agree not to, directly or indirectly download or modify / alter / change / amend / vary / transform / revise / translate / copy / publish / distribute or otherwise disseminate any content on Tipplr&rsquo;s site / service, or any portion of it; or delete or fail to display any promotional taglines included in the site / service either directly or indirectly, except with the express consent of Tipplr. However, you may print or download extracts from these pages for your personal / individual, non-commercial use only. You must not retain any copies of these pages saved to disk or to any other storage medium except for the purposes of using the same for subsequent viewing purposes or to print extracts for personal / individual use.</p>
            <p>&nbsp;</p>
            <p>Tipplr forbids you from any attempts to resell or put to commercial use any part of the site; any collection and use of any product listings, descriptions, or prices; any derivative use of the Site or its contents; any downloading or copying of account information for the benefit of any other merchant; any renting, leasing, or otherwise transferring rights to the site / service; displaying the name, logo, trademark or other identifier of another person (except for indiatimes.com or you) in such a manner as to give the viewer the impression that such other person is a publisher or distributor of the service on the site, or any data gathering or extraction tools; or any use of meta tags. You may not (whether directly or through the use of any software program) create a database in electronic or structured manual form by regularly or systematically downloading and storing all or any part of the pages from this site. No part of the Site may be reproduced or transmitted to or stored in any other web site, nor may any of its pages or part thereof be disseminated in any electronic or non-electronic form, nor included in any public or private electronic retrieval system or service without prior written permission.</p>
            <p>&nbsp;</p>
            <p><strong><u>NO UNLAWFUL OR PROHIBITED USE</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>As a condition of your use of the services, you will not use the Services for any purpose that is unlawful or prohibited by these terms, conditions, and notices. You may not use the Services in any manner that could damage, disable, overburden, or impair any of our servers, or the network(s) connected to any Tipplr server, or interfere with any other party&rsquo;s use and enjoyment of any Services. You may not attempt to gain unauthorized access to any Services, other accounts, computer systems or to any of the services, through hacking, password mining or any other means. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available through the Services.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>MATERIAL POSTED/TRANSMITTED ON TIPPLR PLATFORM</u></strong></p>
            <p>&nbsp;</p>
            <p>All information, data, text, software, music, sound, photographs, graphics, video, messages or other materials (&ldquo;Content&rdquo;), whether publicly or privately transmitted / posted by a User, is the sole responsibility of the User from where such content is originated (the Originator). By posting any material which contain images, photographs, pictures or that are otherwise graphical in whole or in part (&ldquo;Images&rdquo;), you warrant and represent that (a) you are the copyright owner of such Images, or that the copyright owner of such Images has granted you permission to use such Images or any content and/or images contained in such Images consistent with the manner and purpose of your use and as otherwise permitted by these Terms of Use and the Services, (b) you have the rights necessary to grant the licenses and sublicenses described in these Terms of Use, and (c) that each person depicted in such Images, if any, has provided consent to the use of the Images as set forth in these Terms of Use, including, by way of limitation, the distribution, public display and reproduction of such Images.</p>
            <p>&nbsp;</p>
            <p>You represent that you have valid rights and title in any and all Content/Images that you submit on the Site, that you have not infringed on any IPR belonging to any party and further that you will indemnify Tipplr or its affiliates including Tipplr for all claims arising out of any content that you post on the Site or its products.</p>
            <p>&nbsp;</p>
            <p>Tipplr accepts no responsibility for the said Content / Images. However, you understand that all Content / Images posted by you becomes the property of Tipplr and you agree to grant/assign to Tipplr, a non-exclusive, royalty free, perpetual, irrevocable and sub-licensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform and display such Content / Images (in whole or part) worldwide and/or to incorporate it in other works in any form, media, or technology now known or later developed throughout the world&rdquo;.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>LIABILITY</u></strong></p>
            <p>&nbsp;</p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>Any transactions relating to booking of table or reservations of goods or services not directly offered by Tipplr are to be settled inter-se between the parties to such transaction and all warranties express or implied of any kind, regarding any matter pertaining thereto, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and non-infringement are disclaimed by Tipplr. Tipplr merely endeavors to provide a platform where you and other party may interact, exchange information or carry out a reservation on such basis that are mutually agreed between you and the other party.</li>
                <p>&nbsp;</p>
                <li>Tipplr shall not be liable for any loss that you may incur, while making reservations or bookings of the third party. Under no circumstances shall Tipplr be held responsible or liable, in any way, for any content which in Legal opinion is derogatory, threatening, defamatory, obscene or offensive or offends public sensibilities or morals and shall also not assume liability for any errors or omissions in any content, or for any loss or damage of any kind incurred as a result of the use of any content posted or uploaded on the site, or any infringement of another&rsquo;s rights, including intellectual property rights. You specifically agree that Tipplr is not responsible for any content sent using and/or included in Tipplr&rsquo;s site/mobile/service by any third party.</li>
                <p>&nbsp;</p>
                <li>Goods offered for sale on the Platform are suitable for certain ages and individuals only. It must be the responsibility of User to check the food they are ordering and read its description, if provided, before placing order on the Platform. Tipplr shall not be liable in the event food ordered buy User does not meet User&rsquo;s dietary or any other requirements and/or restrictions.</li>
                <p>&nbsp;</p>
                <li>Tipplr shall not be liable for any actions or omissions by the Restaurant Partners including deficiency in service, wrong delivery or order, quality of food, time taken to prepare or deliver the order etc. and liability of any violation of the Food Safety and Standards Act, 2006 and applicable rules and regulations made thereunder shall solely be of the Restaurants.</li>
                <p>&nbsp;</p>
                <li>You will compensate us in full against any charges (including Chargebacks), losses, damages or claims (and all related costs, (including legal fees), penalties, interest, expenses and other liabilities incurred by us in connection with a breach by you of this Agreement. In addition, you will compensate us and our Affiliates in full against any losses, damages, or claims (and all related costs, including legal fees), penalties, interest, expenses and other liabilities resulting from a third party claim against us or any of our Affiliates arising from our relationship with you. (whether or not in the fulfilment of either party&rsquo;s obligations under this Agreement). You will also compensate us and our Affiliates for any loss, damages or claims, when a third-party claims that we or our Affiliates have infringed the third party&rsquo;s intellectual property rights by (i) using or permitting the use of, or being or having been the registered proprietor of a domain name, a brand name, trademark, logo or other intellectual property, or by (ii) assisting or permitting you to use or to be a registered proprietor of such rights, which infringe the third party&rsquo;s rights.</li>
                <p>&nbsp;</p>
                <li>Any certification, licenses or permits (&ldquo;Certification&rdquo;) or information in regard to such Certification that may be displayed on the Restaurant&rsquo;s listing page on the Platform is for informational purposes only. Such Certification is displayed by Tipplr on an &lsquo;as available&rsquo; basis that is provided to Tipplr by the Restaurant partner(s). Tipplr does not make any warranties about the validity, authenticity, reliability and accuracy of such Certification or any information displayed in this regard. Any reliance by a user upon the Certification or information thereto shall be strictly at such user&rsquo;s own risk and Tipplr in no manner shall assume any liability whatsoever for any losses or damages in connection with the use of this information or for any inaccuracy, invalidity or discrepancy in the Certification or non-compliance of any applicable local laws or regulations by the Restaurant partner.</li>
                <p>&nbsp;</p>
                <li>With no prejudice to other terms and conditions herein, the liability per Order against the Company shall not exceed Rs. 1000/-&nbsp;or value of the Order, whichever is lower.</li>
            </ol>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>PROGRAMS</u></strong></p>
            <p>&nbsp;</p>
            <p>Tipplr may from time to time introduce referral and/or incentive-based programs for its users (Program). These Program(s) maybe governed by their respective terms and conditions. By participating in the Program, Users are bound by the Program terms and conditions as well as the Tipplr Platform terms. Further, Tipplr reserves the right to terminate / suspend the User&rsquo;s account and/or credits / points earned and/or participation of the User in the Program if Tipplr determines in its sole discretion that the User has violated the rules of the Program and/or has been involved in activities that are in contravention of the Program terms and/or Tipplr Platform terms or has engaged in activities which are fraudulent / unlawful in nature. Furthermore, Tipplr reserves the right to modify, cancel and discontinue its Program without notice to the User.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>NO CONTROLLING SPAM POLICY OR UNSOLICITED E-MAILS</u></strong></p>
            <p>&nbsp;</p>
            <p>You will not use any communication tool or other means available on the site to transmit, directly or indirectly, any unsolicited bulk communications (including emails and instant messages). Tipplr will not sell, lease or rent its e-mail subscriber lists to third parties. You may not harvest information about users of Tipplr for the purpose of sending or to facilitate the sending of unsolicited bulk communications. We may terminate your access or use of the service immediately, with or without any notice, and take any other legal action if you, or anyone using your access details to the site or Mobile apps, violates these terms. We may adopt any technical remedy (including any filtering technology or other measures) to prevent unsolicited bulk communications from entering, Tipplr or remaining within our computer or communication networks. Such filtering technology or other measures may block, either temporarily or permanently, some e-mail sent to you through the Tipplr&rsquo;s Websites.</p>
            <p>&nbsp;</p>
            <p><strong><u>DISCLAIMER OF WARRANTIES AND LIABILITY</u></strong></p>
            <p>&nbsp;</p>
            <p>Tipplr disclaims all warranties, express or implied, statutory or otherwise, as to the Services provided, including without limitation, the implied warranties of merchantability, fitness for a particular purpose, workman like effort, title and non-infringement are disclaimed and excluded.</p>
            <p>&nbsp;</p>
            <p>Tipplr and its parent, affiliates and associates shall not be liable, at any time for any, direct, indirect, punitive, incidental, special, consequential, damages (including, without limitation, damages for loss of business projects, damage to your computer system or damages for loss of payments or profits, damages for loss of use, data or profits, arising out of or in any way connected with the use or performance of the Tipplr sites/mobile/services, with the delay or inability to use the Tipplr&rsquo;s sites/mobile/services or related services, the provision of or failure to provide services, or for any information, software, products, services and related graphics obtained through the Tipplr sites/mobile/services, or otherwise arising out of the use of the Tipplr sites/mobile/services) arising in contract, tort or otherwise from the use of or inability to use the site, or any of its contents, or from any act or omissions a result of using the site or any such contents or for any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communications line failure, theft or destruction or unauthorised access to, alteration of, or use of information contained on the site. No representations, warranties or guarantees whatsoever are made by Tipplr as to the (accuracy, adequacy, reliability, completeness, suitability or applicability of the information to a particular situation; (b) that the service will be uninterrupted, timely, secure, or error-free; (c) the quality of any products, services, content, information, or other material purchased or obtained from the website or mobile apps will meet your expectations or requirements; or (d) any errors in the website or mobile apps will be corrected.</p>
            <p>&nbsp;</p>
            <p><strong><u>LINKS TO OTHER SITES</u></strong></p>
            <p>&nbsp;</p>
            <p>All the contents of this Site and Mobile apps are only for general information or use. They do not constitute advice and should not be relied upon in making (or refraining from making) any decision. Any specific advice or replies to queries in any part of the Site and Mobile apps is/are the personal opinion of such experts/consultants/persons and are not subscribed to by this Site or Mobile app. The information from or through this site is provided on &ldquo;AS IS&rdquo; basis, and all warranties and conditions, expressed or implied of any kind, regarding any matter pertaining to any goods, service or channel, including without Certain links on the Site lead to resources located on servers maintained by third parties, these sites of third party(s) may contain Tipplr&rsquo;s-logo, please understand that it is independent from Tipplr, over whom Tipplr has no control or connection, business or otherwise as these sites are external to Tipplr. You agree and understand that by visiting such sites you are beyond the Tipplr&rsquo;s website. Tipplr, therefore neither endorses nor offers any judgement or warranty and accepts no responsibility or liability for the authenticity, availability, suitability, reliability, accuracy of the information, software, products, services and related graphics contained, of any of the goods/services/or for any damage, loss or harm, direct or consequential or any violation of local or international laws that may be incurred by your visit and/or interactions/s on these site(s), as the same is provided on &ldquo;as is&rdquo; without warranty of any kind. Tipplr gives no warranty and makes no representation whether expressed or implied, that the information contained in this site is error free. Tipplr shall not be responsible nor liable for any consequential damages arising on account of your relying on the contents of the advertisement. Before relying on the material, users should independently verify its relevance for their purposes, and should obtain any appropriate professional advice.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>USER REVIEWS</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>User reviews or ratings for Restaurants do not reflect the opinion of Tipplr. Tipplr receives multiple reviews or ratings for Restaurants by users, which reflect the opinions of the Users. It is pertinent to state that each and every review posted on Tipplr is the personal opinion of the user/reviewer only. Tipplr is a neutral platform, which solely provides a means of communication between users/reviewers including users or restaurant owners/representatives with access to restaurant business page. The advertisements published on the Tipplr Platform are independent of the reviews received by such advertisers.</p>
            <p><strong>&nbsp;</strong></p>
            <p>We are a neutral platform and we don&rsquo;t arbitrate disputes, however in case if someone writes a review that the restaurant does not consider to be true, the best option for the restaurant representative would be to contact the reviewer or post a public response in order to clear up any misunderstandings. If the Restaurant believes that any particular user&rsquo;s review violates any of the Tipplr&rsquo; policies, the restaurant may write to us at support@Tipplr.in and bring such violation to our attention. Tipplr may remove the review in its sole discretion if review is in violation of the Terms, or content guidelines and policies or otherwise harmful to the Services</p>
            <p><strong>&nbsp;</strong></p>
            <p>We have no responsibility or liability to you for any Reviews, and we will only remove</p>
            <p>or edit Reviews where the reviews are, in our view, unreasonably defamatory or otherwise objectionable. We will only do so in accordance with applicable legislation. You will not yourself post, cause or allow any other party to post any Reviews about your own Restaurant that are misleading, deceptive, fraudulent or which otherwise breach any guidelines for Reviews published by us</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>RANKING PARAMETERS</u></strong></p>
            <p>&nbsp;</p>
            <p>We use various ranking parameters on the Platform to determine the order and prominence in which restaurants and Goods appear in search results in response to a customer&rsquo;s search. In order to help you understand how they function, we have set out details and a description of the main ranking parameters that we use at Tipplr app, parameters in detail and description also forms part of this Agreement</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>ONLINE ORDERING</u></strong></p>
            <p>&nbsp;</p>
            <p>Tipplr provides online ordering services by entering into contractual arrangements with restaurant partners (&ldquo;Restaurant Partners&rdquo;) and Stores (as defined below) on a principal-to-principal basis for the purpose of listing their menu items or the Products (as defined below) for online ordering by the Users on the Tipplr Platform.</p>
            <p>&nbsp;</p>
            <p>The Users can access the menu items or Products listed on the Tipplr Platform and place online orders against the Restaurant Partner(s)/Store(s) through Tipplr.</p>
            <p>&nbsp;</p>
            <p>Your request to order food and beverages or Products from a Restaurant Partner or a Store on the Restaurant Partner/Store page on the Tipplr Platform shall constitute an unconditional and irrevocable authorization issued in favour of Tipplr to place online orders for food and beverages or Products against the Restaurant Partner(s)/Store(s) on your behalf.</p>
            <p>&nbsp;</p>
            <p>Delivery of an order placed by you through the Tipplr Platform may either be undertaken directly by the Restaurant Partner or the Store against whom you have placed an order, or facilitated by Tipplr through third-party who may be available to provide delivery services to you (&ldquo;Delivery Partners&rdquo;). In both these cases, Tipplr is merely acting as an intermediary between you and the Delivery Partners, or you and the Restaurant Partner or the Store, as the case may be.</p>
            <p>&nbsp;</p>
            <p>The acceptance by a Delivery Partner of undertaking delivery of your order shall constitute a contract of service under the Consumer Protection Act, 2019 or any successor legislations, between you and the Delivery Partner, to which Tipplr is not a party under any applicable law. It is clarified that Tipplr does not provide any delivery or logistics services and only enables the delivery of food and beverages or Products ordered by the Users through the Tipplr Platform by connecting the Users with the Delivery Partners or the Restaurant Partners or the Store, as the case may be.</p>
            <p>&nbsp;</p>
            <p>Where Tipplr is facilitating delivery of an order placed by you, Tipplr shall not be liable for any acts or omissions on part of the Delivery Partner including deficiency in service, wrong delivery of order, food spillage, time taken to deliver the order, order package tampering, etc.</p>
            <p>&nbsp;</p>
            <p>You may be charged a delivery fee for delivery of your order by the Delivery Partner or the Restaurant Partner or the Store, as the Delivery Partner or the Restaurant Partner or the Store may determine (&ldquo;Delivery Charges &ldquo;). You agree that Tipplr is authorized to collect, on behalf of the Restaurant Partner or the Delivery Partner or the Store, the Delivery Charges for the delivery service provided by the Restaurant Partner or the Store or the Delivery Partner, as the case may be. The Delivery Charges may vary from order to order, which may be determined on multiple factors which shall include but not be limited to Restaurant Partner / Store, order value, distance, demand during peak hours. Tipplr will use reasonable efforts to inform you of the Delivery Charges that may apply to you, provided you will be responsible for Delivery Charges incurred for your order regardless of your awareness of such Delivery Charges.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>ONLINE ORDERING WITH RESTAURANT PARTNERS</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>All prices listed on the Tipplr Platform are provided by the Restaurant Partner at the time of publication on the Tipplr Platform and have been placed as received from the Restaurant Partner. While we take great care to keep them up to date, the final price charged to you by the Restaurant Partner may change at the time of delivery. In the event of a conflict between price on the Tipplr Platform and price charged by the Restaurant Partner, the price charged by the Restaurant Partner shall be deemed to be the correct price except Delivery Charge of Tipplr.</li>
                <p>&nbsp;</p>
                <li>Pickup/Takeaway: When You opt for a Pickup/Takeaway (as defined below) You agree to be solely liable to ensure compliance with the conditions governing the Takeaway at the time of placing the Order, and Tipplr shall not be liable in any manner in this regard. For the purpose of clarity, Pickup (in India)/Takeaway (in all other jurisdictions) would mean where a Restaurant Partner has agreed to provide an option to the Users to collect the Order themselves from the Restaurant Partner on which such an Order is placed. Tipplr accepts no liability associated with food preparation by the Restaurant Partner accepting the Order, and all food preparation and hand over through Takeaway are the sole responsibility of the Restaurant Partner accepting the Order. The Pickup/Takeaway times for collection are provided by the Restaurant Partner and are only estimates.</li>
                <p>&nbsp;</p>
                <li>For the purpose of this clause, words capitalized shall have the following meaning: &ldquo;Promise Time&rdquo; shall mean the time period between the Restaurant Partner accepting the Order and the Delivery Partner reaching within 50 metre radius from Your location or first barrier point (security guard/reception etc.) whichever is further.</li>
            </ol>
            <p>&nbsp;</p>
            <p><strong><u>TIPPLR + OR TIPPLR VIP FOR ONLINE ORDERING OR DINE IN</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>As a member of Tipplr + or Tipplr VIP in India, you can avail Discount (as defined below) on Order placed by You from partnered Restaurants (&ldquo;Partnered Restaurant(s)&rdquo;).</p>
            <p><strong>&nbsp;</strong></p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>On every Order placed by You through the Tipplr Platform, you will get a percentage of discount on the Order value provided that the Order Value for such Order is above the minimum Order value specified by the Partnered Restaurant on the Tipplr Platform (&ldquo;Discount&rdquo;).</li>
                <p>&nbsp;</p>
                <li>The number of Partnered Restaurant(s) may be modified.</li>
                <p>&nbsp;</p>
                <li>The Discount cannot be clubbed with any other offers or discounts or deals extended by the Partnered Restaurant or Tipplr or any other third party.</li>
                <p>&nbsp;</p>
                <li>The Discount is not valid on menu items sold by the Partnered Restaurant at maximum retail price (MRP), combos and special dishes.</li>
                <p>&nbsp;</p>
                <li>
                    <p>The Discount can be availed only for Orders placed for home delivery.</p>
                    <p>&nbsp;</p>
                    <p>The Partnered Restaurant(s) offering Tipplr + or Tipplr VIP for home delivery may differ from Restaurants offering Tipplr + or Tipplr VIP for dine out.</p>
                </li>
                <p>&nbsp;</p>
                <li>You will be responsible to pay the Partnered Restaurant(s) all costs and charges payable for all the other items for which you have placed an Order and are not covered under the Discount.</li>
                <p>&nbsp;</p>
                <li>Tipplr reserves the right to add exclusion days to Tipplr + or Tipplr VIP on Online Ordering at its discretion which will be communicated from time to time.</li>
                <p>&nbsp;</p>
                <li>The term of your Tipplr + or Tipplr VIP membership shall be subject to the membership plan opted by You.</li>
            </ol>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>CONTACTLESS DINING</u></strong></p>
            <p>&nbsp;</p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>Contactless Dining is a dining-in product (&ldquo;Contactless Dining&rdquo;) wherein you can access the digital menu of the restaurant (&ldquo;Restaurant&rdquo;) and (i) place orders (&ldquo;Order(s)&rdquo;) through an option available on the Tipplr mobile application (&ldquo;Application&rdquo;), and/or (ii) make the payment of such Order(s), via the Tipplr Application, while dining at the Restaurant.</li>
                <p>&nbsp;</p>
                <li>Your request to Order food and beverages at a Restaurant can be done by scanning the unique quick response code(s) (&ldquo;QR Code(s)&rdquo;) placed on the table at the Restaurant and thereafter clicking on &lsquo;Place Order&rsquo; tab on the Restaurant page on the Tipplr Application.</li>
                <p>&nbsp;</p>
                <li>You agree and acknowledge that Your request to Order(s) food and beverages at a Restaurant by clicking on Place Order tab on the Restaurant page on the Tipplr Application shall constitute an unconditional and irrevocable authorization issued in favour of Tipplr to place online orders for food and beverages against the Restaurant on your behalf. You further acknowledge, Tipplr is not a manufacturer, seller or distributor of food or beverages and merely places an Order against the Restaurant on behalf of You pursuant to the unconditional and irrevocable authority granted by You to Tipplr, and facilitates the sale and purchase of food and beverages between You and Restaurant, under the contract for sale and purchase of food and beverages between You and Restaurant.</li>
                <p>&nbsp;</p>
                <li>You agree not to place Order(s) or consume alcoholic beverages at the Restaurant unless you have attained legally permissible age as per the applicable law. Where an Order(s) is placed for alcoholic beverages, you agree and acknowledge that the Restaurant reserves the right to verify your age by checking your government photo identification document (&ldquo;ID&rdquo;). Any failure to present the ID, may result in refusal of serving of alcoholic beverages by the Restaurant.&nbsp; You further hereby agree that consumption of alcoholic beverages will be done responsibly and you shall not indulge in any such act&nbsp;&nbsp; which may be in breach of the applicable law. You hereby agree that Tipplr shall not be liable for any such act on Your part.</li>
                <p>&nbsp;</p>
                <li>Please note that some of the food may be suitable for certain ages only. You should check the dish you are ordering and read its description, if provided, prior to placing your Order(s). Tipplr shall not be liable in the event food ordered by you does not meet your dietary or any other requirements and/or restrictions.</li>
                <p>&nbsp;</p>
                <li>The total price for food ordered, and other charges that may be levied by the Restaurant, will be displayed on the Tipplr Application when you place your Order, which may be rounded up to the nearest amount (Rupee as applicable). This practice of rounding off to the nearest Rupee, does not amount to be indulging in any Unfair Trade Practice or Deficiency in Service. You shall be liable to make full payment towards such food orders at the end of Your meal through the Tipplr App only. It is hereby clarified that it is the responsibility of the Restaurant to raise an appropriate tax invoice on You for Your Order(s). Tipplr shall not be liable for any claim or discrepancies raised for the taxes levied. Tipplr is merely a facilitator for the transaction.</li>
                <p>&nbsp;</p>
                <li>The Restaurant may levy service charges at its own discretion. If you wish to remove service charge, kindly inform the Restaurant directly. Please note, Tipplr shall not be liable for any such charges levied by the Restaurant.</li>
                <p>&nbsp;</p>
                <li>While availing Contactless Dining, if You make payment towards the bill via the Tipplr Application, you shall not make any payment towards Your Order(s) to the Restaurant in cash or via any other manner.</li>
                <p>&nbsp;</p>
                <li>There is no restriction on the number of diners at the table. However, Restaurant Partners shall have final say and discretion.</li>
                <p>&nbsp;</p>
                <li>Tipplr shall not be liable for any acts or omissions on part of the Restaurant including but not limited to deficiency in service, quality of food, sale of alcohol, time taken to prepare the Order(s) or any other experience of the User.</li>
                <p>&nbsp;</p>
                <li>It is hereby further clarified by Tipplr that the liability of any violation of the food safety and standards law and applicable rules and regulations made thereunder shall solely rest with the Restaurant, importers, brand owners or manufacturers of the food products or any Pre-Packed Goods accordingly. For the purpose of clarity Pre-Packed Goods shall mean the food and beverages items which are placed in a package of any nature, in such a manner that the contents cannot be changed without tampering it and which is ready for sale to the customer or as may be defined under the applicable law.</li>
                <p>&nbsp;</p>
                <li>Notwithstanding anything otherwise set out herein, Tipplr shall in no manner be liable in any way for any in-person interactions with the Restaurant or for the User&rsquo;s experience at the Restaurant and that the Restaurant shall, at all times remain, solely liable including but not limited to, for (a) the goods and/or services, rendered to a User at the Restaurant; (c) any in-person interactions with the User by the Restaurant and or its representatives; (d) payment of all applicable taxes and statutory dues with respect to the goods and services offered and charged by the Restaurant and compliance with all applicable laws; (e) the User&rsquo;s experience at the Restaurant.</li>
            </ol>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>ADVERTISING MATERIAL</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>Part of the Site contains advertising information or promotion material or other material submitted to Tipplr by third parties. Responsibility for ensuring that material submitted for inclusion on site or Mobile apps complies with applicable International and National law is exclusively on the party providing the information/material. Your correspondence or business dealings with, or participation in promotions of, advertisers other than Tipplr found on or through the Website and or Mobile apps, including payment and delivery of related goods or services, and any other terms, conditions, warranties or representations associated with such dealings, are solely between You and such advertiser. Tipplr will not be responsible or liable for any claim, error, omission, inaccuracy in advertising material or any loss or damage of any sort incurred as the result of any such dealings or as the result of the presence of such non-Tipplr advertisers on the Website and Mobile apps. Tipplr reserves the right to omit, suspend or change the position of any advertising material submitted for insertion. Acceptance of advertisements on the site and Mobile apps will be subject to these terms and conditions<strong>.</strong></p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>DATA PROTECTION AND PRIVACY</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>Please refer to our Privacy Policy which is constitutes a binding agreement between User and the Company. It can be accessed through&nbsp;<a href="https://www.tipplr.in/privacy-policy/" target="_blank">https://www.tipplr.in/privacy-policy</a></p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>RELATIONSHIP</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>None of the provisions of the User Agreement shall be deemed to constitute a partnership or agency between you and Tipplr and you shall have no authority to bind Tipplr in any manner, whatsoever.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>FORCE MAJEURE</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>Tipplr is entitled to cancel the Order, e.g., if the Offer is no longer available, if the Customer has provided an incorrect or inoperative telephone number or other contact information, or in case of force majeure. In case of non-delivery or discrepancy in the service, your payment is liable to be credited as per the Company Refund Policy. You shall indemnify Tipplr from any claims arising out of a Force Majeure Event. &nbsp;</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>INDIAN LAW</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>The Agreement shall be governed by the Laws of India. The Courts of law at Bangalore/Karnataka shall have exclusive jurisdiction over any disputes arising under this agreement.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>ENTIRE AGREEMENT</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>These Terms of Service, Privacy Policy <a href="https://www.tipplr.in/privacy-policy/" target="_blank">www.tipplr.in/privacy-policy</a>&nbsp;and Refund Policy on website&nbsp;<a href="https://www.tipplr.in" target="_blank">www.tipplr.in</a>&nbsp;constitute the entire agreement between the parties with respect to the subject matter hereof and supersedes and replaces all prior or contemporaneous understandings or agreements, written or oral, regarding such subject matter.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>RIGHT TO REMOVE INAPPROPRIATE MESSAGES</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>We reserve the right to remove any messages or reviews we deem to be inappropriate, i.e, racist, sexist or threatening. Messages using inappropriate language will also be removed. We do not wish to be censors, but our forums must remain civilized and respect the rights of others.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>LIMITED TIME TO BRING YOUR CLAIM</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>You and Tipplr agree that any cause of action arising out of or related to the Tipplr&rsquo;s websites or mobile apps, only, must commence within one (1) year after the cause of action accrues otherwise, such cause of action will be permanently barred.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>ACCEPTANCE POLICY OF PRIVACY</u></strong></p>
            <p><strong>&nbsp;</strong></p>
            <p>By using Tipplr&rsquo;s sites and services, you signify your acceptance of its Privacy Policy. If you do not agree or are not comfortable with any policy described in this Privacy Policy, your only remedy is to discontinue use of Tipplr sites or mobile apps. We reserve the right, to modify this Privacy Policy at any time.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>GENERAL TERMS</u></strong></p>
            <p>&nbsp;</p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>Rights and obligations under the Terms which by their nature should survive will remain in full effect after termination or expiration of the Terms.</li>
                <p>&nbsp;</p>
                <li>Any express waiver or failure to exercise promptly any right under the Terms will not create a continuing waiver or any expectation of non-enforcement.</li>
                <p>&nbsp;</p>
                <li>If any provision of the Terms is held invalid by any law or regulation of any government, or by any court of law, the parties agree that such provision will be replaced with a new provision that accomplishes the original business purpose, and the other provisions of the Terms will remain in full force and effect.</li>
                <p>&nbsp;</p>
                <li>Tipplr may on request of any third party promote its products/services by issuing promotional offers/gift coupons/discount vouchers/pre-paid vouchers (&ldquo;promotional offers&rdquo;). It is clarified that such promotional offers received from Tipplr are to be settled inter-se between the parties to such transaction and the respective third party promoting its service/product and warranties express or implied of any kind, regarding any matter pertaining thereto, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and non-infringement are disclaimed by Tipplr.</li>
            </ol>
            <p>&nbsp;</p>
            <p><strong><u>INDEMNIFICATION</u></strong></p>
            <p>&nbsp;</p>
            <p>You agree to indemnify and hold harmless Tipplr, partners, employees, suppliers, and affiliates, from and against any losses, damages, fines and expenses (including attorney&rsquo;s fees and costs) arising out of or relating to any claims that you have used the Services in violation of another party&rsquo;s rights, in violation of any law, in violations of any provisions of the Terms, or any other claim related to your use of the Services, except where such use is authorized by Tipplr.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>NO-SHOW CANCELLATIONS</u></strong></p>
            <p>&nbsp;</p>
            <p>If you remain uncontactable or fail to receive the Order within fifteen (15) minutes from the time the Order arrives at your delivery address, Tipplr reserves the right to cancel the Order without refund or remedy to you.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>REFUSAL TO PAY CASH &ndash; Tipplr doesn&rsquo;t have a cash on delivery policy.</u></strong></p>
            <p>&nbsp;</p>
            <p><strong><u>REDRESSAL MECHANISM</u></strong></p>
            <p>&nbsp;</p>
            <p>Any complaints, abuse or concerns with regards to content and or comment or breach of these terms shall be immediately informed to the designated Grievance Officer as mentioned below via in writing or through email signed with the electronic signature to&nbsp;<a href="mailto:grievance@tipplr.in">grievance@tipplr.in</a>&nbsp;or call on +91-8929221233.</p>
            <p>&nbsp;</p>
            <p>Grievance Redressal Officer</p>
            <p>Tipplr</p>
            <p>Food Space Technology Pvt Ltd</p>
            <p>12, Cunningham Crescent Road</p>
            <p>Bangalore-560052</p>
            <p>India</p>
            <p>&nbsp;</p>
            <p>We request you to please provide the following information in your complaint:</p>
            <ol style={{listStyleType: "lower-alpha"}}>
                <li>A physical or electronic signature of a person authorized to act on behalf of the owner for the purposes of the complaint.</li>
                <p>&nbsp;</p>
                <li>Identification of the work/complaint. In case of Intellectual Property Infringements, description, title papers (if any) and images of infringement.</li>
                <p>&nbsp;</p>
                <li>Identification of the material on our website that is claimed to be infringing or to be the subject of infringing activity.</li>
                <p>&nbsp;</p>
                <li>The address, telephone number or e-mail address of the complaining party.</li>
                <p>&nbsp;</p>
                <li>A statement that the complaining party has a good-faith belief that use of the material in the manner complained of is not authorized by the owner, its agent or the law.</li>
                <p>&nbsp;</p>
                <li>A statement, under penalty of perjury, that the information in the Complaint is accurate, and that the complaining party is authorized to act.</li>
                <p>&nbsp;</p>
                <li>undertaking that the complainant shall file an infringement suit in the competent court against the person responsible for uploading the infringing copy and produce the orders of the competent court having jurisdiction, within a period of twenty-one days from the date of receipt of the notice.</li>
            </ol>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>CONTACT US</u></strong></p>
            <p>&nbsp;</p>
            <p>If you wish to contact us regarding any questions or comments you may have, please send an email&nbsp;<a href="mailto:support@tipplr.in">support@tipplr.in</a>&nbsp;to our customer support email or via our in-app customer support chat feature.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong><u>YOU EXPRESSLY UNDERSTAND AND AGREE THAT THE USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED ON AN AS-IS-AND-AS-AVAILABLE BASIS. Tipplr EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF RESTURANTABILITY AND THEIR SERVICE. Tipplr MAKES NO WARRANTY THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE. USE OF ANY MATERIAL DOWNLOADED OR OBTAINED THROUGH THE USE OF THE SERVICES SHALL BE AT YOUR OWN DISCRETION AND RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM, MOBILE TELEPHONE, WIRELESS DEVICE OR DATA THAT RESULTS FROM THE USE OF THE SERVICES OR THE DOWNLOAD OF ANY SUCH MATERIAL. NO ADVICE OR INFORMATION, WHETHER WRITTEN OR ORAL, OBTAINED BY YOU FROM Tipplr, ITS EMPLOYEES OR REPRESENTATIVES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THE TERMS.</u></strong></p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>These Terms were last updated on Nov 2022 and deemed to be effective as of today.</p>

        </div>
    
    </div>)
}
export default Termsandconditions;