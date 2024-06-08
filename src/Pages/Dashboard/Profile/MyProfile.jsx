import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";


const MyProfile = () => {

    const { user } = useAuth();
    const [users] = useUsers();
    console.log(users);
    // console.log(user);

    const userEmail = users.find( user => user.email === users.email);
    console.log(userEmail);

    return (
        <div>
            <SectionTitle
                heading={"My Profile"}
                subHeading={"User Profile"}
            ></SectionTitle>
            <h3 className="text-3xl text-center text-purple-700">
                <span>Hi! Welcome </span>
                {
                    user?.displayName ? user?.displayName : "Back"
                }
            </h3>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <img src={user.image} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;