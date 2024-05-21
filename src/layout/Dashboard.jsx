import { NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaBook, FaCalendarAlt, FaReceipt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 bg-orange-400 min-h-screen py-10">
                <ul>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/dashboard/user-home'}>
                            <IoHome />User Home
                        </NavLink>
                    </li>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/dashboard/reservation'}>
                            <FaCalendarAlt />Reservation
                        </NavLink>
                    </li>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/dashboard/cart'}>
                            <FaShoppingCart />My Cart
                        </NavLink>
                    </li>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/dashboard/review'}>
                            <FaReceipt/> Review
                        </NavLink>
                    </li>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/dashboard/my-booking'}>
                            <FaBook/>My Booking
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;