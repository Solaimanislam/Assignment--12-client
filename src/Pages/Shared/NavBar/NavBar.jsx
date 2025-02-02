import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import useUsers from "../../../Hooks/useUsers";
// import useTestBooked from "../../../Hooks/useTestBooked";


const NavBar = () => {


    const { user, logOut } = useContext(AuthContext);
    // const [booked] = useTestBooked();
    const [isAdmin] = useAdmin();
    const [users] = useUsers();

    const userEmail = users.find( item => item?.email === user?.email);
    console.log(userEmail);


    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error))
    }

    const navOptions =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/test'>All Test</Link></li>
            {
                user && isAdmin &&  <li><Link to='/dashboard/users'>Dashboard</Link></li>
            }
            {
                user && !isAdmin &&  <li><Link to='/dashboard/profile'>Dashboard</Link></li>
            }
            {/* <li><Link to='/dashboard/booking'>
                <button className="">
                    Booking
                    <div className="badge bg-pink-500">+{booked.length}</div>
                </button>
            </Link></li> */}

        </>


    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl text-orange-400"><span className="text-green-500 font-semibold">SI</span> Diagnostic</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={userEmail?.image} />
                        </div>
                    </div>
                    {
                        user ?
                            <>
                                {/* <li><span>{user?.displayName}</span></li> */}
                                <button onClick={handleLogout} className="btn btn-active btn-ghost">LogOut</button>
                            </>
                            :
                            <> <button className="btn btn-active btn-ghost"><Link to='/login'>Login</Link></button> </>
                    }
                </div>
            </div>
        </>
    );
};

export default NavBar;