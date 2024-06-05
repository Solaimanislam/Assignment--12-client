import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {

    const { register, handleSubmit } = useForm()

    const {_id, title, price, slots, date, short_description} = useLoaderData();
    // console.log(item);
    // const {_id} = item;

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
            // now send the menu item data to the server with the image 
            const testItem = {
                title: data.title,
                price: parseFloat(data.price),
                date: data.date,
                slots: data.slots,
                short_description: data.short_description,
                image: res.data.data.display_url
            }
            // 
            const testRes = await axiosSecure.patch(`/test/${_id}`, testItem);
            console.log(testRes.data);
            if (testRes.data.modifiedCount > 0) {
                // show success pop up
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} is updated to the menu `,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);

    }

    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Update Info"></SectionTitle>

            <div>
                <form className="lg:ml-12 mb-6" onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Test Name</span>

                        </div>
                        <input type="text" defaultValue={title} placeholder="Test Name" {...register("title", { require: true })} className="input input-bordered w-full " />

                    </label>
                    <div className="flex gap-6">


                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price</span>

                            </div>
                            <input type="number" defaultValue={price} placeholder="price" {...register("price", { require: true })} className="input input-bordered w-full " />

                        </label>

                        {/* date */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Date</span>

                            </div>
                            <input type="date" defaultValue={date} placeholder="" {...register("date", { require: true })} className="input input-bordered w-full " />

                        </label>

                    </div>
                    {/* slots */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Slots</span>

                        </div>
                        <input type="slots" defaultValue={slots} placeholder="Slots" {...register("slots", { require: true })} className="input input-bordered w-full " />

                    </label>
                    {/* Test details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Test Details</span>

                        </div>
                        <textarea {...register('short_description')} defaultValue={short_description} className="textarea textarea-bordered h-24" placeholder="Test Details"></textarea>

                    </label>

                    {/* file input */}

                    <div className="form-control w-full my-6">
                        <input type="file" {...register('image', { require: true })} className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Update An Test 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;