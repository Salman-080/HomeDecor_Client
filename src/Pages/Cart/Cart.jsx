import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../Provider/Provider";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";


const Cart = () => {
    const { user } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [cartList, refetch] = useCart();
    const totalPrice = cartList?.reduce((total, perProduct) => total + (perProduct.price), 0).toFixed(2);


    const handleDelete = (cartProductId) => {
        console.log(cartProductId);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPrivate.delete(`/cartDataDelete/${cartProductId}`)
                console.log(res);
                if (res?.data?.deletedCount > 0) {
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong! Try again.",

                    });
                }

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }
    const handlePurchase = () => {
        navigate("/payment");
    }
    return (
        <div className="lg:grid grid-cols-4 max-w-screen-xl mx-auto gap-10">

            <div className=" mt-7 lg:col-span-3 ">
                {
                    cartList?.map(cartProduct => (

                        <div key={cartProduct._id} className="flex flex-col gap-6 p-2">
                            <div className="card md:card-side bg-base-100 shadow-xl h-[500px] md:h-[240px] lg:h-[220px] pr-4">
                                <figure className="h-full md:w-[250px]"><img className="h-full w-full" src={cartProduct.product_image} alt="" /></figure>
                                <div className="card-body">
                                    <div className="space-y-3 flex flex-col ">
                                        <h2 className="card-title text-2xl font-semibold">{cartProduct.product_name}</h2>
                                        <p className="text-lg">{cartProduct.product_type}</p>
                                        <p className="text-lg font-light">${cartProduct.price}</p>


                                    </div>


                                </div>
                                <div className="card-actions md:flex md:items-center  ">
                                    <button onClick={() => handleDelete(cartProduct._id)} className="btn bg-blue-600 w-[330px] md:w-auto mx-auto text-white">Remove</button>
                                </div>
                                <br />
                            </div>
                            <hr />
                        </div>
                    ))
                }
            </div>

            <div className="max-h-screen-xl shadow-xl h-fit px-6 py-12 md:col-span-1">
                <div className="text-2xl font-semibold text-center">
                    Order
                </div>
                <br />
                <hr />
                <br />
                <div className="space-y-2">
                    <h2>Total Items: <span className="font-semibold">{cartList.length}</span> </h2>
                    <h2>Total Price: <span className="font-semibold">${totalPrice}</span> </h2>

                </div>


                <div className="text-center mt-5">
                    <button onClick={handlePurchase} disabled={totalPrice == 0} className="btn bg-orange-500 text-white">Purchase</button>
                </div>




            </div>

        </div>
    );
};

export default Cart;