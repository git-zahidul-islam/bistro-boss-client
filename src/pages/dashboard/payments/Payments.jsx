import SectionHeading from "../../../components/sectionHeading/SectionHeading";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from "./CheckoutForm";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
const Payments = () => {
    return (
        <div>
            <SectionHeading heading={'Payments'} subheading={"Please pay to eat"}></SectionHeading>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payments;