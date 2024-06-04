import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useTestBooked = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: book = [] } = useQuery({
        queryKey: ['book', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked?email=${user.email}`);
            return res.data;
        }

    })
    return [book, refetch]

};


export default useTestBooked;