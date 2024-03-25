import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation'
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store';
import './index.css';
import Homepage1 from './Home Page/HomePage1';
import Searchpage1 from './Search Page/SearchPage1';
import Profilepage1 from './Profile Page/ProfilePage1';
import Topcuisinespage1 from './Top Cuisines Page/TopCuisinesPage1';
import Menupage1 from './Menu Page/MenuPage1';
import Menusearchpage from './Menu Page/Menu_Search_Page/MenuSearchPage';
import Itempopup from './Menu Page/Item_Popup/ItemPopup';
import Loginpage from './Login Page/LoginPage';
import Phno from './Login Page/Enter_Ph_No/PhNo';
import Enterotp from './Login Page/Enter_Otp/EnterOTP';
import Custpopup from './Menu Page/Cust_Popup/CustPopup';
import Clearcartpopup from './Menu Page/Clear_Cart_Popup/ClearCartPopup';
import Custrepeatpopup from './Menu Page/Cust_Repeat_Popup/CustRepeatPopup';
import Cartpage1 from './Cart Page/CartPage1';
import Cartcustpopup from './Cart Page/Cart_Cust_Popup/CartCustPopup';
import Applycouponpage from './Cart Page/Apply_Coupon_Page/ApplyCouponPage';
import Addinstructionspage from './Cart Page/Add_Instructions_Page/AddInstructionsPage';

import { Link } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';




const Router = createBrowserRouter([
    {
      path: "/:hotelid",
      element: <Homepage1/>,
      errorElement: <div><h1>Wrong URL! Channa</h1></div>,
    },
    {
      path: "/:hotelid/search",
      element: <Searchpage1/>,
      children: [
        {
          path: "/:hotelid/search/:itemid",
          element: <Itempopup/>
        },
        {
          path: "/:hotelid/search/:itemid/customize",
          element: <Custrepeatpopup/>
        },
        {
          path: "/:hotelid/search/:itemid/customization",
          element: <Custpopup/>
        },
        {
          path: "/:hotelid/search/:itemid/clearcart",
          element: <Clearcartpopup/>
        }
      ]
    },
    {
      path: "/:hotelid/profile",
      element: <Profilepage1/>,
    },
    {
      path: "/:hotelid/cuisine/:cuisineid",
      element: <Topcuisinespage1/>,
    },
    {
      path: "/:hotelid/:merchantid",
      element: <Menupage1/>,
      children: [
        {
          path: "/:hotelid/:merchantid/search",
          element: <Menusearchpage/>,
          children: [
            {
              path: "/:hotelid/:merchantid/search/:itemid",
              element: <Itempopup/>
            },
            {
              path: "/:hotelid/:merchantid/search/:itemid/customize",
              element: <Custrepeatpopup/>
            },
            {
              path: "/:hotelid/:merchantid/search/:itemid/customization",
              element: <Custpopup/>
            },
            {
              path: "/:hotelid/:merchantid/search/:itemid/clearcart",
              element: <Clearcartpopup/>
            }
          ]
        },
        {
          path: "/:hotelid/:merchantid/:itemid",
          element: <Itempopup/>
        },
        {
          path: "/:hotelid/:merchantid/:itemid/customize",
          element: <Custrepeatpopup/>
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
      path: "/:hotelid/:merchantid/cart",
      element: <Cartpage1/>,
      children: [
        {
          path: "/:hotelid/:merchantid/cart/customization",
          element: <Cartcustpopup/>
        },
        {
          path: "/:hotelid/:merchantid/cart/coupons",
          element: <Applycouponpage/>
        },
        {
          path: "/:hotelid/:merchantid/cart/instructions",
          element: <Addinstructionspage/>
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
