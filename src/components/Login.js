import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials,setCredentials] = useState({email : "",password: ""});

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login";

        const data = {
            email : credentials.email,
            password : credentials.password
        }

        const response = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data), 
          });

          const json = await response.json();
          if(json.success){
            // Save the token in local storage and redirect
            localStorage.setItem('token',json.authtoken);
            props.alert("Logged in successfully","success");
            navigate('/');
          }else{
            props.alert("Invaid Credentials","danger");
          }
        
        }
    

    const onChange = (event) =>{
        setCredentials({...credentials,[event.target.name]: event.target.value});
    }

  return (
    <div className="container">
        <h2>Login to access your account</h2>
        <form onSubmit={handleSubmit}> 
            <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1" className='my-1'>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
            
            </div>
            <div className="form-group my-3">
            <label htmlFor="exampleInputPassword1" className='my-1'>Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} placeholder="Password"/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Login
