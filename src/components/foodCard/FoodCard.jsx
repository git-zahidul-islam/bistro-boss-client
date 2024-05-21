import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ items }) => {
    const { name, price, image, recipe, _id } = items;
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()


    const handleCart = () => {
        if (user && user?.email) {
            // to carted items
            const cartItem = {
                menuId: _id,
                email: user?.email,
                name,
                price,
                image,
            }
            axiosSecure.post('/carts', cartItem)
                .then(result => {
                    console.log(result.data);
                    if (result.data.insertedId) {
                        Swal.fire({
                            title: "Good job!",
                            text: "Cart Successfully added!",
                            icon: "success"
                        });
                        refetch()
                    }
                })
                .catch(error => console.error(error))
        }

        else {
            Swal.fire({
                title: "Are you buy?",
                text: "Buy items please login!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleCart} className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;