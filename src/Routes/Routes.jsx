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

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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
        }

      ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: 'profile',
                element: <MyProfile></MyProfile>
            }
        ]
    }
  ]);