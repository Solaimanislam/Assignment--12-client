import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddBanner = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(res.data.success){
             // now send the banner item data to the server with the image 
             const bannerItem = {
                title: data.title,
                price: parseFloat(data.price),
                couponCode: data.couponCode,
                status: data.status,
                discountRate: data.discountRate,
                bannerText: data.bannerText,
                image: res.data.data.display_url
            }
            //
            const bannerRes = await axiosSecure.post('/banner', bannerItem);
            console.log(bannerRes.data);
            if (bannerRes.data.insertedId) {
                // show success pop up
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.title} is added to the Banner `,
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
                <title>SI | Add Banner</title>
            </Helmet>
            <SectionTitle
                heading="Banner"
                subHeading="Add New"
            ></SectionTitle>
            <div>
                <form className="lg:m-10 bg-blue-200 p-5 rounded-lg mt-4" onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-2">
                        <div className="label">
                            <span className="label-text text-lg font-medium text-orange-600 ">Test Title</span>

                        </div>
                        <input type="text" placeholder="Test Name" {...register("title", { require: true })} className="input input-bordered w-full " />

                    </label>
                    <div className="flex gap-6">
                        {/* couponCode */}
                        <label className="form-control w-full my-2">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-orange-600 ">Coupon Code</span>

                            </div>
                            <input type="text" placeholder="couponCode" {...register("couponCode", { require: true })} className="input input-bordered w-full " />

                        </label>

                        {/* discountRate */}
                        <label className="form-control w-full my-2">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-orange-600 ">Discount Rate</span>

                            </div>
                            <input type="number" placeholder="discountRate" {...register("discountRate", { require: true })} className="input input-bordered w-full " />

                        </label>

                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-2">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-orange-600 ">Status</span>

                            </div>
                            <select defaultValue="default" {...register("status", { require: true })}
                                className="select select-bordered w-full ">
                                <option disabled value="default">Select a status</option>
                                <option value="true">isActive</option>

                            </select>

                        </label>

                        {/* price */}
                        <label className="form-control w-full my-2">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-orange-600 ">Price</span>

                            </div>
                            <input type="number" placeholder="price" {...register("price", { require: true })} className="input input-bordered w-full " />

                        </label>

                    </div>
                    {/*  details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text text-lg font-medium text-orange-600 ">Text</span>

                        </div>
                        <textarea {...register('bannerText')} className="textarea textarea-bordered h-24" placeholder="write something..."></textarea>

                    </label>

                    {/* file input */}

                    <div className="form-control w-full my-2">
                        <input type="file" {...register('image', { require: true })} className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn bg-purple-700 text-white">
                        Add Items
                    </button>
                </form>
            </div>

        </div>
    );
};

export default AddBanner;