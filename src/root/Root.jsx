import { Outlet, useLocation } from "react-router-dom";
import NavBer from "../home/shared/navBer/NavBer";
import Footer from "../home/shared/footer/Footer";

const Root = () => {
    const location = useLocation()
    const noHeadersFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div>
            {noHeadersFooter || <NavBer></NavBer>}
            <Outlet></Outlet>
            {noHeadersFooter || <Footer></Footer>}
        </div>
    );
};

export default Root;