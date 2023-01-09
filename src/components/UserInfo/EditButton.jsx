import React, {useContext, useState} from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const EditButton = () =>{
    const {user, dispatch} = useContext(Context);
    const [newUsername, setNewUser] = useState('');
    const [confirmPass, setCP] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    
    const headerData = {
      headers: {
          'content-type' : 'application/json',
          'access-token' : user.headers["access-token"],
          'uid'          : user.headers.uid,
          'client'       : user.headers.client
      }
    };

    const changePass = async(e) => {
      e.preventDefault();
      const newPassword = {
        "password": newPass,
        "password_confirmation": oldPass
      }

      try {
        const result = await axios.patch("http://dev.thanqminh.com:3000/auth/password", newPassword, headerData);
  
        alert("Change Password Success! Please re-login!");
        dispatch({ 
          type: "UPDATE_SUCCESS",
          payload: result
        });

        dispatch({ type: "LOGOUT" });
        window.location.reload();
      }
      catch (error) {
        alert("Error: Wrong confirm password!");
        window.location.reload();
      }
    }

    const changeUserName = async(e) => {
      e.preventDefault();
      const newInfo = {
        "name": newUsername,
        "password" : confirmPass
      }

      try {
        const res = await axios.patch("http://dev.thanqminh.com:3000/auth", newInfo, headerData);
  
        alert("Change Username Success!");
        dispatch({ 
          type: "UPDATE_SUCCESS", 
          payload: res
        });
        window.location.reload();
      }
      catch (error) {
        alert("Error: Wrong confirm password!");
        window.location.reload();
      }
    }

    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <button
          className="bg-slate-400 px-6 rounded-lg hover:bg-slate-500 ease-in-out duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Edit Info
        </button>
        {showModal ? (
          <>
            <div
              className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-xl"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex p-5 border-b border-solid border-slate-200 rounded-t justify-between">
                    <h3 className="text-3xl font-semibold">
                      Edit user information
                    </h3>
                    <button
                      className="px-3 pb-2 bg-transparent border-0 text-white float-right leading-none font-semibold outline-white hover:bg-slate-200 hover:text-slate-800 rounded-xl"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-3xl block">
                        x
                      </span>
                    </button>
                  </div>

                  {/*body*/}
                  <div className="relative p-6 flex flex-row space-x-5">
                      <div className="flex flex-col space-y-3">
                          <h1>Change Username</h1>
                          <input type="text" placeholder="New username..." className="pl-9 pr-3 py-3 text-lg w-full relative Edit-icon rounded-lg text-black" onChange={e => setNewUser(e.target.value)}/>
                          <input type="password" placeholder="Your password..." className="pl-9 pr-3 py-3 text-lg w-full relative Edit-icon rounded-lg text-black" onChange={e => setCP(e.target.value)}/>
              
                          <button className="bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400" onClick={changeUserName}> Save Changes </button>
                      </div>

                      <div className="flex flex-col space-y-3">
                          <h1>Change Password</h1>
                          <input type="password" placeholder="New password..." className="px-6 py-3 text-lg w-full relative Edit-icon rounded-lg text-black" onChange={e => setOldPass(e.target.value)}/>
                          <input type="password" placeholder="Confirm new password..." className="px-6 py-3 text-lg w-full relative Edit-icon rounded-lg text-black" onChange={e => setNewPass(e.target.value)}/>
                          {/* <input type="password" placeholder="Confirm new password..." className="pl-9 pr-3 py-3 text-lg w-full relative Edit-icon rounded-lg text-black" onChange={e => setCP(e.target.value)}/> */}
              
                          <button className="bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400" onClick={changePass}> Save Changes </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
}

export default EditButton;