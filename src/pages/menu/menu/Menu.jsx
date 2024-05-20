import { Helmet } from "react-helmet-async";
import Cover from "../../../components/cover/Cover";
// image
import img from '../../../assets/menu/pizza-bg.jpg'
import desertImg from '../../../assets/menu/dessert-bg.jpeg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'


import useMenu from "../../../hooks/useMenu/useMenu";
import SectionHeading from "../../../components/sectionHeading/SectionHeading";
import MenuCategory from "../menuCategory/MenuCategory";


const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={img} title={"Our menu"}></Cover>
            {/* main cover */}
            <SectionHeading
                subheading={"Don't miss"}
                heading={"Today's Offer"}
            ></SectionHeading>
            {/* offered */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert */}
            <MenuCategory title={'dessert'} coverImg={desertImg} items={dessert}></MenuCategory>
            <MenuCategory title={'salad'} coverImg={saladImg} items={salad}></MenuCategory>
            <MenuCategory title={'pizza'} coverImg={pizzaImg} items={pizza}></MenuCategory>
            <MenuCategory title={'soup'} coverImg={soupImg} items={soup}></MenuCategory>
        </div>
    );
};


export default Menu;