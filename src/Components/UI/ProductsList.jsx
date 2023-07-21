import React from 'react'
import ProductCard from './ProductCard'

const ProductsList = ({data,i}) => {

  return (
    <>
    {
      data.map((item)=>  <ProductCard item={item} key={i}/>)
    }
    </>
  )
}

export default ProductsList
