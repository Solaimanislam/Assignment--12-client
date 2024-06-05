import { BsChatSquareQuoteFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook, FaHome } from "react-icons/fa";
import { FaRegNoteSticky, FaUserDoctor, FaUsers } from "react-icons/fa6";
import { FcStatistics } from "react-icons/fc";
import { GiHypodermicTest, GiKnightBanner, GiVerticalBanner } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-amber-600">
                <ul className="menu p-4 text-white text-xl">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/users"><FaUsers />All Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addTest"><FaRegNoteSticky />Add a Test</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allTest"><GiHypodermicTest /> All Tests</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation"><BsChatSquareQuoteFill />Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/banner"><GiKnightBanner />Add Banner</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allBanner"><GiVerticalBanner />All Banners</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/statistics"><FcStatistics />Statistics</NavLink>
                                </li>
                            </>
                            :
                            // user routes
                            <>
                                <li>
                                    <NavLink to="/dashboard/profile"><CgProfile /> My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking"><CgProfile /> My Booking</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/appointments"><FaAddressBook /> My Appointments</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/results"><FaUserDoctor /> Test Results</NavLink>
                                </li>
                            </>
                    }
                    <div className="divider">OR</div>
                    {/* shared nav link */}
                    <li>

                        <NavLink to='/'><FaHome></FaHome> Home </NavLink>
                    </li>
                    <li>

                        <NavLink to='/test'><GiHypodermicTest /> All Test </NavLink>
                    </li>
                    <li>

                        <NavLink to='/contact'><IoMdContact /> Contact </NavLink>
                    </li>
                </ul>

            </div>

            <div className=" flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;