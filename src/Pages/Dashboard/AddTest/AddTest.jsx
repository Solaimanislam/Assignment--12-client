import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { GiHypodermicTest } from "react-icons/gi";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddTest = () => {

    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the test item data to the server with the image 
            const testItem = {
                title: data.title,
                price: parseFloat(data.price),
                date: data.date,
                slots: data.slots,
                
                short_description: data.short_description,
                image: res.data.data.display_url
            }
            // 
            const testRes = await axiosSecure.post('/test', testItem);
            console.log(testRes.data);
            if (testRes.data.insertedId) {
                // show success pop up
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} is added to the test `,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            
        }
        console.log('with image url', res.data);
    }


    return (
        <div>
            <Helmet>
                <title>SI | Add Test</title>
            </Helmet>
            <SectionTitle
                heading="add an test"
                subHeading="What's new?"
            ></SectionTitle>
            <div>
                <form className="lg:ml-12 mb-6" onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Test Name</span>

                        </div>
                        <input type="text" placeholder="Test Name" {...register("title", { require: true })} className="input input-bordered w-full " />

                    </label>
                    <div className="flex gap-6">


                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price</span>

                            </div>
                            <input type="number" placeholder="price" {...register("price", { require: true })} className="input input-bordered w-full " />

                        </label>

                        {/* date */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Date</span>

                            </div>
                            <input type="date" placeholder="" {...register("date", { require: true })} className="input input-bordered w-full " />

                        </label>

                    </div>
                    {/* slots */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Slots</span>

                        </div>
                        <input type="slots" placeholder="Slots" {...register("slots", { require: true })} className="input input-bordered w-full " />

                    </label>
                    {/* Test details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Test Details</span>

                        </div>
                        <textarea {...register('short_description')} className="textarea textarea-bordered h-24" placeholder="Test Details"></textarea>

                    </label>

                    {/* file input */}

                    <div className="form-control w-full my-6">
                        <input type="file" {...register('image', { require: true })} className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Add Test <GiHypodermicTest className="ml-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTest;