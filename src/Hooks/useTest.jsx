// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTest = () => {

    const axiosPublic = useAxiosPublic();

    // const [test, setTest] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('http://localhost:5000/test')
    //         .then(res => res.json())
    //         .then(data => {
    //             setTest(data);
    //             setLoading(false);
    //         })
    // }, [])

    const {data: test = [], isPending: loading, refetch } = useQuery({
        queryKey: ['test'],
        queryFn: async() => {
            const res = await axiosPublic.get('/test');
            return res.data;
        }
    });



    return [test, loading, refetch];

};

export default useTest;