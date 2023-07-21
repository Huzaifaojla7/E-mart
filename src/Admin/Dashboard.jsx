import React from 'react'
import "../Style/dashboard.css";
import Helmet from '../Components/Helmet/Helmet';
import useGetData from '../custom-hooks/useGetData';

const Dashboard = () => {
  const {data:products}=useGetData('products')
  const {data:userData}=useGetData('user')

  return (

    <Helmet title="dashboard">
    <section>
      <div className="container">
        <div className="row my-5 text-center">
          <div className="col-lg-4 mb-2 mb-md-2 mb-lg-0">
            <div className="order_box">
              <h5>Orders</h5>
              <span>length </span>
            </div>
          </div>
          <div className="col-lg-4 mb-2 mb-md-2 mb-lg-0">
            <div className="product_box">
              <h5>Total Products</h5>
              <span>{products.length} </span>
            </div>
          </div>
          <div className="col-lg-4 mb-2 mb-md-2 mb-lg-0">
            <div className="users_box">
              <h5>Total Users</h5>
              <span>{userData.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Helmet>
  )
}

export default Dashboard
