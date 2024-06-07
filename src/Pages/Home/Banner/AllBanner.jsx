import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useBanner from "../../../Hooks/useBanner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MdFileDownloadDone } from "react-icons/md";


const AllBanner = () => {

    const [banner, refetch] = useBanner();
    const axiosSecure = useAxiosSecure();
    // console.log(banner);

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/banner/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.title} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        });
    }

    return (
        <div>
            <SectionTitle
                heading="All Banners"
                subHeading="Here is Banner!"
            ></SectionTitle>
            <div>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                banner.map((item, index) => <tr key={item._id}>
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
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-500"></FaTrashAlt></button>
                                    </td>
                                    <td>
                                        <Link to={`/${item._id}`}>
                                            <button
                                                className="btn btn-ghost btn-lg bg-purple-600">
                                                <MdFileDownloadDone  />
                                            </button>
                                        </Link>
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

export default AllBanner;