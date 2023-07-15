import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation'
import { Provider } from 'react-redux';
import store from './Redux/store';
import './index.css';
import Homepage from './Home Page/HomePage.js';
import Profile from './Profile/Profile.js';
import Menupage1 from './Menu Page/MenuPage1';
import Itempopup from './Menu Page/Item_Popup/ItemPopup';


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
      children: [{
        path: "/:hotelid/:merchantid/:itemid",
        element: <Itempopup/>
      }]
    }
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AliveScope>
    
      <RouterProvider router={Router}/>
      
    </AliveScope>
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
