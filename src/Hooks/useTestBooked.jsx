import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useTestBooked = () => {

    const axiosSecure = useAxiosSecure();

    const { data: booked = [] } = useQuery({
        queryKey: ['booked'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booked');
            return res.data;
        }

    })
    return [booked]

};


export default useTestBooked;