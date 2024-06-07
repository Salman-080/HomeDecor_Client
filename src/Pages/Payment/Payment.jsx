import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut/CheckOut";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_PK);

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise} >
              <CheckOut></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;