import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/featuredimg.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-10 my-20">
            <SectionTitle 
            subHeading="Check it Out"
            heading="Featured Item"
            ></SectionTitle>
            <div className=" md:flex justify-center bg-slate-500 bg-opacity-60 items-center py-20 px-36">
                <div>
                    <img className="lg:w-[800px]" src={featuredImg} alt="" />
                </div>
                <div className=" md:ml-10">
                    <p>May 20, 2029</p>
                    <p className=" uppercase">Where can i get some</p>
                    <p>SI Diagnostic Center is dedicated to providing state-of-the-art diagnostic services. Our mission is to deliver accurate and timely results to aid in the early detection and treatment of diseases.</p>
                    <button className="btn btn-outline bg-pink-500 border-0 border-b-4 mt-4">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;