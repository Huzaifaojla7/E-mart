import React from 'react'
import Header from '../Header/Header'
import Routers from '../../Routers/Routers'
import Footer from '../Footer/Footer'
import AdminNavbar from '../../Admin/AdminNavbar'
import { useLocation } from 'react-router-dom'

const Layout = () => {

  const location = useLocation()

  return (
    <>
      {
        location.pathname.startsWith('/dashboard') ? <AdminNavbar /> : <Header />
      }
      <main className='flex-grow-1'>
        <Routers />
      </main>
      <Footer />
    </>
  )
}

export default Layout
