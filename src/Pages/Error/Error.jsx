import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className=" text-center mx-auto lg:mt-20" data-aos="zoom-in-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000">
            <h2 className="text-5xl font-extrabold mb-8">404 Page Not Found</h2>
            <Link to='/'><button className="btn btn-warning">Back To Home</button></Link>
        </div>
    );
};

export default Error;