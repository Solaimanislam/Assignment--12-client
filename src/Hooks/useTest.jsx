// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTest = () => {

    const axiosPublic = useAxiosPublic();

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