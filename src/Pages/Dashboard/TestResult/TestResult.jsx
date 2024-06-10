import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useTestBooked from "../../../Hooks/useTestBooked";


const TestResult = () => {

    const [book]= useTestBooked();
    console.log(book);

    return (
        <div>
        <SectionTitle
            heading="Test Result"
            subHeading="Here is test result!"
        ></SectionTitle>
        <div>
            <div>
                
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Delete</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            book.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <td><button className="btn btn-ghost text-white btn-md bg-sky-800">{item.status}</button></td>
                                <td>
                                    <button
                                        
                                        className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-500"></FaTrashAlt></button>
                                </td>
                                
                            </tr>
                            )
                        }

                    </tbody>


                </table>
            </div>
        </div>
    </div>
    );
};

export default TestResult;