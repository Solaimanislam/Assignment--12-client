import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useBanner = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch, data: banner = [] } = useQuery({
        queryKey: ['banner'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banner');
            return res.data;
        }

    })
    return [banner, refetch]

};

export default useBanner;