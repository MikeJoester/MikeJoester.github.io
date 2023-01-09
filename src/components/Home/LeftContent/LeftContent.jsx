import React, {useContext, useState, useEffect} from "react";
import { Context } from "../../../context/Context";
import axios from "axios";

const LeftContent = ({props}) => {
  const arr = props;
  const {user} = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [result, setResult] = useState();
  const headerData = {
    headers: {
        'content-type' : 'application/json',
        'access-token' : user.headers["access-token"],
        'uid'          : user.headers.uid,
        'client'       : user.headers.client
    }
  };

  const onClickSearch = async(e) => {
    e.preventDefault();
    const res = await axios.get(`http://dev.thanqminh.com:3000/search/${searchVal}`, headerData);
    setResult(res.data);
    setShowModal(true);
  }
  
  const onKeySearch = async(e) => {
    if (e.key === "Enter") {
        const res = await axios.get(`http://dev.thanqminh.com:3000/search/${searchVal}`, headerData);
        setResult(res.data);
        setShowModal(true);
    }
  }
  console.log(result);
  
  return (
    <div className="basis-2/3 flex flex-col w-1/2 space-y-10 justify-items-between">
        <h1 className="text-7xl self-start flex-wrap text-left">WELCOME TO THE BLOG</h1>

        <div className="flex flex-row space-x-2">
            <input type="text" placeholder="Search anything..." className="pl-9 pr-3 py-3 text-lg w-full relative search-icon text-black rounded-l-lg" onChange={(e)=>setSearchVal(e.target.value)} onKeyDown={onKeySearch}/>
            
            <button className="bg-slate-400 px-5 text-xl rounded-r-lg" onClick={onClickSearch}> Search </button>
        </div>

        <div className="flex flex-col space-y-2">

            <h1 className="self-start">BROWSE CATEGORIES</h1>

            <div className="flex flex-row overflow-x-scroll space-x-5 p-3">
                {arr.map((i) => 
                <div className="relative cursor-pointer w-full rounded-xl bg-white shadow-lg hover:shadow-xl min-w-1/2">
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" alt="wallpaper"/>
                    </div>
            
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-80">
                        <h3 className="text-xl text-white font-bold">
                            {i.name}</h3>
                        <p className="mt-2 text-sm text-gray-300">{i.description}</p>
                    </div>
                </div>
                )}
            </div>
        </div>
        {showModal ? (
            <>
                <div
                    className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-xl"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex p-5 border-b border-solid border-slate-200 rounded-t justify-between">
                            <h3 className="text-3xl font-semibold">
                                {`Search result for ${searchVal}:`}
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

                            <div className="relative flex flex-row overflow-x-scroll space-x-5 p-10">
                                {result.length > 0 ? 
                                    result.map((i) =>
                                    <a className="relative cursor-pointer w-full rounded-xl bg-white shadow-lg hover:shadow-xl min-w-1/2" href={"/post/" + i.task_list_id + "/" + i.id} target="_blank">
                                        <div className="relative flex items-end overflow-hidden rounded-xl">
                                            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="wallpaper"/>
                                        </div>
                                
                                        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-80">
                                            <h3 className="text-xl text-white font-bold">
                                                {i.name}</h3>
                                            <p className="mt-2 text-sm text-gray-300">{i.description.substring(0, 25)}</p>
                                        </div>
                                    </a>
                                    ) 
                                    : <h1 className="w-full font-normal text-6xl">Result not found!</h1>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}   
    </div>
  )
}

export default LeftContent