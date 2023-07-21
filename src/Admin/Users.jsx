import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebsae.config";
import useGetData from "../custom-hooks/useGetData";
import Helmet from '../Components/Helmet/Helmet';
import { toast } from "react-toastify";

const Users = () => {
  const { data: usersData, loading } = useGetData('user');
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'user', id))
    toast.success("user deleted!")
  }
  return (
    <Helmet title="users">
    <section>
      <div className="container">
        <div className="row my-5">
          <div className="col-12">
            <h4 className='fw-bold'>Users</h4>
          </div>
          <div className="col pt-5">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loading ? <h4 className='py-5'>Loading...</h4> : usersData?.map(user => (
                      <tr key={user.uid}>
                        <td>
                          <img src={user.photoURL} alt="" />
                        </td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td><button onClick={() => {
                          deleteUser(user.uid)
                        }} className='btn btn-danger'>Delete</button></td>
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
  )
}

export default Users
