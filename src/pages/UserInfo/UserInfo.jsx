import React, { useContext } from 'react';
import { Context } from "../../context/Context";
import {
  Navbar,
  UserData,
  EditButton,
} from "../../components/";

import "./UserInfo.css";

const UserInfo = () => {
  const { user, dispatch} = useContext(Context);
  const userData = user.data.data;
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }
  
  return (
    <div className="login-header">
      <Navbar/>
      <div className="flex flex-col p-20 text-left space-y-10">
        <div className="flex flex-row space-x-10">
          <div className="flex-initial flex-col content-center space-y-10">
            <div className="w-96 h-96 bg-center profile-img rounded-lg"></div>
            <button className="bg-slate-400 w-96 rounded-lg hover:bg-slate-500 ease-in-out duration-150 text-3xl py-2">Change Avatar</button>
          </div>
          
          <div className="flex-1 content-between space-y-10">
            <h1 className="inline border-t-2 border-b-2 text-4xl font-semibold w-1/5 pt-1 py-2">ABOUT ME</h1>

            <div className="flex flex-row space-x-5">
              <div className="flex flex-row space-x-2">
                <h1>Email: </h1>
                <input type="text" value={userData.email} className="rounded-lg text-black py-1 px-2 text-xl"/>
              </div>

              <div className="flex flex-row space-x-2">
                <h1>Username: </h1>
                <input type="text" value={userData.name} className="rounded-lg text-black py-1 px-2 text-2xl"/>
              </div>
              {/* <button className="bg-slate-400 px-2 rounded-lg hover:bg-slate-500 ease-in-out duration-150">Edit Info</button> */}
              <EditButton/>
            </div>

            <div className="flex flex-col space-y-1">
              <textarea rows="4" cols="50" className="text-black p-2 rounded-lg w-auto">
                User description here...
              </textarea>
            </div>

            <div className="flex flex-row justify-between">
              <button className="bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700 ease-in-out duration-150" onClick={handleLogout}>Log Out</button>
              <button className="bg-slate-400 rounded-lg px-3 py-1 flex flex-row items-center hover:bg-slate-500 ease-in-out duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" fill="white"/></svg>
                <h1 className="pl-3">Edit Description</h1>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-5">
          <h1 className="text-4xl font-semibold">CATEGORY LIST</h1>
          <UserData/>
        </div>
      </div>
    </div>
  )
}

export default UserInfo