import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useTest from "../../Hooks/useTest";
import TestCard from "./TestCard";


const AllTest = () => {

    const [test] = useTest();
    console.log(test);

    return (
        <div>
            <Helmet>
                <title>SI | All Test</title>
            </Helmet>
            <SectionTitle
                heading={"All Test"}
                subHeading={"Find Your Test"}
            ></SectionTitle>
            <div className=" grid md:grid-cols-2 gap-10">
                {
                    test?.map(item => <TestCard 
                        key={item._id}
                        item={item}
                    ></TestCard>)
                }
            </div>
        </div>
    );
};

export default AllTest;