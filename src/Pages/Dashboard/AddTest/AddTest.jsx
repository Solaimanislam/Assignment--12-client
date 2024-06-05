import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const AddTest = () => {
    return (
        <div>
            <Helmet>
                <title>SI | Add Test</title>
            </Helmet>
            <SectionTitle
            heading="add an test"
            subHeading="What's new?"
            ></SectionTitle>
        </div>
    );
};

export default AddTest;