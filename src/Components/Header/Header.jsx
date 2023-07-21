import React from 'react'
import "./header.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/eco-logo.png'
import UserIcon from '../../Assets/images/user-icon.png'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebsae.config';
import { toast } from 'react-toastify';


const nav_link = [
    {
        path: "home",
        display: "Home"
    },
    {
        path: "shop",
        display: "Shop"
    },
    {
        path: "cart",
        display: "Cart"
    },
]

const Header = () => {

    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const navigate = useNavigate()
    const navigateToCart = () => {
        navigate('/cart')
    }
    const { currentUser } = useAuth();
    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out')
            navigate('/home')
        }).catch(err => {
            toast.error(err.message)
        })
    }

    return (
        <div className='position-sticky top-0 z-3 bg-white'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <img src={logo} alt="logo" width={"42px"} />
                    <NavLink className="navbar-brand ms-3" to={"/home"}><h5 className='m-0'>E-Mart</h5>
                        <small className='d-flex' style={{ fontSize: "12px" }}>Made for customer</small>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            {
                                nav_link.map((item, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <NavLink className="nav-link" to={item.path}>{item.display}</NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="d-flex align-items-center nav_icons">
                            <span className='fav_icon'><i class="ri-heart-line"></i>
                                <span className="badge">1</span>
                            </span>

                            <span className='Cart_icon' onClick={navigateToCart}><i class="ri-shopping-bag-line"></i>
                                <span className="badge">{totalQuantity}</span>
                            </span>

                            <span class="nav-item dropdown profile">

                                <motion.img className='nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false" whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : UserIcon} alt="" width={"40px"} />

                                <ul class="dropdown-menu">
                                    {
                                        currentUser ? (
                                            <>
                                                <span className='customDropDown dropdown-item text-center' onClick={logout}>Logout</span>
                                                {currentUser.email === 'huzaifaojla1@gmail.com' && (
                                                    <li>
                                                        <Link className="dropdown-item text-center" to={'/dashboard'}>Dashboard</Link>
                                                        <Link className="dropdown-item text-center" to={'/dashboard/add-product'}>Add Product</Link>
                                                    </li>
                                                )}
                                            </>
                                        ) : (
                                            <li>
                                                <Link className="dropdown-item text-center" to={'/signup'}>Signup</Link>
                                                <Link className="dropdown-item text-center" to={'/login'}>Login</Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </span>
                            {/* <span>
                                <p className='m-0'>{currentUser.displayName}</p>
                            </span> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
