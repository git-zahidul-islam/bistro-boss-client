import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionHeading from "../../../components/sectionHeading/SectionHeading";


const PaymentsHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: payments = []} = useQuery({
        queryKey: ['payment',user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })

    return (
        <div className="px-5">
            <SectionHeading heading={'Payments History'} subheading={"At a glance"}></SectionHeading>
            <div>
                <h1 className="text-2xl font-bold bg-gray-400">Total Payments: {payments.length}</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((item,index) => <tr key={item._id}>
                                    <th>{index +1}</th>
                                    <td>{item.email}</td>
                                    <td>{item.transactionId}</td>
                                    <td>{item.date}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td>
                                </tr>)
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsHistory;