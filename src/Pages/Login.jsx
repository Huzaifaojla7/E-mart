import React,{useState} from 'react'
import Helmet from '../Components/Helmet/Helmet';
import CommonSection from '../Components/UI/CommonSection';
import '../Style/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../Firebase/firebsae.config';
import { toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const signIn=async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential=await signInWithEmailAndPassword(auth,email,password)
      const user=userCredential.user
      setLoading(false)
      toast.success('Successfully logged in')
      navigate('/checkout')
    
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }
  return (
    <Helmet title='Login'>
      <section>
        <div className="container">
          <div className="row my-5">
          {
            loading
            ?
            (<div><h5 className='fw-bold text-center'>Loading....</h5></div>) 
            :
            (<div className="col-12 m-auto text-center">
              <h3 className='fw-bold mb-4 customLoginIn '>Login</h3>
              <form action="" className='auth_form' onSubmit={signIn}>
                <input type="email" className="form-control my-3" placeholder="Enter your email" required  value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" className="form-control my-3" placeholder="Enter your password" required  value={password}  onChange={e=>setPassword(e.target.value)} />
                <button type='submit' className="buy_btn auth_btn">
                  Login
                </button>
                <p>Don't have an account? <Link to={'/signup'}>Create an account {" "}</Link></p>
              </form>
            </div>
            )
          }
            <div className="col-6"></div>
          </div>
        </div>
      </section>
    </Helmet>
  )
}

export default Login
