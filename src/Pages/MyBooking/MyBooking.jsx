import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useTestBooked from "../../Hooks/useTestBooked";

// import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const MyBooking = () => {

    const [booked] = useTestBooked();
    // const {user} = useAuth();
    console.log(booked);

    const axiosSecure = useAxiosSecure();

    const { data: payment = [], refetch } = useQuery({
        
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment');
            return res.data;

        }
    });
    console.log(payment);

    const handleCanceled = user => {
        // console.log('clicked');
        axiosSecure.patch(`/payment/cancel/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.title} is an canceled now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
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
                                <th>Test Name</th>
                                <th>Email</th>
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
                                        {item.title}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                    { item.status === 'pending' ?  <button
                                        onClick={() => handleCanceled(item)}
                                        className="btn btn-ghost btn-md bg-purple-400">{item.status}</button> : <button className="btn btn-ghost btn-md bg-red-400">Canceled</button>}
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