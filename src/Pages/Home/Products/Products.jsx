import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allProducts");
            return res.data;
        }
    })
    return (
        <div className="max-w-screen-xl mx-auto">

            <div>
                <h2>All Products</h2>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    products?.map((product,idx) => (

                        <div key={idx} className="card card-compact bg-base-100 shadow-xl">
                            <figure><img src={product?.product_image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product?.product_name}</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))

                }

            </div>

        </div>
    );
};

export default Products;