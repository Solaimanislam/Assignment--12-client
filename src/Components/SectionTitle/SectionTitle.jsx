

const SectionTitle = ({ heading, subHeading}) => {
    return (
        <div className="md:w-3/12 mx-auto text-center my-8">
            <p className="text-orange-400 mb-2">- {subHeading} -</p>
            <p className=" text-3xl uppercase text-teal-500 border-y-4 py-4">{heading} </p>
        </div>
    );
};

export default SectionTitle;