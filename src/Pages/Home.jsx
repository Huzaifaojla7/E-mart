import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Helmet from '../Components/Helmet/Helmet'
import heroImg from '../Assets/images/hero-img.png';
import { motion } from 'framer-motion';
import '../Style/home.css';
import Service from '../Services/Service';
import ProductList from '../Components/UI/ProductsList';
import couterImg from '../Assets/images/counter-timer-img.png';
import Clock from '../Components/UI/Clock';
import useGetData from '../custom-hooks/useGetData'

const Home = () => {
  const { data: products, loading } = useGetData('products')

  const [trendingProduct, settrendingProduct] = useState([])
  const [bestSalesProduct, setbestSalesProduct] = useState([])
  const [mobileProduct, setmobileProduct] = useState([])
  const [wirelessProduct, setwirelessProduct] = useState([])
  const [popularProduct, setpopularProduct] = useState([])

  useEffect(() => {
    const filterTrendingProduct = products.filter((item) => item.category === "chair")
    const filterbestSalesProduct = products.filter((item) => item.category === "sofa")
    const filterMobileProduct = products.filter((item) => item.category === "mobile")
    const filterWirelessProduct = products.filter((item) => item.category === "wireless")
    const filterPopularProduct = products.filter((item) => item.category === "watch")
    settrendingProduct(filterTrendingProduct)
    setbestSalesProduct(filterbestSalesProduct)
    setmobileProduct(filterMobileProduct)
    setwirelessProduct(filterWirelessProduct)
    setpopularProduct(filterPopularProduct)
  }, [products])


  const year = new Date().getFullYear()
  return (
    <Helmet title="Home">
      <section className='hero_Section'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="hero_content">
                <p className='hero_subtitle'>Trending product in {year}</p>
                <h2>Your Trusted Source for Quality Products</h2>
                <p>Discover a world of incredible products and unbeatable deals. From fashion and electronics to home decor and accessories, we have everything you need.! </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn"><Link to={"/shop"}>Shop Now</Link></motion.button>
              </div>
            </div>
            <div className="col-6 ">
              <div className="hero_img">
                <img src={heroImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <Service />

      <section className="trending__products">
        <div className="container">
          <div className="row mt-5">
            <div className="col text-center">
              <h2 className='section__title'>Trending Products</h2>
            </div>
          </div>
          <div className="row">
            {
              loading
                ?
                <h5 className='fw-bold'>loading...</h5> :
                <ProductList data={trendingProduct} />

            }
          </div>
        </div>
      </section>

      <section className="best__sales mb-5">
        <div className="container">
          <div className="row mt-5">
            <div className="col text-center">
              <h2 className='section__title'>Best Sales</h2>
            </div>
          </div>
          <div className="row my-4">
            {
              loading
                ?
                <h5 className='fw-bold'>loading...</h5> :
                <ProductList data={bestSalesProduct} />

            }
          </div>
        </div>
      </section>

      <section className="timer__count">
        <div className="container">
          <div className="row py-3">
            <div className="col-12 col-md-6 col-lg-6 d-flex justify-content-center flex-column">
              <div className="clock__counter-content mb-2 ms-1">
                <h4 className='text-white mb-2'>Limited Offers</h4>
                <h3 className='text-white mb-3'>Quality Armchair</h3>
              </div>
              <Clock />

              <motion.button whileTap={{ scale: 1.1 }} className="buy__btn w-50">
                <Link to={'/shop'}>Visit Store</Link>
              </motion.button>

            </div>
            <div className="col-md-6 col-lg-6 d-flex justify-content-end align-items-center ">
              <img src={couterImg} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="new__arrivals">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title text-center mt-5">
                New Arrivals
              </h2>
            </div>
          </div>
          <div className="row my-4">
            {
              loading
                ?
                <h5 className='fw-bold'>loading...</h5> :
                <ProductList data={mobileProduct} />

            }
            {
              loading
                ?
                <h5 className='fw-bold'>loading...</h5> :
                <ProductList data={wirelessProduct} />

            }
          </div>
        </div>
      </section>

      <section className="popular__category">
        <div className="container">
          <div className="row my-5">
            <div className="col-12">
              <h2 className='text-center'>Popular in Category</h2>
            </div>
          </div>
          <div className="row my-4">
            {
              loading
                ?
                <h5 className='fw-bold'>loading...</h5> :
                <ProductList data={popularProduct} />

            }
          </div>
        </div>
      </section>
    </Helmet>
  )
}

export default Home
