import React, { useState } from 'react';
import "./Register.css";
import axios from 'axios';

const Register = () => {
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setConf] = useState('');
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const fullName = lastName + " " + firstName;
    if (passConf !== password) {
      alert("Confirm password does not match!");
    }
    else {
      try {
        const res = await axios.post("https://dev.thanqminh.com:3001/auth", {
          fullName,
          email,
          password,
        });
        if (res.data) {
          alert("Register Success!");
          window.location.replace("/");
        }
      } catch (error) {
        alert("Email already exists!");
      }
    }
    // console.log(res.data);
  }

  return (
  <div class="login-main-header">
    <div class="flex flex-row bg-black/60 w-1/3 log-box">
      <div class="flex flex-col justify-between px-10 my-5 w-full">
        <h1 class="text-5xl font-bold mt-10 self-start">BlogName</h1>
        
        <form class="w-full" onSubmit={handleSubmit}>
          <div class="flex flex-col space-y-5">
            <h1 class="self-center text-3xl text-slate-100">Register Now!</h1>
            <div class="text-lg flex flex-row justify-between space-x-3 overflow-hidden">
              <div class="text-lg flex flex-col justify-start w-1/2">
                <p class="self-start text-base mb-1">First Name:</p>
                <input title="firstname" type="text" class="text-black px-2 py-1" onChange={e=>setFname(e.target.value)}/>
              </div>

              <div class="text-lg flex flex-col justify-start w-1/2">
                <p class="self-start text-base mb-1">Last Name:</p>
                <input title="lastname" type="text" class="text-black px-2 py-1" onChange={e=>setLname(e.target.value)}/>
              </div>
            </div>

            <div class="text-lg flex flex-col justify-start">
              <p class="self-start text-base mb-1">Your Email:</p>
              <input title="username/mail" type="text" class="text-black px-2 py-1" onChange={e => setEmail(e.target.value)}/>
            </div>

            <div class="text-lg flex flex-row justify-between space-x-3 overflow-hidden">
              <div class="text-lg flex flex-col justify-start w-1/2">
                <p class="self-start text-base mb-1">Password:</p>
                <input title="password" type="password" class="text-black px-2 py-1" onChange={e => setPassword(e.target.value)}/>
              </div>

              <div class="text-lg flex flex-col justify-start w-1/2">
                <p class="self-start text-base mb-1">Confirm Password:</p>
                <input title="confirmpass" type="password" class="text-black px-2 py-1" onChange={e => setConf(e.target.value)}/>
              </div>
            </div>

            <div class="flex flex-row text-sm space-x-1">
              <input title="checkbox" type="checkbox"defaultChecked={true}/>
              <p>I have agree to the <a href="/" class="text-cyan-400 hover:underline">Terms and Conditions</a></p>
            </div>
            <button type="submit" class="bg-slate-400 rounded-md py-2 font-bold text-lg ease-in-out duration-300 hover:bg-slate-500 hover:">Register</button>
          </div>
        </form>

        <p class="text-base self-center">Already a user of this blog? <a href="/" class="text-cyan-400 hover:underline">Log In</a></p>
      </div>
    </div>
  </div>
  )
}

export default Register;