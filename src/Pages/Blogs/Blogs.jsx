import useTest from "../../Hooks/useTest";
import Blog from "./Blog";


const Blogs = () => {

    const [test] = useTest();
    console.log(test);

    return (
        <div>

            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/Qvm9VrX/t7.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>    
                <div className="text-center  text-neutral-content">
                    <div className=" p-2">
                        <h1 className="mb-5 text-3xl lg:text-5xl text-amber-600 font-bold ">Welcome to my Blog Page</h1>
                        <p className="mb-5 text-xl text-blue-200  ">SI Diagnostic center is blog provides detailed information on various diagnostic tests and health checkups. Topics include the role of pathology labs, the importance of echo cardiography and ECG tests, and the benefits of ultrasounds in medical diagnostics. They also offer insights into specific health conditions and the necessary diagnostic procedures to manage them effectively.</p>

                    </div>
                </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 my-7 lg:my-10 p-2" >
                {
                    test.map(blog => <Blog
                        key={blog._id}
                        blogs={blog}
                    ></Blog>)
                }
            </div>
            
        </div>
    );
};

export default Blogs;