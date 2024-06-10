

import img from "../../../assets/banD.jpg";



const Banner = () => {

    

   

    return (
        <div className="hero min-h-screen rounded-lg" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
            <div >
                
                <div className=" text-center mx-auto">
                   
                </div>
            </div>
        </div>
    );
};

export default Banner;