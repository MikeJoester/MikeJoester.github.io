import React, { useState, useContext } from 'react';
import {Context} from '../../context/Context';
import axios from 'axios';

const WriteButton = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [name, setPostName] = useState('');
  const [desc, setDesc] = useState('');
  const { user } = useContext(Context);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const headerData = {
        headers: {
            'content-type' : 'application/json',
            'access-token' : user.headers["access-token"],
            'uid'          : user.headers.uid,
            'client'       : user.headers.client
        }
    };
    const newCate = {
        "name": name,
        "description": desc
    }
    //console.log(headerData);
    try {
        const res = await axios.post("http://dev.thanqminh.com:3000/task_lists", newCate, headerData);
    } catch (error) {
        alert("Cannot create category! Something is wrong I can feel it");
    }
  }
  return (
    <>
    <button
        className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        type="button"
        onClick={() => setShowWriteModal(true)}
      >
        New Category
    </button>

    {showWriteModal ? (
        <>
        <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                    <div className="flex p-5 border-b border-solid border-slate-200 rounded-t justify-between">
                        <h3 className="bg-transparent text-3xl block font-semibold">
                            Create new Category
                        </h3>
                        <button className="px-3 pb-2 bg-transparent border-0 text-white float-right leading-none font-semibold outline-white hover:bg-slate-200 hover:text-slate-800 rounded-xl" onClick={() => setShowWriteModal(false)}>
                            <span className="bg-transparent text-3xl block">
                                ×
                            </span>
                        </button>
                        
                    </div>
                    
                    <div className="flex flex-col p-6 space-y-5">
                        <input type="text" placeholder="Title..." className="p-2 text-lg w-full relative rounded-lg text-black" onChange={e => setPostName(e.target.value)}/>
                        {/* <button className="w-2/5 bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400 flex flex-row space-x-3">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 11h-6v10h20v-10h-6v-2h8v14h-24v-14h8v2zm-1-4l5-6 5 6h-4v11h-2v-11h-4z" fill="white" className="pr-2"/></svg>
                            <p>Upload Image</p>
                        </button> */}

                        <textarea placeholder="Type here..." title="userdesc" rows="4" cols="50" className="text-black p-2 rounded-lg w-full font-normal" onChange={e => setDesc(e.target.value)}></textarea>

                        <div className="flex flex-row justify-between">
                            <div className="basis-2/3"></div>
                            <button className="flex-1 w-1/3 bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400 self-right" onClick={handleSubmit}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null}
    </>
  )
}

export default WriteButton