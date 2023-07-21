import React,{useEffect} from 'react'
import './footer.css'
import logo from '../../Assets/images/logo_footer.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  let year = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <footer>
      <div className="container">
        <div className="row text-white">
          <div className="col-12 col-md-3 col-lg-3 mb-4">
            <div className="logo d-flex align-items-center">
            <span><img src={logo} alt="" width="43px" /></span>
              <Link to={'/home'}><h3 className='ms-2 m-0 footer__quick-title'>E-Mart</h3></Link>
            </div>
            <p className="footer__text mt-4">
              Welcome to our online store, your one-stop shop for all your shopping needs! Secure shopping experience from the comfort of your home.
            </p>
          </div>

          <div className="col-12 col-md-3 col-lg-3 mb-4">
            <div className="footer_quick-links">
              <h4 className="footer__quick-title mb-4 ps-0 ps-lg-4">
                Top Categories
              </h4>
              <ul className='footer_links'>
                <li >
                  <Link to={"/shop"}>Mobile Phones</Link>
                </li>
                <li>
                  <Link to={"/shop"}>Modern Sofa</Link>
                </li>
                <li>
                  <Link to={"/shop"}>Arm Chair</Link>
                </li>
                <li>
                  <Link to={"/shop"}>Smart Watches</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-2 col-lg-2 mb-4">
            <div className="footer_quick-links">
              <h4 className="footer__quick-title mb-4 text-start r">
                Useful Links
              </h4>
              <ul className='footer_links '>
                <li >
                  <Link to={"/shop"}>Shop</Link>
                </li>
                <li>
                  <Link to={"/cart"}>Cart</Link>
                </li>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"#"}>Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-4 col-lg-4 mb-4">
            <div className="footer_quick-links">
              <h4 className="footer__quick-title mb-4 ms-0 ms-lg-4">
                Contact
              </h4>
              <ul className='footer_links'>
                <li className='d-flex'>
                  <span><i class="ri-map-pin-line"></i></span>
                  <Link className='ms-2'>Kotwali Road, Faisalabad</Link>
                </li>
                <li className='d-flex'>
                  <span><i class="ri-phone-line"></i></span>
                  <Link to={"https://wa.me/923166090519"} target='_blank' className='ms-2'>+92 316 6090519</Link>
                </li>
                <li className='d-flex'>
                  <span><i class="ri-mail-line"></i></span>
                  <Link to={"mailto:huzaifaojla1@gmail.com"} className='ms-2'>huzaifaojla1@gmail.com</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className='text-center footer_copyright'>&copy; Copyright {year} developed by Muhammad Huzaifa Shuaib . All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
