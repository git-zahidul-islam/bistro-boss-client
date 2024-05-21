import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from 'sweetalert2'

const Cart = () => {
    const [cart, refetch] = useCart()
    const axiosSecure = useAxiosSecure()

    const price = cart.reduce((total, current) => {
        return total + current.price
    }, 0)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then((result) => {
                        if (result.data.deletedCount > 0){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                        console.log("delete successfully",result.data);
                    })
                    .catch(error => console.error(error))
            }
        });




    }

    return (
        <div className="flex flex-col py-10 px-5">
            <div className="flex justify-between bg-orange-200 p-1">
                <h1 className="text-3xl">Total items: {cart.length}</h1>
                <h1 className="text-3xl">Total Price: {price}</h1>
                <h1 className="text-3xl">Pay</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-lg font-bold">#</th>
                                <th className="text-lg font-bold">Photo</th>
                                <th className="text-lg font-bold">Items Name</th>
                                <th className="text-lg font-bold">Price</th>
                                <th className="text-lg font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                            {/* <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div> */}
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-600"><RiDeleteBin2Fill size={28} /></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>



                    </table>
                </div>
            </div>



        </div>
    );
};

export default Cart;