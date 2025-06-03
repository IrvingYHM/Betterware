import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Pesw4FaQ2Q5P9Tkq8HMZ9kwiuallH3CTSGW46Hf7OxMZbDpPtOG1VIttyCW10HNhHbOQQLSiTppealOkbMifA7r00G3ezS8KA');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const { data } = await axios.post('http://localhost:3000/stripe/checkout', {
          id,
          amount: 10000
        });
        console.log(data);
        alert("Payment Successful");
      } catch (error) {
        console.error("Payment error: ", error);
        alert("Payment Failed");
      }
    } else {
      console.error("Stripe error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <img className="justify-center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5XuDiF1t6emrcuyDDnv_sQJj6iKvo97nZLQ&s" alt="Product" />
      <h3 className="text-center my-2">Price: $ 100</h3>

      <div className="p-4 border border-gray-300 rounded-md shadow-sm">
        <CardElement className="p-2" />
      </div>
      <button
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
      >
        Buy
      </button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
}

export default App;
