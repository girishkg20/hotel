import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation'
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store';
import './index.css';
import Homepage from './Home Page/HomePage.js';
import Profile from './Profile/Profile.js';
import Menupage1 from './Menu Page/MenuPage1';
import Itempopup from './Menu Page/Item_Popup/ItemPopup';
import Loginpage from './Login Page/LoginPage';
import Phno from './Login Page/Enter_Ph_No/PhNo';
import Enterotp from './Login Page/Enter_Otp/EnterOTP';
import Custpopup from './Menu Page/Cust_Popup/CustPopup';
import Clearcartpopup from './Menu Page/Clear_Cart_Popup/ClearCartPopup';

import { Link } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';



const Router = createBrowserRouter([
    {
      path: "/:hotelid",
      element: <Homepage/>,
      errorElement: <div><h1>Wrong URL! Channa</h1></div>,
    },
    {
      path: "/:hotelid/profile",
      element: <Profile/>,
    },
    {
      path: "/:hotelid/:merchantid",
      element: <Menupage1/>,
      children: [
        {
          path: "/:hotelid/:merchantid/:itemid",
          element: <Itempopup/>
        },
        {
          path: "/:hotelid/:merchantid/:itemid/customization",
          element: <Custpopup/>
        },
        {
          path: "/:hotelid/:merchantid/:itemid/clearcart",
          element: <Clearcartpopup/>
        }
      ]
    },
    {
      path: "/:hotelid/auth",
      element: <Loginpage/>,
      children: [
        {
          path: "/:hotelid/auth/login",
          element: <Phno/>
        },
        {
          path: "/:hotelid/auth/otp",
          element: <Enterotp/>
        }
      ]
    },



    {
      path: "*",
      element: 
      <div>
        <h1>Click On Home Button!</h1>
        <Link to="/H001"><button>Home</button></Link>
      </div>,
    },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} >
      <AliveScope>
      
        <RouterProvider router={Router}/>
        
      </AliveScope>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
);

//////////////////////////MenuPage//////////////////////////

// import ReactDOM from 'react-dom/client';
// import './index.css';
// import Menupage1 from './Menu Page/MenuPage1';
// import Menupageapi from './Menu Page/Menu_Page_API/MenuPageApi';


// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   // <React.StrictMode>
//   <>
//   <Menupage1/>
//   </>
//   // </React.StrictMode>,
// );
