import React from 'react'
import useGetData from '../custom-hooks/useGetData';
import { db } from '../Firebase/firebsae.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Helmet from '../Components/Helmet/Helmet';
const AllProduct = () => {



  const { data: productsData, loading } = useGetData('products')

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id))
    toast.success('Deleted!')
  }

  return (
    <>

      <Helmet title="all-products">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 my-5">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        loading ? <h4 className='py-5'>Loading...</h4> : productsData.map(item => (
                          <tr key={item.id}>
                            <td>
                              <img src={item.imgUrl} alt="" />
                            </td>
                            <td>{item.productName}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td><button onClick={() => deleteProduct(item.id)} className='btn btn-danger'>Delete</button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Helmet>
    </>

  )
}

export default AllProduct
