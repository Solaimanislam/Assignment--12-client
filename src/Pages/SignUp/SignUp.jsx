import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import regImg from "../../assets/regi.jpg";


const SignUp = () => {
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
                    <div className="card w-1/2 shrink-0 max-w-sm shadow-2xl bg-base-100">
                        <form  className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Register" />
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