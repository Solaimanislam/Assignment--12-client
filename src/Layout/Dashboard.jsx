import { CgProfile } from "react-icons/cg";
import { FaAddressBook, FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-purple-700">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/profile"><CgProfile /> My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/appointments"><FaAddressBook /> My Appointments</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/results"><FaUserDoctor /> Test results</NavLink>
                    </li>
                    <div className="divider">OR</div>
                    <li>

                        <NavLink to='/'><FaHome></FaHome> Home </NavLink>
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