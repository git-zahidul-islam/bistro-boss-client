import { CardCvcElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const CheckoutForm = () => {
    const { user } = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, items) => total + items.price, 0)
    const navigate = useNavigate()


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: parseFloat(totalPrice) })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: payment_error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (payment_error) {
            console.log("payment error");
        }
        else {
            console.log("payment intend", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log("tr id", paymentIntent?.id);
                setTransactionId(paymentIntent?.id)
                // now payment save in the database
                const payment = {
                    email: user?.email,
                    price: parseFloat(totalPrice),
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cardIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log(res.data);
                refetch()
                if (res.data.paymentsResult.insertedId){
                    Swal.fire({
                        title: "Good job!",
                        text: "Product Buy Successfully!",
                        icon: "success"
                    });
                    navigate('/dashboard/payment-history')
                }
            }
        }

    }

    return (
        <div className="mx-10">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-success mt-5" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-red-400">{error}</p>
            {transactionId && <p className="text-green-400">the Transaction Id: {transactionId}</p>}
        </div>
    );
};

export default CheckoutForm;