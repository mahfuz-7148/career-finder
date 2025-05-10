import {createBrowserRouter} from "react-router";
import RootLayout from "../Layout/RootLayout.jsx";
import Home from "../Pages/Home.jsx";
import Error from "../Components/Error.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import DetailsLayout from "../Layout/DetailsLayout.jsx";
import CompanyDetails from "../Components/CompanyDetails.jsx";
import AuthLayout from "../Layout/AuthLayout.jsx";
import ForgetPass from "../Pages/ForgotPass.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import UserProfile from "../Pages/UserProfile.jsx";



const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            }

        ]
    },
    {
        path: '/companydetails',
        Component: DetailsLayout,
        children: [
            {
                path: '/companydetails/:id',
                element: <PrivateRoute>
                    <CompanyDetails/>
                </PrivateRoute>,
                loader: () => fetch('/companydata.json')
            },
            {
                path: '/companydetails/userprofile',
                element: <PrivateRoute>
                    <UserProfile />
                </PrivateRoute>
            }
        ]
    },
    {
      path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: '/auth/login',
                Component: Login
            },
            {
                path: '/auth/register',
                Component: Register
            },
            {
                path: '/auth/forget-password',
                Component: ForgetPass
            }
        ]
    },
    {
        path: '/*',
        Component: Error
    }
])

export default router