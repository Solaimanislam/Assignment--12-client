import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useBanner from "../../../Hooks/useBanner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { MdFileDownloadDone } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";


const AllBanner = () => {

    const [banner, refetch] = useBanner();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    console.log(banner);
    const {_id, title, price, couponCode, status, discountRate, bannerText } = banner;

    const handleSave = test => {
        // console.log(test);
        if(user && user.email){
            // todo
            console.log(user.email, test);
            const cartItem = {
                cartId: _id,
                email: user.email,
                title,
                price,
                couponCode,
                status, 
                discountRate,
                bannerText

            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${banner.title} added to your database`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // refetch cart to update the cart items
                    refetch();
                }
            })

        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send to user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

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
                                        <button
                                            onClick={() => handleSave(item)}
                                            className="btn btn-ghost btn-lg bg-purple-600">
                                            <MdFileDownloadDone />
                                        </button>
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