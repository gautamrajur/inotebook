import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [credentials ,setCredentials] = useState({ name:"", email: "", password: "", cpassword:""})
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email,password} = credentials;

    const response = await fetch("http://localhost:4000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email,password})
    });
      const json = await response.json();
      console.log(json)
   
      if(json.success){
             //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/")
      }
      else{
        alert("Sorry a User wiht the email already exists");
      }
   
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='container my-3'>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} id="password" placeholder="Password" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
