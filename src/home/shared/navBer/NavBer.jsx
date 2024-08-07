import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { BsFillCartPlusFill } from "react-icons/bs";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBer = () => {
    const { logout, user } = useContext(AuthContext)
    const [cart] = useCart()
    const [isAdmin] = useAdmin()

    const handleLogout = () => {
        logout()
            .then(() => console.log("successfully logout"))
            .catch(error => console.error(error))
    }

    const navLink = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/menu'}>Our Menu</Link></li>
        <li><Link to={'/order/salad'}>Order Food</Link></li>
        {
            user && isAdmin && <li><Link to={'/dashboard/adminHome'}>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to={'/dashboard/userHome'}>Dashboard</Link></li>
        }
        <li><Link to="/dashboard/cart">
            <button className="flex items-center gap-2">
                <BsFillCartPlusFill size={20} />
                <div className="badge badge-secondary">+{cart.length}</div>
            </button>
        </Link></li>
        {
            user ?
                <li><button onClick={handleLogout}>LogOut</button></li>
                :
                <li><Link to={'/login'}>Login</Link></li>

        }
    </>

    return (
        <div className="navbar fixed z-10 bg-black bg-opacity-20 text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <Link to={'/'} className="text-2xl font-bold">Bistro Boss</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default NavBer;