import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_8KrBVGQSJu3x5zzCR112MA1c00xAPJTAaH';

    const onToken = token => {
        console.log(token);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token,
                
            }
        }).then(res => {
            alert('Payment Successful');
        }).catch(err => {
            console.error('Payment error: ', JSON.parse(err));
            alert('There was an issue with your payment.')
        })
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Rent-A-Swag, Inc.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;
