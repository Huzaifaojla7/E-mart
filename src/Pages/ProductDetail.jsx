import React, { useRef, useState, useEffect } from 'react'
// import products from '../Assets/data/products'
import { useParams } from 'react-router-dom';
import CommonSection from '../Components/UI/CommonSection';
import Helmet from '../Components/Helmet/Helmet';
import "../Style/product-detail.css";
import { motion } from 'framer-motion';
import ProductsList from '../Components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/Slices/cartSlice';
import { toast } from 'react-toastify';
import { db } from '../Firebase/firebsae.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';


const ProductDetail = () => {

  const [product, setProduct] = useState({});
  
  const [tab, setTab] = useState('desc');
  const [rating, setRating] = useState(null);
  const reviewUser = useRef('')
  const reviewMassage = useRef('')
  const { id } = useParams()
  // const product = products.find(item => item.id == id)
  const {data:products}=useGetData('products')
  const { imgUrl, productName, price, description, shortDesc, category } = product;
  const relatedProducts = products.filter(item => item.category === category)
  const dispatch = useDispatch()
  
  const docRef = doc(db, 'products', id)
  useEffect(() => {
    const getProduct = async () => {
      const docSnap=await getDoc(docRef)

      if(docSnap.exists()){
        setProduct(docSnap.data())
      }
      else
      {
        console.log('no product !')
      }
    }
    getProduct();
  },[])



  const submitHandler = (e) => {

    e.preventDefault()

    const reviewUserName = reviewUser.current.value;
    const reviewUserMassage = reviewMassage.current.value;
    if (reviewUserName == '' || reviewUserMassage == '')
      return
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMassage,
      rating
    }
    console.log(reviewObj)
    toast.success("Review Submitted")

  }


  const addtoCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price
    }))
    toast.success('Product added successfully')
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  return (
    <>
      <Helmet title={productName}>
        <CommonSection title={productName} />

        <section className='pt-0 mb-3'>
          <div className="container">
            <div className="row ">
              <div className="col-12 col-md-6 col-lg-6">
                <img src={imgUrl} alt="" className='img-fluid' />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="product__detail">
                  <h2>{productName}</h2>
                  <div className="product_rating d-flex align-items-center mb-3">
                    <div>
                      <span><i class="ri-star-s-fill"></i></span>
                      <span><i class="ri-star-s-fill"></i></span>
                      <span><i class="ri-star-s-fill"></i></span>
                      <span><i class="ri-star-s-fill"></i></span>
                      <span><i class="ri-star-half-s-fill"></i></span>
                    </div>
                    <p className='ms-4 m-0'>
                    {/* (<span>{avgRating}</span>) ratings */}
                    </p>
                  </div>

                  <div className='d-flex align-items-center gap-5'>
                    <span className='product_price'>{price} PKR</span>
                    <span>Category : <span style={{ textTransform: "capitalize" }}>{category}</span></span>
                  </div>
                  <p className='mt-4'>{shortDesc}</p>

                  <motion.button whileTap={{ scale: 1.2 }} className="buy_btn" onClick={addtoCart}>
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='my-5'>
          <div className="container">
            <div className="row mt-5">
              <div className="col-12">
                <div className="tab_wrapper d-flex align-items-center gap-5">
                  <h6 className={`${tab === 'desc' ? 'active_tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
                  <h6 className={`${tab === 'rev' ? 'active_tab' : ''}`} onClick={() => setTab('rev')}>
                  {/* Reviews ({reviews.length}) */}
                  </h6>
                </div>
                {
                  tab === 'desc' ? (
                    <div className="tab_content mt-4">
                      <p>{description}</p>
                    </div>
                  ) :
                    (
                      <div className='product_review my-5'>
                        <div className="review_wrapper">

                          {/* <ul>
                            {
                              reviews?.map((item, index) => {
                                return (
                                  <li key={index} style={{ listStyle: 'none' }} className='mb-4'>
                                    <h6>John Doe</h6>
                                    <span>{item.rating} (rating)</span>
                                    <p className='mt-2'>{item.text}</p>
                                  </li>
                                )
                              }
                              )
                            }
                          </ul> */}

                          <div className="review_form">
                            <h4>Leave your experience</h4>

                            <form action="" onSubmit={submitHandler}>
                              <div className="form_group">
                                <input type="text" className='form-control' placeholder='Enter Name' ref={reviewUser} />
                              </div>



                              <div className="form_group rating-group d-flex ">
                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i class="ri-star-s-fill"></i></motion.span>
                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i class="ri-star-s-fill"></i></motion.span>
                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i class="ri-star-s-fill"></i></motion.span>
                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i class="ri-star-s-fill"></i></motion.span>
                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i class="ri-star-s-fill"></i></motion.span>
                              </div>

                              <div className="form_group">
                                <textarea rows={4} type="text" className='form-control' placeholder='Review Massage' ref={reviewMassage} />
                              </div>

                              <motion.button whileTap={{ scale: 1.2 }} type='submit' className="buy_btn">
                                Submit
                              </motion.button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )
                }
              </div>

              <div className="container">
                <div className="row mt-4">
                  <div className="col-12">
                    <h3 className="related_title">
                      You might also like
                    </h3>
                  </div>
                </div>
              </div>

              <ProductsList data={relatedProducts} />

            </div>
          </div>


        </section>

      </Helmet>


    </>
  )
}

export default ProductDetail
