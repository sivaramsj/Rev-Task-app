import React, { useContext, useState } from 'react'
import login from '../../images/Mobile login-amico.png'
import { userContext } from '../Context/UserContextComponent';
import "./LoginPage.css"
import api from '../../config/api';
import { json, Link,useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginPage({onLogin}) {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e)=>{
        e.preventDefault();
            const response = api.get(`/employee/login?email=${email}&password=${password}`).then((response)=>{
                if(response.data.status==202){
                    console.log("Login successful");
                    localStorage.setItem("user",JSON.stringify(response.data.data));
                    onLogin();
                    navigate("/home")
                }
                else{
                    toast.error("Invalid Credentials")
                }
            })
            .catch((err)=>{
                toast.error("Invalid Credentials")                
            })
            // console.log(userData);
            
            
            // localStorage.setItem(data,us)
            // setUserDetail(userData);
            // fetchProjects(userData);
            // navigate("/home")
        
        setEmail("");
        setPassword("");
    }

    

    return (

        <div className="login-container">
            <div className="illustration">
                <img src={login} alt="Login Illustration" />
            </div>
            <div className="login-form">
                <h2>Welcome back</h2>
                <p>Welcome back! Please enter your details.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <div className="form-group terms">
                      
                        <Link to="/reset" className='forgot-password'>Forgot Password</Link>
                    </div>
                    <button type="submit" className="login-button">Log in</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
        
    )
}

export default LoginPage