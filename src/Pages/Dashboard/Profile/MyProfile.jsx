import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";


const MyProfile = () => {

    const {user} = useAuth();

    return (
        <div>
            <SectionTitle 
            heading={"My Profile"}
            subHeading={"User Profile"}
            ></SectionTitle>
            <h3 className="text-3xl">
                <span>Hi Welcome</span>
                {
                    user?.displayName ? user?.displayName : "Back"
                }
            </h3>
        </div>
    );
};

export default MyProfile;