import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useAdmin = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isAdmin, isPending: isLoadingAdmin } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`users/admin/${user?.email}`)
            console.log(data);
            return data?.admin
        }
    })
    return [isAdmin, isLoadingAdmin]
};

export default useAdmin;