
import { Helmet } from "react-helmet-async";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTestBooked from "../../Hooks/useTestBooked";



const Details = () => {
    const cards = useLoaderData();

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [ , refetch] = useTestBooked();
    const axiosSecure = useAxiosSecure();
    // console.log(cards);
    const { _id, } = useParams();
    // const idInt = parseInt(id);
    const card = cards.find(card => card._id === _id);
    const { title, image, price } = card;
    // console.log(card);

    const handleBooking = () => {
        if (user && user.email) {
            // user set to the database
            // console.log(user.email, test);
            const bookedItem = {
                testId: _id,
                email: user.email,
                title,
                image,
                price
            }
            axiosSecure.post('/booked', bookedItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${title} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the Booked",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send to user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <>
            <Helmet>
                <title>SI | Details</title>
            </Helmet>
            <SectionTitle
                heading={"Test Details"}
                subHeading={"Details Here"}
            ></SectionTitle>
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img className="lg:h-[400px] w-full" src={card.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className=" flex justify-between">
                        <h2 className="card-title text-purple-500">Title: {card.title}</h2>
                        <h2 className="card-title text-orange-400">Date: {card.date}</h2>
                    </div>
                    <p className="text-green-700 text-lg">Description: {card.short_description}</p>
                    <h4 className=" text-xl text-amber-600 items-center mx-auto">Slots:
                        {
                            card.slots?.map(slot => <li key={slot.id}>{slot}</li>)
                        }
                    </h4>
                    <div className=" flex justify-between">
                        <h2 className="card-title text-violet-800">Duration: {card.duration}</h2>
                        <h2 className="card-title text-amber-500">Price: ${card.price}</h2>
                    </div>
                    <div className=" flex justify-between">
                        <h2 className="card-title text-green-500">Location: {card.location}</h2>
                        <h2 className="card-title text-red-500">Requirements: {card.requirements}</h2>
                    </div>
                    <div className="card-actions justify-center">
                        <button
                            onClick={ handleBooking}
                            className="btn btn-outline bg-slate-100 border-orange-400 border-0 border-b-4 mt-4">Book Now</button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Details;