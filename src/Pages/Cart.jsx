import React from 'react'
import '../Style/cart.css';
import Helmet from '../Components/Helmet/Helmet';
import CommonSection from '../Components/UI/CommonSection';
import { motion } from 'framer-motion';
import {  cartActions } from '../redux/Slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
 
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping Cart' />

      <section>
        <div className="container">
          <div className="row my-5">

            <div className="col-12 col-md-12 col-lg-9 mb-5 mb-md-5 mb-lg-0">
              {
                cartItems.length == 0 ? <h2 className='my-5 text-center customClass'>No Item Added to the Cart</h2> : <div class="table-responsive">

                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => {
                        return (
                          <Tr item={item} key={index} />
                        )
                      })}

                    </tbody>
                  </table>
                </div>
              }


            </div>

            <div className="col-12 col-md-12 col-lg-3">
              <h4 className='d-flex align-items-center justify-content-between'>Sub Total
              <span className='fw-bold' style={{fontSize:"20px"}}>{totalAmount} RS</span>
              </h4>
              <p className='mt-4'>Taxes and shipping will calculate in checkout</p>
              <button className="buy_btn my-4 w-100"><Link to={'/shop'}>Continue Shopping</Link></button>
              <button className="buy_btn w-100"><Link to={'/checkout'}>Checkout</Link></button>
            </div>
          </div>
        </div>
      </section>



    </Helmet>
  )
}

const Tr = ({ item, key }) => {
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return (
    <tr key={key}>
      <td><img src={item.image} alt="" /></td>
      <td>{item.productName}</td>
      <td>{item.price} RS</td>
      <td>{item.quantity} px</td>
      <td><motion.i whileTap={{ scale: 1.2 }} className="ri-delete-bin-line" onClick={deleteProduct} ></motion.i></td>
    </tr>
  )
}

export default Cart
