import React, {useEffect, useState, useContext} from 'react';
import {useLocation} from 'react-router';
import { Context } from '../../context/Context';
import axios from 'axios';
import {
    Navbar,
    LeftContent,
    RightContent,
    EditPost,
    PostList,
    EditCategory,
} from "../../components";

const SharedCategoryPage = () => {
    const { user } = useContext(Context);
    const [modal, setModal] = useState(false);
    const location = useLocation();
    const [name, setPostName] = useState('');
    const [desc, setDesc] = useState('');
    const cid = location.pathname.split("/")[3];
    const [cate, setCate] = useState([]);
    const headerData = {
        headers: {
            'content-type' : 'application/json',
            'access-token' : user.headers["access-token"],
            'uid'          : user.headers.uid,
            'client'       : user.headers.client
        }
    };

    useEffect(() => {
        const fetchCate = async() => {
          const res = await axios.get(`https://dev.thanqminh.com:3001/shared`, headerData);
          setCate(res.data.find(e => String(e.id) === cid));
        }
        fetchCate();
    }, []);
    console.log(cate);

    const onClickDelete = async(e) => {
        e.preventDefault();
        try {
            if (window.confirm("Confirm delete Category?")){
                await axios.delete(`https://dev.thanqminh.com:3001/task_lists/${cid}`, headerData);
                alert("Delete Success!");
                window.location.href("/");
            }
        } catch (error) {
            alert("Cannot delete Category!");
        }
    }

    const onClickAdd = async(e) => {
        e.preventDefault();
        const newPost = {
            "name": name,
            "description": desc
        }
        //console.log(headerData);
        try {
            await axios.post(`https://dev.thanqminh.com:3001/task_lists/${cid}/todos`, newPost, headerData);
            alert("Created Post!");
            window.location.reload();
        } catch (error) {
            alert("Cannot create post! Something is wrong I can feel it");
        }
    }

    return (
        <div className="login-header">
            <Navbar/>
            <div className="flex flex-col p-10">
                <div className="flex flex-row space-x-8">
                    <div className="flex flex-col w-5/6 space-y-10">
                        <div className="flex flex-row space-x-2 items-center justify-between">
                            <div className="flex flex-col space-y-2 items-center">
                                <h1 className="text-4xl self-start flex-wrap text-left font-semibold">Category: {cate.name}</h1>
                                <p>Description: {cate.description}</p>
                            </div>
                            {cate.is_write ?
                            <div className="flex flex-col">
                                {/* <h1>Owner: {owner.email}</h1> */}
                                <div className="flex flex-row space-x-4">
                                    <button className="font-medium text-white dark:text-white hover:underline" onClick={()=>setModal(true)}>Add</button>
                                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={onClickDelete}>Delete</button>
                                </div>
                            </div> : 
                            <h1>This is read-only!</h1>}
                        </div>
                        <PostList id={cid} enableEdit={cate.is_write} shared={true}/>
                        {modal ? (
                            <>
                            <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-xl">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                                        <div className="flex p-5 border-b border-solid border-slate-200 rounded-t justify-between">
                                            <h3 className="bg-transparent text-3xl block font-semibold">
                                                Create Post
                                            </h3>
                                            <button className="px-3 pb-2 bg-transparent border-0 text-white float-right leading-none font-semibold outline-white hover:bg-slate-200 hover:text-slate-800 rounded-xl" onClick={() => setModal(false)}>
                                                <span className="bg-transparent text-3xl block">
                                                    ×
                                                </span>
                                            </button>
                                            
                                        </div>
                                        
                                        <div className="flex flex-col p-6 space-y-6">

                                            <input type="text" placeholder="Title..." className="p-2 text-lg w-full relative rounded-lg text-black" onChange={e => setPostName(e.target.value)}/>

                                            <textarea placeholder="Type here..." title="userdesc" rows="4" cols="50" className="text-black p-2 rounded-lg w-full font-normal" onChange={e => setDesc(e.target.value)}></textarea>

                                            <div className="flex flex-row justify-between">
                                                <div className="basis-2/3"></div>
                                                <button className="flex-1 w-1/3 bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400 self-right" onClick={onClickAdd}>Publish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </div>
                    <RightContent/>
                </div>
            </div>
        </div>
    )
}

export default SharedCategoryPage