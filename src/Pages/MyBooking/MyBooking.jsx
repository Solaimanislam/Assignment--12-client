import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useTestBooked from "../../Hooks/useTestBooked";

import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const MyBooking = () => {

    const [booked] = useTestBooked();
    const {user} = useAuth();
    console.log(booked);

    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;

        }
    });

    const handleCanceled = user => {
        axiosSecure.patch(`/users/cancel/${user._id}`)
            .then(res => {
                console.log(res.data);
                // if (res.data.modifiedCount > 0) {
                //     refetch();
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: `${user.name} is an blocked now!`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                // }
            })
    }

    return (
        <div>
            <Helmet>
                <title>SI | Reservation</title>
            </Helmet>
            <SectionTitle
                heading="Reservation"
                subHeading="Here is Users Booked"
            ></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                booked.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                    { user.status === 'canceled' ? 'canceled' : <button
                                        onClick={() => handleCanceled(user)}
                                        className="btn btn-ghost btn-md bg-purple-400">Cancel</button>}
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

export default MyBooking;