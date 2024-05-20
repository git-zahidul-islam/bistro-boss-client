import { Helmet } from "react-helmet-async";
import Banner from "../banner/Banner";
import CategorySlide from "../categorySlide/CategorySlide";
import Featured from "../featured/Featured";
import PopularMenu from "../popularMenu/PopularMenu";
import SafeService from "../safeService/SafeService";
import Testimonials from "../testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <CategorySlide></CategorySlide>
            <SafeService></SafeService>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;