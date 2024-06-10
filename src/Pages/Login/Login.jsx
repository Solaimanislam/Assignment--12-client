import { Helmet } from 'react-helmet-async';
import logImg from '../../assets/login.jpg';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import useAdmin from '../../Hooks/useAdmin';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import axios from 'axios';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    // const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [isAdmin] = useAdmin();


    // const from = location.state?.from?.pathname || "/dashboard/profile";
    // const fromAdmin = location.state?.from?.pathname || "/dashboard/users";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successfully",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                // console.log(isAdmin);
                axiosPublic.post('/jwt')
                    .then(res => {
                        console.log(res.data);
                        localStorage.setItem('access-token', res.data.token)

                        axiosSecure.get(`/users/admin/${user.email}`, {headers: {Authorization: `Bearer ${res.data.token}`}})
                            .then(res => {
                                navigate('/dashboard/users')
                                console.log(res.data);
                                
                            })
                            .catch(() => {
                                navigate('/dashboard/profile')
                            })
                    })

                console.log(isAdmin);

                // console.log(res.data);
                // return res.data?.admin;

            })
    }


    return (
        <div>
            <Helmet>
                <title>SI | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold mb-8">Login now!</h1>
                        <img src={logImg} alt="" />
                    </div>
                    <div className="card w-1/2 shrink-0 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
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

                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className=' px-6 text-blue-600 text-xl'><small> New here? <Link to='/signup'> <span className='text-orange-600'>Create an account</span></Link> </small> </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;