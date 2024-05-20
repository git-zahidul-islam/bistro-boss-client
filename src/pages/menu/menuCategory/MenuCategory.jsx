import Cover from "../../../components/cover/Cover";
import MenuItem from "../../../components/menuItem/MenuItem";
import { Link } from 'react-router-dom'

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className="py-5">
            {title && <Cover img={coverImg} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-5 mt-10">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-secondary">Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;