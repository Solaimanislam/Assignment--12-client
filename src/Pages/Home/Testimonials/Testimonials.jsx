import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import {  useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const Testimonials = () => {

    const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();


    axiosPublic.get('reviews')
    .then(res => {
        // console.log(res.data);
        setReviews(res.data)
    })



    // // useEffect(() => {
    // //     fetch('reviews')
    // //         .then(res => res.json())
    // //         .then(data => {
    // //             console.log(data);
    // //             setReviews(data)
    // //         })
    // // }, [])
    // console.log(reviews);

    return (
        <section>
            <SectionTitle
                subHeading="What Our Client Says"
                heading="Testimonials"
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className=" flex flex-col items-center my-16 mx-24">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className=" py-8">{review.details}</p>
                            <h3 className="text-3xl text-orange-400">{review.name} </h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;