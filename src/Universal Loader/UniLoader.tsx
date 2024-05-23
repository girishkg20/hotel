// import "./UniLoader.css";
// import logo from "./Source/logo_purple.png";


// const Uniloader = () => {


//     return(<div className="loaderholder">
//         <div>
//             <svg className="loader" width="240" height="240" viewBox="0 0 240 240">
//                 <circle className="loader-ring loader-ring-a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
//                 <circle className="loader-ring loader-ring-b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
//                 <circle className="loader-ring loader-ring-c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
//                 <circle className="loader-ring loader-ring-d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
//             </svg>
//         </div>
//     </div>)
// }
// export default Uniloader;

///////////////////////////////////// First Loader //////////////////////////////////////////



///////////////////////////////////// Second Loader //////////////////////////////////////////
import "./UniLoader.css";
import logo from "./Source/logo_white.png"


const Uniloader = () => {


    return(<div className="loaderholder">

        <span className="sun sunshine"></span>
        <span className="sun sunshine1"></span>
        <span className="sun sunshine2"></span>
        <span className="sun">
            <img src={logo} alt="tipplr" width={123}/>
        </span>
        
    </div>)
}
export default Uniloader;