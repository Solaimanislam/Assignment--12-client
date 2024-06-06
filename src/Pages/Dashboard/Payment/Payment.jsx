import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {

const {id} = useParams();
console.log(id);
 
    return (
        <div className="lg:ml-10">
            <Helmet>
                <title>SI | Payment</title>
            </Helmet>
            <SectionTitle
                heading="Payment"
                subHeading="Please pay to Booking Test"></SectionTitle>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm id={id}></CheckoutForm>
                    </Elements>
                </div>
        </div>
    );
};

export default Payment;