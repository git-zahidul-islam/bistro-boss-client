import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../root/Root";
import Home from "../home/home/Home";
import Menu from "../pages/menu/menu/Menu";
import Order from "../pages/order/order/Order";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Secret from "../pages/secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/dashboard/cart/Cart";
import User from "../pages/dashboard/user/User";
import AddItems from "../pages/dashboard/addItems/AddItems";
import ErrorPage from "../pages/error/ErrorPage";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/dashboard/manageItems/ManageItems";
import UpdateItems from "../pages/dashboard/updateItems/UpdateItems";
import Payments from "../pages/dashboard/payments/Payments";
import PaymentsHistory from "../pages/dashboard/paymentsHistory/PaymentsHistory";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user route
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'payments',
                element: <Payments></Payments>
            },
            {
                path: 'payment-history',
                element: <PaymentsHistory></PaymentsHistory>
            },
            
            // admin routes
            {
                path: 'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: 'manageItem',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: 'updateItems/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_COMMON}/menu/${params.id}`)
            },
            {
                path: 'users',
                element: <AdminRoute><User></User></AdminRoute>
            }

        ]
    }
]);