import React, { useState } from 'react'
import Helmet from '../Components/Helmet/Helmet';
import CommonSection from '../Components/UI/CommonSection';
import '../Style/checkout.css';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { db } from '../Firebase/firebsae.config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {  cartActions } from '../redux/Slices/cartSlice';


const Checkout = () => {
  const dispatch = useDispatch()
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const productDetail = useSelector(state => state.cart.cartItems);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkoutBill = async () => {
    setLoading(true);

    // Add the order to the Firestore collection
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        name,
        email,
        phone,
        address,
        city,
        postal,
        country,
        totalAmount,
        totalQuantity,
        products: productDetail.map(item => ({
          id: item.id,
          productName: item.productName,
        })),
        timestamp: new Date().getTime()
      });

      // Product added successfully
      setLoading(false);
      toast.success('Order Successfully Sent!');
      dispatch(cartActions.clearCart());
      navigate('/shop');
    } catch (err) {
      setLoading(false);
      toast.error('Order Unsuccessful!');
    }
  };

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <div className="container">
          <div className="row my-5">
            <div className="col-lg-8 mb-4 mb-md-4 mb-lg-0">
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <form action="" className='billing_form' >
                <input type="text" className="form-control my-3" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                <input type="email" className="form-control my-3" placeholder="Enter your email" required onChange={e => setEmail(e.target.value)} />
                <input type="number" className="form-control my-3" placeholder="Phone number" onChange={e => setPhone(e.target.value)} />
                <input type="text" className="form-control my-3" placeholder="Street address" onChange={e => setAddress(e.target.value)} />
                <input type="text" className="form-control my-3" placeholder="City" onChange={e => setCity(e.target.value)} />
                <input type="text" className="form-control my-3" placeholder="Postal code" onChange={e => setPostal(e.target.value)} />
                <input type="text" className="form-control my-3" placeholder="Country" onChange={e => setCountry(e.target.value)} />
              </form>
            </div>
            <div className="col-lg-4">
              <div className="checkout_cart">
                <h6>Total Qty: <span>{totalQuantity} items</span></h6>
                <h6>Subtotal: <span>{totalAmount} RS</span></h6>
                <h6>
                  <span>
                    { }
                    Shipping: <br />Free Shipping
                  </span><span>10 RS</span></h6>
                <h4>Total Cost: <span>{totalAmount}RS</span></h4>
                <button className="buy_btn auth_btn w-100" onClick={checkoutBill}>Place an order</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Helmet>

  )
}

export default Checkout
