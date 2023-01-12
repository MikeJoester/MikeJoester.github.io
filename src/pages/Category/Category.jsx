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

const Category = () => {
    const { user } = useContext(Context);
    const [modal, setModal] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const location = useLocation();
    const [cmodal, setCmodal] = useState(false);
    const [name, setPostName] = useState('');
    const [mail, setMail] = useState('');
    const [perm, setPerm] = useState(false);
    const [desc, setDesc] = useState('');
    const [colabs, setColabs] = useState();
    const cid = location.pathname.split("/")[2];
    console.log(cid);
    const [posts, setPosts] = useState([]);
    const headerData = {
        headers: {
            'content-type' : 'application/json',
            'access-token' : user.headers["access-token"],
            'uid'          : user.headers.uid,
            'client'       : user.headers.client
        }
    };

    useEffect(() => {
        const fetchPosts = async() => {
            const res = await axios.get(`https://dev.thanqminh.com:3001/task_lists/${cid}`, headerData);
            const users = await axios.get(`https://dev.thanqminh.com:3001/task_lists/${cid}/share`, headerData);
            const getUser = await axios.get("https://dev.thanqminh.com:3001/users", headerData);
            setPosts(res.data);
            setColabs(users.data.map(i => { 
                return {
                    mail : (getUser.data.find(e => e.id === i.user_id).email),
                    id : (i.task_list_id),
                    uid : i.user_id,
                    perm : (i.is_write)
                };
            }))
        }
        fetchPosts();
        
    }, []);

    // console.log(colabs);

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

    const onClickShare = async(e) => {
        const res = await axios.get("https://dev.thanqminh.com:3001/users", headerData);
        if (res.data.find(e => e.email === mail)) {
            const shareData = {
                "user_id" : res.data.find(e => e.email === mail).id,
                "task_list_id" : cid,
                "is_write" : perm
            }
            try {
                await axios.post(`https://dev.thanqminh.com:3001/task_lists/${cid}/share`, shareData, headerData);
                alert("Share success!");
            } catch (error) {
                alert("Cannot share. Please try again!");
            }
        }
        else {
            alert("No valid email found!");
        }
    }

    return (
        <div className="login-header">
            <Navbar/>
            <div className="flex flex-col p-10">
                <div className="flex flex-row space-x-8">
                    <div className="flex flex-col w-5/6 space-y-10">
                        <div className="flex flex-col items-left justify-between space-y-3">
                            <div className="flex flex-row items-center justify-between">
                                <h1 className="text-4xl self-start flex-wrap text-left font-semibold">Category: {posts.name}</h1>
                                <button className="border-2 border-slate-300 px-3 py-1 rounded-xl hover:bg-slate-300 hover:text-black" onClick={()=>setCmodal(true)}>View collaborators</button>
                            </div>
                            <div className="flex flex-row space-x-4 justify-between">
                                <p>Description: {posts.description}</p>
                                <div className="flex flex-row space-x-4 justify-between">
                                    <EditCategory info={posts}/>
                                    <button className="font-medium text-white dark:text-white hover:underline" onClick={()=>setModal(true)}>Add</button>
                                    <button className="font-medium text-yellow-400 dark:text-yellow-400 hover:underline" onClick={()=>setShareModal(true)}>Share</button>
                                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={onClickDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <PostList id={cid} enableEdit={true} shared={false}/>
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
                        {shareModal ? (
                            <>
                            <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-xl">
                                <div className="relative my-6 mx-auto max-w-3xl w-1/3">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                                        <div className="flex p-5 border-b border-solid border-slate-200 rounded-t justify-between">
                                            <h3 className="bg-transparent text-3xl block font-semibold">
                                                Share to:
                                            </h3>
                                            <button className="px-3 pb-2 bg-transparent border-0 text-white float-right leading-none font-semibold outline-white hover:bg-slate-200 hover:text-slate-800 rounded-xl" onClick={() => setShareModal(false)}>
                                                <span className="bg-transparent text-3xl block">
                                                    ×
                                                </span>
                                            </button>
                                            
                                        </div>
                                        
                                        <div className="flex flex-col p-6 space-y-6 w-full">

                                            <input type="text" placeholder="Type in email..." className="p-2 text-lg w-full relative rounded-lg text-black" onChange={e => setMail(e.target.value)}/>

                                            <div className="flex flex-row space-x-4">
                                                <label for="categories" className="text-left font-normal w-2/3">Choose Permission:</label>
                                                <select 
                                                    id="categories"
                                                    onChange={(e)=>setPerm(e.target.value)}
                                                    className="w-2/3 rounded-none text-black font-normal px-3"
                                                >
                                                    <option value="" selected disabled hidden>Choose...</option>
                                                    <option value={false}>Read-only</option>
                                                    <option value={true}>Edit</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-row justify-between">
                                                <div className="basis-2/3"></div>
                                                <button className="flex-1 bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400 self-right" onClick={onClickShare}>Share</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                        {cmodal ? (
                            <>
                            <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-xl">
                                <div className="relative my-6 mx-auto max-w-3xl w-1/2">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                                        <div className="flex p-5 border-b border-solid border-slate-200 rounded-t justify-between">
                                            <h3 className="bg-transparent text-3xl block font-semibold">
                                                Collaborators
                                            </h3>
                                            <button className="px-3 pb-2 bg-transparent border-0 text-white float-right leading-none font-semibold outline-white hover:bg-slate-200 hover:text-slate-800 rounded-xl" onClick={() => setCmodal(false)}>
                                                <span className="bg-transparent text-3xl block">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        
                                        <div className="flex flex-col p-6 space-y-6 w-full">

                                            {/* <input type="text" placeholder="Type in email..." className="p-2 text-lg w-full relative rounded-lg text-black" onChange={e => setMail(e.target.value)}/> */}

                                            {colabs.map(el => 
                                            <div className="flex flex-row space-x-4 border-2 px-3 py-2 border-slate-300 rounded-xl">
                                                <label for="categories" className="text-left font-normal w-2/3">{el.mail}</label>
                                                <select
                                                    id="categories"
                                                    onChange={(e)=>{
                                                        el.perm = e.target.value;
                                                        // console.log(el.perm)
                                                    }}
                                                    defaultValue={el.perm}
                                                    className="w-1/3 rounded-lg text-black text-lg px-3"
                                                >
                                                    <option value="" selected disabled hidden>Permission...</option>
                                                    <option value={false}>Read-only</option>
                                                    <option value={true}>Edit</option>
                                                </select>

                                                <button className="flex-1 bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400 self-right" onClick={
                                                async(e)=> {
                                                    // console.log(el.perm);
                                                    const permission = {
                                                        "user_id": el.uid,
                                                        "task_list_id": el.id,
                                                        "is_write": el.perm
                                                    }
                                                    e.preventDefault();
                                                    try {
                                                        await axios.put(`https://dev.thanqminh.com:3001/task_lists/${el.id}/share/${el.uid}`, permission, headerData);
                                                        alert("Save Success!");
                                                        setCmodal(false);
                                                    } catch (error) {
                                                        alert("Cannot save");
                                                    }
                                                    
                                                }
                                                }>Save</button>
                                            </div>
                                            
                                            )}
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

export default Category