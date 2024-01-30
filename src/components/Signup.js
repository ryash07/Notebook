import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials,setCredentials] = useState({name:"" , email:"" , password:"" , cpassword:""});

    const navigate = useNavigate();

    const onChange =(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const url = "http://localhost:5000/api/auth/createuser";

        const data = {
            name: credentials.name,
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
            props.alert("Account created successfully","success");
            navigate('/login');
          }else{
            props.alert("Invalid credentials","danger");
          }
          
    }

  return (
    <div className='container'>
        <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' />
        </div>

        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} name='cpassword' onChange={onChange}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
