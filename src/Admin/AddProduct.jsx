import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { db, storage } from '../Firebase/firebsae.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Helmet from '../Components/Helmet/Helmet';


const AddProduct = () => {

  const navigate = useNavigate();
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [laoding, setLaoding] = useState(false);


  const addProduct = async (e) => {
    e.preventDefault()
    setLaoding(true)

    // add Products in firebase Store ......//
  try {
    const docRef = await collection(db, 'products');
    const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
  
    // Wait for the image upload to complete
    await uploadTask;
  
    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
    // Add the product to the Firestore collection
    await addDoc(docRef, {
      productName: enterTitle,
      shortDesc: enterShortDesc,
      description: enterDescription,
      category: enterCategory,
      price: enterPrice,
      imgUrl: downloadURL
    });
  
    // Product added successfully
    setLaoding(false);
    toast.success('Product Successfully Added!');
    navigate('/dashboard/all-products');
  } catch (err) {
    setLaoding(false);
    toast.error('Product not added!');
  }
}

  return (
   <Helmet title='add-product'>
    <section>
      <div className="container">
        <div className="row my-5">
          <div className="col-12">
            {laoding
              ?
              <h4 className='text-center py-5'>Loading....</h4>
              :
              <>
                <h4 className='mb-5'>Add Product</h4>
                <form action="" onSubmit={addProduct}>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label labelColr">Product Title</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Product Detail" value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" className="form-label labelColr">Short Description</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Text...." value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label labelColr">Description</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Description...." value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label labelColr">Price</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="RS..." value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                      </div>
                    </div>
                    <div className="col-6">
                      <div>
                        <label for="exampleFormControlInput1" className="form-label labelColr">Category</label><br />
                        <select className='w-100 py-2' value={enterCategory} onChange={e => setEnterCategory(e.target.value)}>
                          <option selected>Select category</option>
                          <option value="chair">Chair</option>
                          <option value="sofa">Sofa</option>
                          <option value="mobile">Mobile</option>
                          <option value="watch">Watch</option>
                          <option value="wireless">Wireless</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label labelColr">Product Image</label>
                    <input type='file' className="form-control" id="exampleFormControlInput1" required onChange={e => setEnterProductImg(e.target.files[0])} />
                  </div>

                  <button className="buy_btn my-3" type='submit'>Add Product</button>

                </form>
              </>
            }
          </div>
        </div>
      </div>
    </section>
    </Helmet>
  )
}

export default AddProduct
