import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { ToastContainer, toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    console.log(id);
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);

    const { data: productInfo = [] } = useQuery({
        queryKey: ["productInfo", id],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/productDetails/${id}`);
            return res.data;
        }
    })

    const handleAddToCart = async (productInfo, user) => {
        const productDetails = { ...productInfo, userEmail: user?.email, productId: productInfo._id };
        delete productDetails._id;
        const res = await axiosPrivate.post("/cartProduct", productDetails);
        if (res?.data?.insertedId) {
            toast.success('Successfully added to cart', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    }
    return (
        <div className="max-w-screen-xl mx-auto">

            <div className="card lg:card-side bg-base-100 shadow-xl space-x-4 px-2 py-3">
                <figure className="w-full h-[300px] md:w-full md:h-[420px] lg:w-[550px] lg:h-[400px]"><img className=" w-full h-full" src={productInfo.product_image} alt="" /></figure>
                <div className=" lg:w-[750px] space-y-4 mt-3">
                    <h2 className="card-title">{productInfo.productName}</h2>
                    <p className="text-3xl font-semibold"> {productInfo.product_name}</p>
                    <p><span className="text-lg font-semibold">Type: </span> <span>{productInfo.product_type}</span></p>
                    <p><span className="text-lg font-semibold">Short Description: </span> <span>{productInfo.shortDescription}</span></p>
                    <p><span className="text-lg font-semibold">Long Description: </span> <span>{productInfo.longDescription}</span></p>



                    <p><span className="text-lg font-semibold">Price: </span> <span>${productInfo.price}</span></p>

                    <div className="card-actions mt-3">

                        <button className="btn bg-green-700 text-white mt-3" onClick={() => handleAddToCart(productInfo, user)}>Add To Cart</button>

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

export default ProductDetails;