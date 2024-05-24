import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";


const User = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`${import.meta.env.VITE_API_COMMON}/users`)
            return data;
        }
    })

    const handleMakeAdmin = (user) => {
        // console.log(user);
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                refetch()
                if (res.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Good job!",
                        text: `the ${user?.email} is admin`,
                        icon: "success"
                    });
                }
            })
    }



    const handleDelete = (user) => {
        console.log(user._id);
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

                axiosSecure.delete(`/users/${user._id}`)
                    .then((result) => {
                        if (result.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                        console.log("delete successfully", result.data);
                    })
                    .catch(error => console.error(error))
            }
        });
    }

    return (
        <div className="flex flex-col py-10 px-5">
            <div className="flex justify-between bg-orange-200 p-1">
                <h1 className="text-4xl font-semibold">Total Users: {users.length}</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-lg font-bold">#</th>
                                <th className="text-lg font-bold">Name</th>
                                <th className="text-lg font-bold">email</th>
                                <th className="text-lg font-bold">Role</th>
                                <th className="text-lg font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <th>
                                        {user.role === "admin" ? "Admin" :
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="text-red-600"><FaUser size={28} />
                                            </button>
                                        }
                                    </th>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="text-red-600"><RiDeleteBin2Fill size={28} />
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    );
};

export default User;