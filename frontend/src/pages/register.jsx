import {React,useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from "axios";
function Register() {
    const [credentials,setCredentials] = useState({name:"",email:"",password:""});
    let navigate = useNavigate()
    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const res = await axios.post('http://localhost:5000/register',credentials);
        console.log(res)
        if(res.data.status==="ok"){
          navigate("/login");
        }
      }
      catch(e){
        alert(e)
      }
    }
    const handleChange= (e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
      console.log(credentials)
    }
  return (
    <>
    <div className='container'>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} placeholder='Enter your name' onChange={handleChange} />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={handleChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange}  />
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to='/login' className='m-3 btn btn-danger'>Already have an account?</Link>
</form>
</div>
    </>
  )
}

export default Register