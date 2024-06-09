import { Link } from "react-router-dom";


const TestCard = ({ item }) => {
    // console.log(item);

    const { _id, image, title, short_description, duration, date, slots } = item;

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img className="lg:h-[400px] w-full" src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <div className=" flex justify-between">
                    <h2 className="card-title text-purple-500">Title: {title}</h2>
                    <h2 className="card-title text-orange-400">Date: {date}</h2>
                </div>
                <p className="text-green-400 text-lg">Description: {short_description}</p>
                <div className=" flex justify-between">
                    <h4 className=" text-xl text-amber-600">Slots: {slots} </h4>
                    <h4 className=" text-xl text-red-600">Slots: {duration} </h4>
                </div>


                <div className="card-actions justify-end">
                    <Link to={`/details/${_id}`}><button className="btn btn-primary">Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default TestCard;