import SectionHeading from "../../components/sectionHeading/SectionHeading";
import MenuItem from "../../components/menuItem/MenuItem";
import useMenu from "../../hooks/useMenu/useMenu";



const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')


    // const [menu,setMenu] = useState([])
    // useEffect(()=>{
    //     fetch('./menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popular = data.filter(item => item.category === 'popular')
    //         // console.log(popular);
    //         setMenu(popular)
    //     })
    // },[])

    // console.log(menu);

    return (
        <section className="mb-10">
            <SectionHeading
            heading={"From Our Menu"}
            subheading={"Popular Items"}
            ></SectionHeading>
            <div className="grid md:grid-cols-2 gap-5">
                {
                    popular.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;