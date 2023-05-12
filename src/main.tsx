import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation'
import { Provider } from 'react-redux';
import store from './Redux/store';
import './index.css';
import Homepage from './Home Page/HomePage.js';
import Profile from './Profile/Profile.js';


const Router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage/>,
      errorElement: <div><h1>Wrong URL! Channa</h1></div>,
    },
    {
      path: "profile",
      element: <Profile/>,
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
