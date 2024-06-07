
import { useForm } from "react-hook-form";
import img from "../../../assets/banD.jpg";
import { Link } from "react-router-dom";


const Banner = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="hero min-h-screen rounded-lg" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
            <div >
                
                <div className=" text-center mx-auto">
                    <form className=" bg-blue-200 p-5 rounded-lg mt-4" onSubmit={handleSubmit(onSubmit)}>

                        <label className="form-control w-full my-2">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-orange-600 ">Test Title</span>

                            </div>
                            <input type="text" placeholder="Test Name" {...register("name", { require: true })} className="input input-bordered w-full " />

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
                                    <option value="active">isActive</option>

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
                        {/* recipe details */}
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-orange-600 ">Text</span>

                            </div>
                            <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                        </label>

                        {/* file input */}

                        <div className="form-control w-full my-2">
                            <input type="file" {...register('image', { require: true })} className="file-input w-full max-w-xs" />
                        </div>

                        <button className="btn bg-purple-700 text-white">
                            Add Items
                        </button>
                        <Link to="/test">
                            <button className="btn bg-secondary text-white ml-6">
                                All Test
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;