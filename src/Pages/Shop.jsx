import React, { useState, useEffect } from 'react'
import Commonsection from '../Components/UI/CommonSection';
import Helmet from '../Components/Helmet/Helmet';
import '../Style/shop.css';
import ProductLists from '../Components/UI/ProductsList';
import useGetData from '../custom-hooks/useGetData'

const Shop = () => {
  const { data: products, loading } = useGetData('products'); 
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    setProductsData(products);

  }, [products])


  const handleFilter = e => {
    const filterValue = e.target.value;
    if (filterValue === "sofa") {
      const filterProducts = products.filter(item => item.category === "sofa")
      setProductsData(filterProducts)
    }
    else if (filterValue === "mobile") {
      const filterProducts = products.filter(item => item.category === "mobile")
      setProductsData(filterProducts)
    }
    else if (filterValue === "chair") {
      const filterProducts = products.filter(item => item.category === "chair")
      setProductsData(filterProducts)
    }
    else if (filterValue === "watch") {
      const filterProducts = products.filter(item => item.category === "watch")
      setProductsData(filterProducts)
    }
    else if (filterValue === "wireless") {
      const filterProducts = products.filter(item => item.category === "wireless")
      setProductsData(filterProducts)
    }
    else {
      setProductsData(products)
    }

  }

  const handleSearch = e => {
    const searchProduct = e.target.value;
    const searchProducts = products.filter(item => item.productName.toLowerCase().includes(searchProduct.toLowerCase()))
    setProductsData(searchProducts)
  }
  const handleSort = e => {
    const sortProduct = e.target.value;
    if (sortProduct == 'ascending') {
      const sortedProducts = products.slice().sort((a, b) => a.productName.localeCompare(b.productName));
      setProductsData(sortedProducts);
    }
    else {
      const sortedProducts = products.slice().sort((a, b) => b.productName.localeCompare(a.productName));
      setProductsData(sortedProducts);
    }
  }

  return (
    <>
      <Helmet title="Shop">
        <Commonsection title="Products" />

        <section className='py-5 '>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-md-3 mb-lg-0">
                <div className="filter__widget">
                  <select onChange={handleFilter}>
                    <option value="">Filter By Category</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-md-3 mb-lg-0 d-col-flex justify-content-start d-md-flex justify-content-end">
                <div className="filter__widget">
                  <select onChange={handleSort}>
                    <option value="">Sort By</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>

              </div>
              <div className="col-12 col-md-12 col-lg-3 mb-3 mb-md-3 mb-lg-0 ">
                <div className="search__box ">
                  <input type="text" placeholder='Search.....' onChange={handleSearch} />
                  <span>
                    <i className='ri-search-line'></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row my-1 my-md-2 my-lg-3">
              {/* {
                productsData.length == 0
                  ? <h1 className='text-center'>No product are found !</h1> :
                  <ProductLists data={productsData} />
              } */}


              {
                loading
                  ?
                  <h5 className='fw-bold'>loading...</h5> :
                  <ProductLists data={productsData} />

              }
            </div>
          </div>
        </section>

      </Helmet>
    </>
  )
}

export default Shop
