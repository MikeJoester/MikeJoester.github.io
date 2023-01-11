import React, { useState, useContext} from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch, isFetching } = useContext(Context);

  const handleClick = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://dev.thanqminh.com:3001/auth/sign_in", {
        email, 
        password
      });
      
      dispatch({ 
        type: "LOGIN_SUCCESS", 
        payload: res
      });

      alert("Login Success!");
      window.location.reload();
    }
    catch (error) {
      dispatch({type: "LOGIN_FAILURE"});
      alert("Login Error: Wrong email or password!");
      window.location.reload();
    }
  };

  return (
    <div className="login-main-header">
        <div className="flex flex-row bg-black/60 w-1/3 log-box">
          <div className="flex flex-col justify-between px-10 my-5 w-full">
            <h1 className="text-5xl font-bold mt-10 self-start">BlogName</h1>
            
            <form className="w-full">
              <div className="flex flex-col space-y-5">
                <h1 className="self-center text-3xl text-slate-100 font-bold">LOGIN</h1>
                <div className="text-lg flex flex-col justify-start">
                  <p className="self-start text-base mb-1">Your Email:</p>
                  <input title="username" type="text" className="text-black px-2 py-1" onChange={e => setEmail(e.target.value)}/>
                </div>
  
                <div className="text-lg flex flex-col justify-start">
                  <p className="self-start text-base mb-1">Password:</p>
                  <input autoComplete='on' title="password" type="password" className="text-black pl-2 py-1 border-2 border-solid" onChange={e => setPassword(e.target.value)}/>
                </div>
  
                <button title="login" className="bg-slate-400 rounded-md py-2 font-bold text-lg ease-in-out duration-300 hover:bg-slate-500" onClick={handleClick} disabled={isFetching}>Log in</button>
                <div className="flex flex-col text-base w-full space-y-3">
                  <a href="/recover" className="font-semibold text-red-400 hover:underline">Forgot Password?</a>
                </div>
              </div>
            </form>
  
            <p className="text-base self-center">New to this blog? <a href="/register" target="" className="text-cyan-400 hover:underline">Register Here</a></p>
          </div>
        </div>
    </div>
  )
}

export default Login;