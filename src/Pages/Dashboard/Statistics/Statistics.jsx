import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaDollarSign, FaUsers } from "react-icons/fa6";
import { GiHypodermicTest } from "react-icons/gi";
import { BsChatSquareQuoteFill } from "react-icons/bs";


const Statistics = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: states } = useQuery({
        queryKey: ['admin-states'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-states');
            return res.data;
        }
    });

    return (
        <div>
            <Helmet>
                <title>SI | Add Banner</title>
            </Helmet>
            <SectionTitle
                heading="Statistics"
                subHeading="Statistics here!"
            ></SectionTitle>
            <div>
                <h2 className="text-3xl text-center ">
                    <span>Hi, Welcome </span>
                    {
                        user?.displayName ? user?.displayName : "Back"
                    }
                </h2>
                <div className=" text-center mx-auto mt-6">
                    <div className="stats stats-vertical lg:stats-horizontal shadow">

                        <div className="stat bg-blue-500 text-white">
                            <div className="stat-figure text-secondary">
                                <FaDollarSign className="text-3xl text-white font-black mt-2"></FaDollarSign>
                            </div>
                            <div className="stat-title text-white">Revenue</div>
                            <div className="stat-value">${states?.revenue}</div>
                            <div className="stat-desc text-white">Jan 1st - Feb 1st</div>

                        </div>

                        <div className="stat bg-pink-400 text-white">
                            <div className="stat-figure text-secondary">
                                <FaUsers className="text-3xl text-white font-black mt-2"></FaUsers>

                            </div>
                            <div className="stat-title text-white">Users</div>
                            <div className="stat-value">{states?.users}</div>
                            <div className="stat-desc text-white">↗︎ 400 (22%)</div>
                        </div>

                        <div className="stat bg-cyan-400 text-white">
                            <div className="stat-figure text-secondary">

                                <GiHypodermicTest className="text-3xl text-white font-black mt-2" />
                            </div>
                            <div className="stat-title text-white">Test Item</div>
                            <div className="stat-value">{states?.testItems}</div>
                            <div className="stat-desc text-white">↘︎ 90 (14%)</div>
                        </div>

                        <div className="stat bg-purple-500 text-white">
                            <div className="stat-figure text-secondary">
                                <BsChatSquareQuoteFill className="text-3xl text-white font-black mt-2"/>
                                
                            </div>
                            <div className="stat-title text-white">Booked Item</div>
                            <div className="stat-value">{states?.bookedItems}</div>
                            <div className="stat-desc text-white">↘︎ 70 (34%)</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;