import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../Style/product-card.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/Slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ item }) => {

    const dispatch = useDispatch();
    const addtoCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            imgUrl: item.imgUrl,
            price: item.price,
        }));
        toast.success("Product added Successfully")
    }

    return (
        <div className="col-12 col-md-4 col-lg-3 mb-2">
            <div className="product_item">
                <div className="product_img">
                    <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" width={"250px"} className='img-fluid' />
                </div>
                <div className="p-2 product_info">
                    <h3 className="product_name">
                        <Link to={`/shop/${item.id}`}>
                            {item.productName}
                        </Link>
                    </h3>
                    <span>{item.category}</span>
                </div>
                <div className="product_card_bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">
                        RS {item.price} /
                    </span>
                    <motion.span whileTap={{ scale: 1.2 }} onClick={addtoCart}><i class="ri-add-line"></i></motion.span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
