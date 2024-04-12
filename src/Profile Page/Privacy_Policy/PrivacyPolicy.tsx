import "./PrivacyPolicy.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backbutton from "./Source/back.png";







const Privacypolicy = () => {

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
                <h3 className='headertext' id='pspheadertext'>Privacy Policy</h3>
            </div>
        </div>

        <div className="pspcontentsholder">

            <h1 style={{fontSize: "20px"}}><strong><center>FOOD SPACE TECHNOLOGY PVT. LTD.</center></strong></h1>
            <h1 style={{fontSize: "18px"}}><strong><center>PRIVACY POLICY</center></strong></h1>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>This Privacy Policy (&ldquo;<strong>Policy</strong>&rdquo;) describes the policies and procedures on the collection, use, disclosure and protection of your information when you use our website located at&nbsp;Tipplr.com, or the Tipplr mobile application (collectively, &ldquo;<strong>Tipplr Platform</strong>&rdquo;) made available by Food Space Technology Pvt Ltd (&ldquo;<strong>Tipplr</strong>&rdquo;, &ldquo;<strong>Company</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo; and &ldquo;<strong>our</strong>&rdquo;),&nbsp;a private company established under the laws of India having its registered office at Tipplr, No.12, Cunningham Crescent Road, Bangalore &ndash; 560052</p>
            <p>&nbsp;</p>
            <p>The terms &ldquo;you&rdquo; and &ldquo;your&rdquo; refer to the user of the Tipplr Platform. The term &ldquo;<strong>Services</strong>&rdquo; refers to any services offered by Tipplr whether on the Tipplr Platform or otherwise.</p>
            <p>&nbsp;</p>
            <p>Please read this Policy before using the Tipplr Platform or submitting any personal information to Tipplr. This Policy is a part of and incorporated within, and is to be read along with our Terms and Conditions and Refund Policy.</p>
            <p>&nbsp;</p>
            <p>You have been provided an opportunity to freely access the policy and agree to our Terms and Conditions before using our Services, having regard to Indian Contract Act, 1872 and Information Technology Act, 2000.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong>YOUR CONSENT</strong></p>
            <p>&nbsp;</p>
            <p>By using the Tipplr Platform and the Services, you agree and consent to the collection, transfer, use, storage, disclosure and sharing of your information as described and collected by us in accordance with this Policy. &nbsp;If you do not agree with the Policy, please do not use or access the Tipplr Platform.</p>
            <p>&nbsp;</p>
            <p><strong>POLICY CHANGES</strong></p>
            <p>&nbsp;</p>
            <p>We may occasionally update this Policy and such material changes will be posted on this page. If we make any significant changes to this Policy, we will endeavour to provide you with reasonable notice of such changes, such as via prominent notice on the Tipplr Platform or to your email address on record and where required by applicable law, we will obtain your consent. To the extent permitted under the applicable law, your continued use of our Services after we publish or send a notice about our changes to this Policy shall constitute your consent to the updated Policy.</p>
            <p>&nbsp;</p>
            <p><strong>LINKS TO OTHER WEBSITES</strong></p>
            <p>&nbsp;</p>
            <p>The Tipplr Platform may contain links to other websites. Any personal information about you collected whilst visiting such websites is not governed by this Policy. Tipplr shall not be responsible for and has no control over the practices and content of any website accessed using the links contained on the Tipplr Platform. This Policy shall not apply to any information you may disclose to any of our service providers/service personnel which we do not require you to disclose to us or any of our service providers under this Policy. Tipplr assumes no responsibility for consequences resulting from use of information obtained at linked sites.&nbsp; Tipplr is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, reliance on, or performance of such information.</p>
            <p>&nbsp;</p>
            <p><strong>INFORMATION WE COLLECT FROM YOU</strong></p>
            <p>&nbsp;</p>
            <p>We will collect and process the following information about you:</p>
            <ol>
                <li><strong>Information you give us &ndash;&nbsp;</strong>This includes information submitted when you:
                    <p>&nbsp;</p>
                    <p>Create or update your Tipplr account, which may include your name, email, phone number, login name and password, address, payment or banking information, date of birth and profile picture or your area code (geographical location). If you sign in to the Tipplr platform through third-party sign-in services such as Facebook, Google Plus or Gmail or any other social networking or similar site (collectively, &ldquo;SNS&rdquo;), an option of which may be provided to you by Tipplr at its sole discretion, you will be allowing us to pass through and receive from the SNS your log-in information and other user data; or Provide content to us, which may include reviews, ordering details and history, favourite vendors, special merchant requests, contact information of people you refer to us and other information you provide on the Tipplr Platform (&ldquo;<strong>Your Content</strong>&rdquo;).</p>
                    <p>&nbsp;</p>
                    <p>To use our Services, we may collect and store information about you to process your requests and automatically complete forms for future transactions, including (but not limited to) your phone number, address, email, billing information and credit or payment card information. Correspond with Tipplr for customer support; information regarding your participation in the interactive services offered by the Tipplr Platform such as discussion boards, competitions, promotions or surveys, other social media functions or make payments etc., or Enable features that require Tipplr&rsquo;s access to your address book or calendar; data contained in report problems for troubleshooting.</p>
                    <p>&nbsp;</p>
                    <p>If you sign up to use our Services as a merchant or a delivery partner, we may collect location details, copies of government identification documents and other details (KYC), call and SMS details.</p>
                </li>
                <p>&nbsp;</p>
                <li><strong>Information we collect about you &ndash;&nbsp;</strong>With regard to each of your visits to the Tipplr Platform, we will automatically collect and analyse the following demographic and other information: When you communicate with us (via email, phone, through the Tipplr Platform or otherwise), we may maintain a record of your communication;
                    <p>&nbsp;</p>
                    <p><strong>Location information</strong>: Depending on the Services that you use, and your app settings or device permissions, we may collect your real time information, or approximate location information as determined through data such as GPS, IP address;</p>
                    <p>&nbsp;</p>
                    <p><strong>Usage and Preference Information</strong>: We collect information as to how you interact with our Services, preferences expressed and settings chosen. Tipplr Platform includes the Tipplr advertising services (&ldquo;Ad Services&rdquo;), which may collect user activity and browsing history within the Tipplr Platform and across third-party sites and online services, including those sites and services that include our ad pixels (&ldquo;Pixels&rdquo;), widgets, plug-ins, buttons, or related services or through the use of cookies. Our Ad Services collect browsing information including without limitation your Internet protocol (IP) address and location, your login information, browser type and version, date and time stamp, user agent, Tipplr cookie ID (if applicable), time zone setting, browser plug-in types and versions, operating system and platform, and other information about user activities on the Tipplr Platform, as well as on third party sites and services that have embedded our Pixels, widgets, plug-ins, buttons, or related services;</p>
                </li>
                <p>&nbsp;</p>
                <li><strong>Transaction Information</strong>: We collect transaction details related to your use of our Services, and information about your activity on the Services, including the full Uniform Resource Locators (URL), the type of Services you requested or provided, comments, domain names, search results selected, number of clicks, information and pages viewed and searched for, the order of those pages, length of your visit to our Services, the date and time you used the Services, amount charged, details regarding application of promotional code, methods used to browse away from the page and any phone number used to call our customer service number and other related transaction details;</li>
                <p>&nbsp;</p>
                <li><strong>Device Information</strong>: We may collect information about the devices you use to access our Services, including the hardware models, operating systems and versions, software, file names and versions, preferred languages, unique device identifiers, advertising identifiers, serial numbers, device motion information and mobile network information. Analytics companies may use mobile device IDs to track your usage of the Tipplr Platform;</li>
                <p>&nbsp;</p>
                <li><strong>Stored information and files</strong>:&nbsp; Tipplr mobile application (Tipplr app) may also access metadata and other information associated with other files stored on your mobile device. This may include, for example, photographs, audio and video clips, personal contacts and address book information. If you permit the Tipplr app to access the address book on your device, we may collect names and contact information from your address book to facilitate social interactions through our services and for other purposes described in this Policy or at the time of consent or collection. If you permit the Tipplr app to access the calendar on your device, we collect calendar information such as event title and description, your response (Yes, No, Maybe), date and time, location and number of attendees. If you are a partner restaurant, merchant or a delivery partner, we will, additionally, record your calls with us made from the device used to provide Services, related call details, SMS details location and address details.</li>
            </ol>
            <p>&nbsp;</p>
            <p><strong>COOKIES</strong></p>
            <p>&nbsp;</p>
            <p>Our Tipplr Platform and third parties with whom we partner, may use cookies, pixel tags, web beacons, mobile device IDs, &ldquo;flash cookies&rdquo; and similar files or technologies to collect and store information with respect to your use of the Services and third-party websites.</p>
            <p>&nbsp;</p>
            <p>Cookies are small files that are stored on your browser or device&nbsp;by websites, apps, online media and advertisements. We use cookies and similar technologies for purposes such as:</p>
            <ul>
                <li>Authenticating users;</li>
                <li>Remembering user preferences and settings;</li>
                <li>Determining the popularity of content;</li>
                <li>Delivering and measuring the effectiveness of advertising campaigns;</li>
                <li>Analysing site traffic and trends, and generally understanding the online behaviours and interests of people who interact with our services.</li>
            </ul>
            <p>&nbsp;</p>
            <p>A pixel tag (also called a web beacon or clear GIF) is a tiny graphic with a unique identifier, embedded invisibly on a webpage (or an online ad or email), and is used to count or track things like activity on a webpage or ad impressions or clicks, as well as to access cookies stored on users&rsquo; computers. We use pixel tags to measure the popularity of our various pages, features and services. We also may include web beacons in e-mail messages or newsletters to determine whether the message has been opened and for other analytics.</p>
            <p>&nbsp;</p>
            <p>To modify your cookie settings, please visit your browser&rsquo;s settings. By using our Services with your browser settings to accept cookies, you are consenting to our use of cookies in the manner described in this section.</p>
            <p>&nbsp;</p>
            <p>We may also allow third parties to provide audience measurement and analytics services for us, to serve advertisements on our behalf across the Internet, and to track and report on the performance of those advertisements. These entities may use cookies, web beacons, SDKs and other technologies to identify your device when you visit the Tipplr Platform and use our Services, as well as when you visit other online sites and services. All of which can be restricted at your choice and will. Our access and use is limited to provide you a personalised and enjoyable Service on Tipplr.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong>USES OF YOUR INFORMATION</strong></p>
            <p>&nbsp;</p>
            <p>We use the information we collect for following purposes, including:</p>
            <ol>
                <li>To provide, personalise, maintain and improve our products and services, such as to enable deliveries and other services, enable features to personalise your Tipplr account;</li>
                <p>&nbsp;</p>
                <li>To carry out our obligations arising from any contracts entered into between you and us and to provide you with the relevant information and services;</li>
                <p>&nbsp;</p>
                <li>To administer and enhance the security of our Tipplr Platform and for internal operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes;</li>
                <p>&nbsp;</p>
                <li>To provide you with information about services we consider similar to those that you are already using, or have enquired about, or may interest you. If you are a registered user, we will contact you by electronic means (e-mail or SMS or telephone) with information about these services;</li>
                <p>&nbsp;</p>
                <li>To understand our users (what they do on our Services, what features they like, how they use them, etc.), improve the content and features of our Services (such as by personalizing content to your interests), process and complete your transactions, make special offers, provide customer support, process and respond to your queries;</li>
                <p>&nbsp;</p>
                <li>To generate and review reports and data about, and to conduct research on, our user base and Service usage patterns to improve our Services;</li>
                <p>&nbsp;</p>
                <li>To allow you to participate in interactive features of our Services, if any; or</li>
                <p>&nbsp;</p>
                <li>To measure or understand the effectiveness of advertising we serve to you and others, and to deliver relevant advertising to you.</li>
                <p>&nbsp;</p>
                <li>If you are a partner restaurant or merchant or delivery partner, to track the progress of delivery or status of the order placed by our customers We may combine the information that we receive from third parties with the information you give to us and information we collect about you for the purposes set out above. &nbsp;Further, we may anonymize and/or de-identify information collected from you through the Services or via other means, including via the use of third-party web analytic tools. As a result, our use and disclosure of aggregated and/or de-identified information is not restricted by this Policy, and it may be used and disclosed to others without limitation. We analyse the log files of our Tipplr Platform that may contain Internet Protocol (IP) addresses, browser type and language, Internet service provider (ISP), referring, app crashes, page viewed and exit websites and applications, operating system, date/time stamp, and clickstream&nbsp;data. This helps us to administer the website, to learn about user behaviour on the site, to improve our product and services, and to gather demographic information about our user base as a whole.</li>
                <p>&nbsp;</p>
                <li>Upon Government order, competent authority or court of Law</li>
            </ol>
            <p>&nbsp;</p>
            <p><strong>DISCLOSURE AND DISTRIBUTION OF YOUR INFORMATION</strong></p>
            <p>&nbsp;</p>
            <p>We may share your information that we collect for following purposes:</p>
            <ol>
                <li><strong>With Service Providers:&nbsp;</strong>We may share your information with our vendors, in house marketing partners, and other service providers or business partners, such as Payment processing companies, to support our business. For example, your information may be shared with outside vendors to send you emails and messages or push notifications to your devices in relation to our Services, to help us analyse and improve the use of our Services, to process and collect payments.</li>
                <p>&nbsp;</p>
                <li><strong>With Partner Restaurants/Merchant:</strong>&nbsp;While you place a request to order food through the Tipplr Platform, your information is provided to us and to the restaurants/merchants with whom you may choose to order. In order to facilitate your online food order processing, we provide your information to that restaurant/merchant in a similar manner as if you had made a food order directly with the restaurant. If you provide a mobile phone number, Tipplr may send you text messages regarding the order&rsquo;s delivery status.</li>
                <p>&nbsp;</p>
                <li><strong>With Other Users:&nbsp;</strong>If you are a delivery partner, we may share your name, phone number and/or profile picture (if applicable), tracking details with other users to provide them the Services.</li>
                <p>&nbsp;</p>
                <li><strong>For Crime Prevention or Investigation:&nbsp;</strong>We may share this information with governmental agencies or other companies assisting us, when we are:
                    <p>&nbsp;</p>
                    <p>Obligated under the applicable laws or in good faith to respond to court orders and processes;</p>
                    <center><strong>or</strong></center>
                    <p>Detecting and preventing against actual or potential occurrence of identity theft, fraud, abuse of Services and other illegal acts;</p>
                    <p>&nbsp;</p>
                    <p>Responding to claims that an advertisement, posting or other content violates the intellectual property rights of a third party;</p>
                    <p>&nbsp;</p>
                    <p>Under a duty to disclose or share your personal data in order to enforce our Terms of Use and other agreements, policies or to protect the rights, property, or safety of the Company, our customers, or others, or in the event of a claim or dispute relating to your use of our Services. This includes exchanging information with other companies and organisations for the purposes of fraud detection and credit risk reduction.</p>
                </li>
                <p>&nbsp;</p>
                <li><strong>For Internal Use:&nbsp;</strong>We may share your information with any present or future member of our &ldquo;Group&rdquo; (as defined below)or affiliates for our internal business purposes The term &ldquo;Group&rdquo; means, with respect to any person, any entity that is controlled by such person, or any entity that controls such person, or any entity that is under common control with such person, whether directly or indirectly, or, in the case of a natural person, any Relative (as such term is defined in the Companies Act, 1956 and Companies Act, 2013 to the extent applicable) of such person.</li>
                <p>&nbsp;</p>
                <li><strong>With Advertisers and advertising networks:&nbsp;</strong>We may work with third parties such as network advertisers to serve advertisements on the Tipplr Platform and on third-party websites or other media (e.g., social networking platforms). These third parties may use cookies, JavaScript, web beacons (including clear GIFs), Flash LSOs and other tracking technologies to measure the effectiveness of their ads and to personalize advertising content to you.&nbsp;We ensure that the data shared is strictly limited to use for personalising your experience on Tipplr Platform. Any third-party engaged by us to render such services are bound by our Privacy Policies to protect your data.
                    <p>&nbsp;</p>
                    <p>While you cannot opt out of advertising on the Tipplr Platform, you may opt out of much interest-based advertising on third party sites and through third party ad networks (including DoubleClick Ad Exchange, Facebook Audience Network and Google AdSense). For more information, visit&nbsp;<a href="https://www.aboutads.info/choices" target="_blank">www.aboutads.info/choices</a>. Opting out means that you will no longer receive personalized ads by third parties&rsquo; ad networks from which you have opted out, which is based on your browsing information across multiple sites and online services. If you delete cookies or change devices, your opt out may no longer be effective.</p>
                </li>
            </ol>
            <ul>
                <li>To fulfil the purpose for which you provide it.</li>
                <li>We may share your information other than as described in this Policy if we notify you and you consent to the sharing.</li>
            </ul>
            <p><strong>&nbsp;</strong></p>
            <p><strong>DATA SECURITY PRECAUTIONS</strong></p>
            <p>&nbsp;</p>
            <p>We have in place appropriate technical and security measures to secure the information collected by us.</p>
            <p>&nbsp;</p>
            <p>We use vault and tokenization services from third party service providers to protect the sensitive personal information provided by you. The third-party service providers with respect to our vault and tokenization services and our payment gateway and payment processing are compliant with the payment card industry standard (generally referred to as PCI compliant service providers). You are advised not to send your full credit/debit card details through unencrypted electronic platforms. Where we have given you (or where you have chosen) a username and password which enables you to access certain parts of the Tipplr Platform, you are responsible for keeping these details confidential. We ask you not to share your password with anyone.</p>
            <p>&nbsp;</p>
            <p>Please be aware that the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted through the Tipplr Platform. Once we have received your information, we will use strict physical, electronic, and procedural safeguards to try to prevent unauthorised access. You agree to indemnify us from any data breach caused by unauthorised third-parties.</p>
            <p>&nbsp;</p>
            <p><strong>OPT-OUT</strong></p>
            <p>&nbsp;</p>
            <p>When you sign up for an account, you are opting in to receive emails from Tipplr. You can log in to manage your email preferences <a href="https://www.tipplr.in/contact-us" target="_blank">https://www.tipplr.in/contact-us</a> or you can follow the &ldquo;unsubscribe&rdquo; instructions in commercial email messages, but note that you cannot opt out of receiving certain administrative notices, service notices, or legal notices from Tipplr.</p>
            <p>&nbsp;</p>
            <p>If you wish to withdraw your consent for the use and disclosure of your personal information in the manner provided in this Policy, please write to us at support@tipplr.in Please note that we may take time to process such requests, and your request shall take effect no later than 5 (Five) business days from the receipt of such request, after which we will not use your personal data for any processing unless required by us to comply with our legal obligations. We may not be able offer you any or all Services upon such withdrawal of your consent.</p>
            <p>&nbsp;</p>
            <p>VISITING AN OFFICIAL TIPPLR PAGE ON THIRD-PARTY WEBSITES/APPLICATIONS</p>
            <p>&nbsp;</p>
            <p>We maintain accounts on third-party websites, such as social media sites, as tools to better interact with the public. Your activity on those third-party websites is governed by the security and privacy policies of those sites. Users of third-party websites are often sharing information with the general public, user community, and/or the third-party operating the website. These actors may use this information in a variety of ways. You should review the privacy policies of third-party websites before using them and ensure that you understand how your information may be used. You should also adjust privacy settings on your account on any third-party website to match your preferences.</p>
            <p>&nbsp;</p>
            <p>Common third-party websites in use include:</p>
            <p>&nbsp;</p>
            <p>Facebook Privacy Policy</p>
            <p><a href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&amp;entry=0" target="_blank">https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&amp;entry=0</a></p>
            <p>&nbsp;</p>
            <p>&nbsp;Instagram Privacy Policy</p>
            <p><a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect" target="_blank">https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect</a></p>
            <p>&nbsp;</p>
            <p>Twitter Privacy Policy</p>
            <p><a href="https://twitter.com/en/privacy" target="_blank">https://twitter.com/en/privacy</a></p>
            <p>&nbsp;</p>
            <p>YouTube Privacy Policy</p>
            <p><a href="https://www.youtube.com/t/privacy" target="_blank">https://www.youtube.com/t/privacy</a></p>
            <p>&nbsp;</p>
            <p>LinkedIn</p>
            <p><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank">https://www.linkedin.com/legal/privacy-policy</a></p>
            <p>&nbsp;</p>
            <p>Pinterest</p>
            <p><a href="https://policy.pinterest.com/en/privacy-policy" target="_blank">https://policy.pinterest.com/en/privacy-policy</a></p>
            <p>&nbsp;</p>
            <p>PROHIBITED ACTIVITIES</p>
            <ol>
                <li>User of Tipplr acknowledges and agrees not to host, display, upload, modify, publish, transmit, update or share any information that:</li>
            </ol>
            <ol style={{ listStyleType: "lower-alpha" }}>
                <li>belongs to another person and to which the user does not have any right to;</li>
                <li>is grossly harmful, harassing, blasphemous defamatory, obscene, pornographic, pedophilic, libelous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever;</li>
                <li>harm minors in any way;</li>
                <li>infringes any patent, trademark, copyright or other proprietary rights;</li>
                <li>violates any law for the time being in force;</li>
                <li>deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;</li>
                <li>impersonate another person;</li>
                <li>contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;</li>
                <li>threatens the unity, integrity, defense, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.</li>
            </ol>
            <p>&nbsp;</p>
            <p>Tipplr upon obtaining knowledge by itself or been brought to actual knowledge by an affected person in writing or through email signed with electronic signature about any such information as mentioned, shall act within thirty-six hours and where applicable, work with User or owner of such information to disable such information that is in contravention of this Clause. Further, Tipplr shall preserve such information and associated records for at least ninety days for investigation purposes.</p>
            <p>&nbsp;</p>
            <p>RIGHT TO ERASE</p>
            <p>&nbsp;</p>
            <p>User has the right to withdraw their previously given consent and have the personal information erased from Tipplr&rsquo;s system for the data that is no longer necessary for the purpose that it is shared. However, doesn&rsquo;t mean that Your data will be erased immediately, it will still be stored at Tipplr&rsquo;s facility in order to comply with numerous statutory obligations and Applicable Laws. After this period has elapsed, Your Personal Data will be deleted from Tipplr&rsquo;s records.</p>
            <p><strong>&nbsp;</strong></p>
            <p><strong>GRIEVANCE OFFICER AND TIPPLR PLATFORM SECURITY</strong></p>
            <p>&nbsp;</p>
            <p>If you have any queries relating to the processing or usage of information provided by you in connection with this Policy, please email us at&nbsp;<a href="mailto:support@tipplr.in">support@tipplr.in</a>&nbsp;or write to our Grievance Officer at the following address:</p>
            <p>&nbsp;</p>
            <p><strong>Tipplr Grievance Officer</strong></p>
            <p>Food Space Technology Pvt Ltd,</p>
            <p>Tipplr, No.12, Cunningham Crescent Road, Bangalore-560052</p>
            <p>&nbsp;</p>
            <p>Further, please note that the Tipplr Platform stores your data with the cloud platform of Amazon Web Services provided by Amazon Web Services, Inc., which may store this data on their servers located outside of India. Amazon Web Services has security measures in place to protect the loss, misuse and alteration of the information, details of which are available at <a href="https://aws.amazon.com" target="_blank">https://aws.amazon.com</a>. The privacy policy adopted by Amazon Web Services are detailed in <a href="https://aws.amazon.com/privacy" target="_blank">https://aws.amazon.com/privacy</a>. In the event you have questions or concerns about the security measures adopted by Amazon Web Services, you can contact their data protection / privacy team / legal team or designated the grievance officer at these organisations, whose contact details are available in its privacy policy, or can also write to our Grievance Officer at the address provided above.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>Last Updated: 11/11/2022</p>

        </div>
    
    </div>)
}
export default Privacypolicy;