import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

import config from '../components/Khalti/KhaltiConfig';
import KhaltiCheckout from "khalti-checkout-web";
import axios from 'axios';

const PaymentScreen = () => {
  let checkout = new KhaltiCheckout(config);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('Khalti');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  // const orderData = localStorage.getItem('cart',JSON.stringify(orderData))
  // const userInfo = localStorage.getItem('userInfo')
  // console.log(orderData)
  // console.log(userInfo)

  const handleKhaltiPayment = async () => {
    const payload = {
      "return_url": `http://localhost:3000/placeorder`,
      "website_url": 'http://localhost:3000/',
      amount: 1000, //Add dynamic price here
      "purchase_order_id": `E-Aausadi`,
      "purchase_order_name": `E-Aausadi`,
      "merchant_username":'E-Aausadi',
      "customer_info": {
        name: 'Amod Praadhan',
        email: 'amod@gmail.com',
        phone: '980000001',
      },
    };
    try {
      const { data } = await axios.post(
        'https://a.khalti.com/api/v2/epayment/initiate/',
        payload,
        {
          headers: {
            "authorization": `Key a0f62ca3f85f4f028b7e05cd6a0ccbb9`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (data?.payment_url) {
        const paymentUrl = data.payment_url;
        dispatch(savePaymentMethod(paymentMethod));
        console.log('Navigating to payment URL:', paymentUrl);
  
        window.location.href = paymentUrl;
      }
  
      console.log('data', data);
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='Khalti'
              id='Khalti'
              name='paymentMethod'
              value='Khalti'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        {/* <Button type='submit' variant='primary' onClick={() => checkout.show({amount: 10000})}> */}
        <Button variant='primary' onClick={handleKhaltiPayment}>

          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
