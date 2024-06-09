import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";



const Home = () => {

   



    return (
        <div>
            <Helmet>
                <title>SI | Home</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;