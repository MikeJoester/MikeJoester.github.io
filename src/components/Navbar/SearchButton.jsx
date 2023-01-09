import React, {useContext, useState} from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const SearchButton = () =>{
  const [showModal, setShowModal] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const {user} = useContext(Context);

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
    setShowResult(true);
  }
  
  const onKeySearch = async(e) => {
    if (e.key === "Enter") {
        const res = await axios.get(`http://dev.thanqminh.com:3000/search/${searchVal}`, headerData);
        setResult(res.data);
        setShowResult(true);
    }
  }

  return (
    <>
      <button
        className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Search
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
                    Search for anything!
                  </h3>
                  <button
                    className="px-3 pb-2 bg-transparent border-0 text-white float-right leading-none font-semibold outline-white hover:bg-slate-200 hover:text-slate-800 rounded-xl"
                    onClick={() => {
                      setShowModal(false);
                      setShowResult(false);
                    }}
                  >
                    <span className="bg-transparent text-3xl block">
                      x
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex flex-row">
                    <input type="text" placeholder="Search anything..." className="pl-9 pr-3 py-3 text-lg w-full relative search-icon rounded-l-lg text-black" onChange={(e)=>setSearchVal(e.target.value)} onKeyDown={onKeySearch}/>
            
                    <button className="bg-slate-500 px-5 text-xl rounded-r-lg hover:bg-slate-400" onClick={onClickSearch}> Search </button>
                </div>

                {showResult ?
                <div className="relative flex flex-col">
                  <h1>Result for {searchVal}</h1>
                  <div className="flex flex-row overflow-x-scroll space-x-5 p-10">
                  
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
                 
                : null}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default SearchButton;