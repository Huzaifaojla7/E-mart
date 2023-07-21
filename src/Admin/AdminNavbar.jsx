import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../Style/admin-nav.css';
import useAuth from '../custom-hooks/useAuth'
import { motion } from 'framer-motion';

const admin_nav = [

    {
        display: 'Dashboard',
        path: '/dashboard'
    },
    {
        display: 'All-Product',
        path: '/dashboard/all-products'
    },
    {
        display: 'Orders',
        path: '/dashboard/orders'
    },
    {
        display: 'Users',
        path: '/dashboard/users'
    }
]
const AdminNavbar = () => {

    const { currentUser } = useAuth();
    return (
        <>
            <header className="admin_header">
                <div className="container">
                    <div className="row my-2">
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <Link className="navbar-brand text-white" href="#"><h4>E-mart</h4></Link>


                                <div className="d-flex dashboardCustom">
                                    <span class="nav-item dropdown profile">

                                        <motion.img className='nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false" whileTap={{ scale: 1.2 }} src={currentUser && currentUser.photoURL} alt="" width={"40px"} />

                                        <ul class="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item text-center" to={'/'}>Home</Link>
                                                <Link className="dropdown-item text-center" to={'/dashboard/add-product'}>Add product</Link>
                                            </li>
                                        </ul>

                                    </span>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="admin_menu p-0">
                <div className="container">
                    <div className="row admin_navigation">
                    <div className="col-lg-2"></div>

                        {
                            admin_nav.map((item, index) => {
                                return (
                                    <div className="col-12 col-md-3 col-lg-2 text-center admin_menu-list ">
                                        <li className="admin_menu-item" key={index} style={{listStyle:'none'}}>
                                            <NavLink className={navClass => navClass.isActive ? "active_admin-menu" : ''} to={item.path}>{item.display}</NavLink>
                                        </li>
                                    </div>
                                )
                            })
                        }

                        <div className="col-lg-2"></div>


                    </div>
                </div>
            </section>


        </>
    )
}

export default AdminNavbar
