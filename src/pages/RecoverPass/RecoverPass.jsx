import React from 'react';
import { Navigate } from "react-router-dom";

const RecoverPass = () => {
  return (
    <div class="login-main-header relative">
        <div class="flex flex-row bg-black/60 w-1/3 log-box">
          <div class="flex flex-col justify-between px-10 my-5 w-full">
            <h1 class="text-5xl font-bold mt-10 self-start">BlogName</h1>
            
            <div class="w-full">
              <div class="flex flex-col space-y-5">
                <div class="flex flex-col space-y-2 self-center w-full">
                    <h1 class="flex-1 self-center text-justify tracking-wide text-3xl text-slate-100 font-bold">RECOVER YOUR PASSWORD</h1>
                    <h1 class="flex-1 text-center text-sm self-center text-slate-100">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</h1>
                </div>
                <div class="text-lg flex flex-col justify-start space-y-2">
                  <p class="self-start text-base mb-1 font-semibold">Registered Email:</p>
                  <input title="username" type="text" class="text-black px-2 py-1 rounded-md"/>
                </div>
  
                <button type="submit" title="login" 
                class="bg-slate-400 rounded-md py-2 font-bold text-lg ease-in-out duration-300 hover:bg-slate-500" 
                onClick={() => {
                    alert('Recovery Email Sent!');
                    window.location.href="/";
                }}
                >Recover Now</button>
                <div class="flex flex-col text-base w-full space-y-3">
                  <a title="." href="" class="font-semibold text-red-400 hover:underline"></a>
                </div>
              </div>
            </div>
  
            <p class="text-base self-center"><a title="." href="/#/register" target="" class="text-cyan-400 hover:underline"></a></p>
          </div>
        </div>
    </div>
  )
}

export default RecoverPass;