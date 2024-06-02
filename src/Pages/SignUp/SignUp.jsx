import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import regImg from "../../assets/regi.jpg";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";


const SignUp = () => {

    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                console.log('user profile photo updated');
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(error => console.log(error))
        })
    }


    return (
        <div>
            <Helmet>
                <title>SI | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold mb-8">Sign Up now!</h1>
                        <img src={regImg} alt="" />
                    </div>
                    <div className="card w-1/2 shrink-0  shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">PhotoURL is required</span>}
                            </div>
                            {/* blood group , district, upazila */}
                            <div className="flex gap-2">
                                {/* blood group */}
                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Blood Group</span>

                                    </div>
                                    <select defaultValue="default" {...register("blood", { require: true })}
                                        className="select select-bordered w-full ">
                                        <option disabled value="default">Select a Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>

                                    </select>

                                </label>

                                {/* District */}
                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">District</span>

                                    </div>
                                    <select defaultValue="default" {...register("District", { require: true })}
                                        className="select select-bordered w-full ">
                                        <option disabled value="default">Select a District</option>
                                        <option value="dhaka">Dhaka</option>
                                        <option value="chittagong">Chittagong</option>
                                        <option value="gazipur">Gazipur</option>
                                        <option value="bandarban">Bandarban</option>
                                        <option value="comilla">Comilla</option>

                                    </select>

                                </label>
                                {/* Upazila */}
                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Upazila</span>

                                    </div>
                                    <select defaultValue="default" {...register("upazila", { require: true })}
                                        className="select select-bordered w-full ">
                                        <option disabled value="default">Select a Upazila</option>
                                        <option value="satkania">Satkania</option>
                                        <option value="lohagara">Lohagara</option>
                                        <option value="patiya">Patiya</option>
                                        <option value="chakoria">Chakoria</option>
                                        <option value="sandwip">Sandwip</option>

                                    </select>

                                </label>

                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                                    name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required </p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password must be 6 characters </p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password must be less than 20 characters </p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">Password must have one uppercase , one lower case, one number and one special character</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />

                            </div>
                        </form>
                        <p className=' px-6 text-blue-600 text-xl'><small> Already have an account? <Link to='/login'> <span className='text-orange-600'>Sign in please</span></Link> </small> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;