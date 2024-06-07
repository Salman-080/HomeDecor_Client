import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Provider/Provider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Login = () => {
    const{signIn, googleSignIn}=useContext(AuthContext);
    // const [,refetch]= useCurrentUser();
    const navigate=useNavigate();
    const axiosPublic=useAxiosPublic();
    const handleLogin=async(e)=>{
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const loginEmail = form.get('email');
        const loginPassword = form.get('password');

        signIn(loginEmail,loginPassword)
        .then(async(res)=>{
            console.log(res);
            toast.success('Successfully Login', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        //    await refetch();
            navigate("/");
        })
        .catch(err=>{
            console.log(err)
            toast.error(`${err}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        
        })


    }


    const handleGoogleLogIn=()=>{
        googleSignIn()
        .then(async(res)=>{
            console.log(res.user);
            
            const userInfo= {
                userName: res?.user?.displayName, 
                userEmail: res?.user?.email,           
                userImage: res?.user?.photoURL
            }

            const response= await axiosPublic.post("/usersCollection", userInfo);
            console.log(response.data);
            
            navigate("/");
        })
        .catch(err=>{
            console.log(err);
        })
    }


    return (
        <div className="flex flex-col justify-center items-center min-h-screen ">
        <div className="w-full md:w-[500px] flex flex-col justify-center items-center ">
            <div className="text-center lg:text-left">
                <br />
            </div>
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <h1 className="text-2xl md:text-4xl font-bold text-center mt-2">Login Now</h1>
                <form onSubmit={handleLogin} className="card-body">

                    <div className="form-control">

                        <label className="label">

                            <span className="label-text">Email</span>
                        </label>

                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <p>New User? <Link to="/register"><span className="text-blue-600">Register</span></Link></p>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>

                <div className="text-center mb-5 space-y-2">
                    <p className="text-gray-500">Or Sign in using</p>
                    <button onClick={handleGoogleLogIn} className="btn ">
                        <img className="w-[20px] h-[20px] rounded-full" src="/google.png" alt="" />
                        <p>Google</p>
                    </button>

                </div>
            </div>
        </div>

        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

    </div>
    );
};

export default Login;