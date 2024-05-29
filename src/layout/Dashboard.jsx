import { NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaBook, FaCalendarAlt, FaContao, FaHamburger, FaList, FaPaypal, FaReceipt, FaUser, FaUserMinus, FaUtensils } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart()

    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className="w-64 bg-orange-400 min-h-screen py-10">
                {
                    isAdmin ?
                        <>
                            <ul>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/adminHome'}>
                                        <IoHome />Admin Home
                                    </NavLink>
                                </li>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/addItems'}>
                                        <FaUtensils />Add Items
                                    </NavLink>
                                </li>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/manageItem'}>
                                        <FaList />Management Item
                                    </NavLink>
                                </li>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/manageBooking'}>
                                        <FaBook /> Manage Booking
                                    </NavLink>
                                </li>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/users'}>
                                        <FaUser />All User
                                    </NavLink>
                                </li>
                            </ul>
                        </>
                        :
                        <>
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
                                        to={'/dashboard/payment-history'}>
                                        <FaPaypal /> Payment History
                                    </NavLink>
                                </li>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/cart'}>
                                        <FaShoppingCart />My Cart ({cart.length})
                                    </NavLink>
                                </li>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/review'}>
                                        <FaReceipt />Add Review
                                    </NavLink>
                                </li>
                                <li className="p-1">
                                    <NavLink
                                        className='flex items-center gap-2 text-xl ml-5'
                                        to={'/dashboard/payment-history'}>
                                        <FaBook />Payment History
                                    </NavLink>
                                </li>
                            </ul>
                        </>
                }
                <div className="divider divider-neutral px-3"></div>
                {/* share navlink */}
                <ul>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/'}>
                            <FaHamburger /> Home
                        </NavLink>
                    </li>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/menu'}>
                            <FaUserMinus /> Menu
                        </NavLink>
                    </li>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/shopping'}>
                            <FaShoppingCart /> shop
                        </NavLink>
                    </li>
                    <li className="p-1">
                        <NavLink
                            className='flex items-center gap-2 text-xl ml-5'
                            to={'/contact'}>
                            <FaContao /> contact
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