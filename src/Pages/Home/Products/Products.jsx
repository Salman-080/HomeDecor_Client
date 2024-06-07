import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useState } from "react";

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const [showMore, setShowMore] = useState(false);
    const [totalProducts, setTotalProducts] = useState([]);
    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allProducts");
            setTotalProducts(res.data);
            return res.data;
        }
    })
    return (
        <div className="max-w-screen-xl mx-auto">

            <div className="text-center ">
                <h2 className="font-bold text-3xl mt-8">All Products</h2>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 px-3">

                {
                    !showMore ? products?.slice(0, 12).map((product, idx) => (

                        <div key={idx} className="card card-compact bg-base-100 shadow-xl">
                            <figure className="h-[230px] w-full"><img className="h-full w-full" src={product?.product_image} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">{product?.product_name}</h2>

                                <div className="card-actions items-center">
                                    <p className="text-lg font-semibold">${product?.price}</p>
                                    <Link to={`/product/${product._id}`}><button className="btn bg-green-700 text-white">View Details</button></Link>
                                </div>
                            </div>
                        </div>
                    )) :
                        totalProducts?.map((product, idx) => (

                            <div key={idx} className="card card-compact bg-base-100 shadow-xl">
                                <figure className="h-[230px] w-full"><img className="h-full w-full" src={product?.product_image} alt="" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{product?.product_name}</h2>

                                    <div className="card-actions items-center">
                                        <p className="text-lg font-semibold">${product?.price}</p>
                                        <Link to={`/product/${product._id}`}><button className="btn bg-green-700 text-white">View Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                }

            </div>

            {
                !showMore && <div className="text-center mt-8">
                    <button onClick={() => setShowMore(!showMore)} className="btn btn-primary">Show More</button>
                </div>
            }


        </div>
    );
};

export default Products;