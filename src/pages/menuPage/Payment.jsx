import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../hooks/useCart';
// pk_test_51PahTDKxxPKJSSfuBbX3mITeCYf9b2bdqwn3iMcAqB679bclN8AtCCiKEWYOaxSo7OLHmGjndnxMTKLEVJkxm3XB0040oJSzSS
// VITE_STRIPE_PK=pk_test_51PahTDKxxPKJSSfuBbX3mITeCYf9b2bdqwn3iMcAqB679bclN8AtCCiKEWYOaxSo7OLHmGjndnxMTKLEVJkxm3XB0040oJSzSS
// VITE_STRIPE_PK=pk_test_51PahTDKxxPKJSSfuBbX3mITeCYf9b2bdqwn3iMcAqB679bclN8AtCCiKEWYOaxSo7OLHmGjndnxMTKLEVJkxm3XB0040oJSzSS
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function Payment() {
    const [Cart]=useCart();
    console.log(Cart)
    const cartTotal=Cart.reduce((sum,item)=>sum+item.price,0)
    const totalPrice=parseFloat(cartTotal.toFixed(2));  
    return (
    <div className='max-w-screen-2xl container mx-auto x1:px-24 px-4 py-28'>
        <Elements stripe={stripePromise}>
      <CheckoutForm price={totalPrice} cart={Cart}/>
    </Elements>
    </div>
  )
}

export default Payment