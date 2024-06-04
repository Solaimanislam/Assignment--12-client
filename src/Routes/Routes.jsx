import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import AllTest from "../Pages/AllTest/AllTest";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/Profile/MyProfile";
import Details from "../Pages/Details/Details";
import Error from "../Pages/Error/Error";
import MyBooking from "../Pages/MyBooking/MyBooking";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'test',
        element: <PrivateRoutes><AllTest></AllTest></PrivateRoutes>
      },
      {
        path: 'details/:_id',
        element: <PrivateRoutes><Details></Details></PrivateRoutes>,
        loader: () => fetch('http://localhost:5000/test')
      }

    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      // admin routes
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      },

      // user routes
      {
        path: 'profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'booking',
        element: <MyBooking></MyBooking>
      }
    ]
  }
]);