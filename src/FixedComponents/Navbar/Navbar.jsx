import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Pages/Provider/Provider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import useCurrentUser from "../../Hooks/useCurrentUser";

const Navbar = () => {


    const { userInfo, logOut, user, setUserInfo, googleSignIn } = useContext(AuthContext);
    console.log(userInfo);
    const navigate = useNavigate();
    console.log(user);
    const axiosPublic = useAxiosPublic();

    const handleLogOut = () => {
        logOut()
            .then(res => {
                setUserInfo({});
            })
            .catch(err => {

            })
    }

    const handleLogin = () => {
        navigate("/login");
    }
    const handleRegister = () => {
        navigate("/register");
    }
    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(async (res) => {
                console.log(res.user);

                const userInfo = {
                    userName: res?.user?.displayName,
                    userEmail: res?.user?.email,
                    userImage: res?.user?.photoURL
                }

                const response = await axiosPublic.post("/usersCollection", userInfo);
                console.log(response.data);

                navigate("/");
            })
            .catch(err => {
                console.log(err);
            })
    }
    // const [loggedUserInfo]=useCurrentUser();
    // console.log(loggedUserInfo);

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/myCart">MyCart</NavLink></li>


        {
            !user && <li><NavLink to="/login">Login</NavLink></li>
        }
        {
            !user && <li><NavLink to="/register">Register</NavLink></li>
        }


    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">HomeDecor</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-4">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">

                    <div className="flex items-center gap-4">
                        {/* <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{userInfo?.email}</p>
                                </DropdownItem>
                                <DropdownItem key="settings">
                                    My Settings
                                </DropdownItem>
                                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                <DropdownItem key="analytics">
                                    Analytics
                                </DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">
                                    Help & Feedback
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown> */}

                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        isBordered: true,
                                        src: userInfo?.userImage || user?.photoURL,
                                    }}
                                    className="transition-transform"
                                    description={userInfo?.userEmail || user?.email}
                                    name={userInfo?.userName || user?.displayName}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                                {
                                    user && <DropdownItem key="profile" className="h-14 gap-2">

                                        <p className="font-bold">Signed in as</p>


                                        <p className="font-bold">{userInfo?.userEmail}</p>



                                    </DropdownItem>
                                }
                                {
                                    !user && <DropdownItem onClick={handleRegister} key="register">
                                        Register
                                    </DropdownItem>
                                }



                                {
                                    user ? <DropdownItem onClick={handleLogOut} key="logout" color="danger">
                                        Log Out
                                    </DropdownItem> :

                                        <DropdownItem onClick={handleLogin} key="login" color="danger">

                                            Login
                                        </DropdownItem>


                                }
                                {
                                    !user && <DropdownItem onClick={handleGoogleLogIn} key="GoogleSignIn" color="danger" className=" bg-slate-100 mt-4 ">

                                        <div className="flex justify-center items-center gap-2"><img className="w-[16px] h-[16px] rounded-full " src="/google.png" alt="" /><h2 className="mb-[2px]">Google SignIn</h2></div>




                                    </DropdownItem>
                                }



                            </DropdownMenu>


                        </Dropdown>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Navbar;