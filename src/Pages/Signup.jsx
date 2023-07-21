import React, { useState } from 'react'
import Helmet from '../Components/Helmet/Helmet';
import CommonSection from '../Components/UI/CommonSection';
import '../Style/login.css';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth } from '../Firebase/firebsae.config';
import { storage } from '../Firebase/firebsae.config';
import { db } from '../Firebase/firebsae.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // update User Profile
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL
          });
          // store user data in firestore database
          await setDoc(doc(db, 'user', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL
          })
        })
      })
      setLoading(false)
      toast.success("Account Created")
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong')

    }
  }
  return (
    <Helmet title='Signup'>
      <section>
        <div className="container">
          <div className="row my-5">
            {loading 
            ? 
            (<div><h5 className='fw-bold text-center'>Loading....</h5></div>) 
            :
             (<div className="col-12 m-auto text-center">
              <h3 className='fw-bold mb-4 customLoginIn '>Signup</h3>
              <form action="" className='auth_form' onSubmit={signup}>
                <input type="text" className="form-control my-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="email" className="form-control my-3" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control my-3" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />
                <input type="file" className="form-control my-3" placeholder="Enter your password" onChange={e => setFile(e.target.files[0])} />
                <button type='submit' className="buy_btn auth_btn">
                  Create an Account
                </button>
                <p>Already have an account?{" "} <Link to={'/login'}> Login</Link></p>
              </form>
            </div>)
            }
            <div className="col-6"></div>
          </div>
        </div>
      </section>
    </Helmet>
  )
}

export default Signup
