import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Provider/Provider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Register = () => {

    const { createUser, profileInfo, logOut, googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate=useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        
        const form = new FormData(e.currentTarget);

        const imageFile = {
            image: e.target.image.files[0],

        }

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });

        if (res.data.success) {
            const registerName = form.get('name');
            const registerEmail = form.get('email');
            const registerPassword = form.get('password');
            const registerImage = res.data.data.display_url;



            createUser(registerEmail, registerPassword)
                .then(res => {
                    console.log(res.user)


                    profileInfo(registerName, registerImage)
                    .then(async(res)=>{
                        const userInfo= {
                            userEmail: registerEmail,
                            userName: registerName,
                            userImage: registerImage,

                        }

                        const result= await axiosPublic.post("/usersCollection", userInfo);
                        if(result?.data?.insertedId){
                            logOut()
                            .then(res=>{
                                navigate("/login");
                            })
                            .catch(err=>{

                            })
                            
                            // toast.success('Successfully Registered!', {
                            //     position: "top-center",
                            //     autoClose: 5000,
                            //     hideProgressBar: false,
                            //     closeOnClick: true,
                            //     pauseOnHover: true,
                            //     draggable: true,
                            //     progress: undefined,
                            //     theme: "light",
                            // });
                        }

                    })
                    .catch(error=>{
                        console.log(error);
                    })
                   
                })
                .catch(err => {
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
            <div className=" w-full md:w-[500px] flex flex-col justify-center items-center">
                <div className="text-center lg:text-left">
                    <br />
                </div>
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <h1 className="text-2xl md:text-4xl font-bold text-center mt-2">Register Now</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>

                            <input name="name" type="text" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">

                            <label className="label">

                                <span className="label-text">Image</span>
                            </label>

                            <input name="image" type="file" placeholder="Your Photo Url" className="" />
                        </div>
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
                            <input name="password" type="password" placeholder="At least 6 characters" className="input input-bordered" required />

                        </div>
                        <p>Already Have an Account? <Link to="/login"><span className="text-blue-600">Login</span></Link></p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
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

export default Register;