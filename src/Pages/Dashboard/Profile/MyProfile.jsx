import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";


const MyProfile = () => {

    const { user } = useAuth();
    const [users] = useUsers();
    console.log(users);
    // console.log(user);

    const userEmail = users.find(item => item.email === user.email);
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
                    <img src={userEmail?.image} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <div className="flex justify-evenly gap-8">
                            <h2 className="text-xl font-semibold text-purple-600">Name: {userEmail?.name}</h2>
                            <h2 className="text-xl font-semibold text-orange-600">Email: {userEmail?.email}</h2>
                        </div>
                        <div className="flex justify-evenly gap-8">
                            <h2 className="text-xl font-semibold text-red-500">Blood: {userEmail?.blood}</h2>
                            <h2 className="text-xl font-semibold text-sky-500">Status: {userEmail?.Status}</h2>
                        </div>
                        <div className="flex justify-evenly gap-8">
                            <h2 className="text-xl font-semibold text-green-400">
                                District: {userEmail?.District}</h2>
                            <h2 className="text-xl font-semibold text-amber-600">Upazila: {userEmail?.upazila}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;