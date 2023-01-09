import React, {useContext, useState, useEffect} from 'react';
import {useLocation} from 'react-router';
import {Context} from '../../context/Context';
import axios from 'axios';
import { images } from '../../constants';

import {
    Navbar,
    LeftContent,
    RightContent,
    EditPost,
} from "../../components";

const Post = () => {
    const location = useLocation();
    const cid = location.pathname.split("/")[2];
    const pid = location.pathname.split("/")[3];
    const [like, setLike] = useState();
    const [date, setDate] = useState("");
    const [post, setPost] = useState([]);
    const [cate, setCate] = useState([]);
    const [postExists, setBool] = useState(true);
    const {user} = useContext(Context);
    const headerData = {
        headers: {
            'content-type' : 'application/json',
            'access-token' : user.headers["access-token"],
            'uid'          : user.headers.uid,
            'client'       : user.headers.client
        }
    };

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const res = await axios.get(`http://dev.thanqminh.com:3000/task_lists/${cid}/todos/${pid}`, headerData);
                const category = await axios.get("http://dev.thanqminh.com:3000/task_lists", headerData);
                setPost(res.data);
                setDate(res.data.created_at);
                if (res.data.done === null) {
                    // console.log(res.data.done);
                    setLike(false);
                }
                setLike(res.data.done);
                setCate(category.data);
            } catch (error) {
                setBool(false);
            }
        }
        fetchPost();
    }, [pid]);

    const onClickSetLike = async(e) => {
        e.preventDefault();
        post.done = !like;
        setLike(!like);
        const resp = await axios.patch(`http://dev.thanqminh.com:3000/task_lists/${cid}/todos/${pid}`, post, headerData);
        // console.log(resp.data.done);
    }

    const onClickDelete = async(e) => {
        e.preventDefault();
        if (window.confirm("Confirm delete?")) {
            const res = await axios.delete(`http://dev.thanqminh.com:3000/task_lists/${cid}/todos/${pid}`, headerData);
            alert("Delete complete");
            window.location.replace("/home");
        }
    }

    const author = user.data.data.name;

    return (
        <div className="login-header">
            <Navbar/>
            <div className="flex flex-col p-10">
                <div className="flex flex-row space-x-8">
                    {postExists ? 
                        <div className="basis-2/3 flex flex-col text-left space-y-3">
                        <h1 className="text-6xl">{post.name}</h1>
                        <div className="flex flex-row justify-between text-xl">
                            <div className="flex flex-row space-x-5">
                                <div className="flex flex-row space-x-1">
                                    <h1>Author: </h1>
                                    <h1 key={author} className="font-semibold text-yellow-400 cursor-pointer"><a href="/user">{author}</a></h1>
                                </div>
                                <div className="flex flex-row space-x-1 items-center">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" className="ml-1"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z" fill="#fff"/></svg>
                                    <h1 key={date}>{date.split('T')[0]}</h1>
                                </div>
                            </div>

                            <div className="flex flex-row space-x-4">
                                <button onClick={onClickSetLike}>
                                    {like ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" fill="red"/></svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="bg-red"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" fill="red"/></svg>}
                                </button>

                                <EditPost info={post}/>

                                <button onClick={onClickDelete}>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" fill="white"/></svg>
                                </button>
                            </div>
                            
                        </div>
                        <img className="py-3" src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
                        <p className="text-justify text-lg">{post.description}</p>
                        
                        <div className="flex flex-col pt-10">
                            <h1 className="text-2xl">More from {author}:</h1>
                            <div class="flex flex-row overflow-x-scroll space-x-5 p-3">
                                {cate.map((i) => 
                                <div class="relative cursor-pointer w-full rounded-xl bg-white shadow-lg hover:shadow-xl min-w-1/2">
                                    <div class="relative flex items-end overflow-hidden rounded-xl">
                                        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" alt="wallpaper"/>
                                    </div>
                            
                                    <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-80">
                                        <h3 class="text-xl text-white font-bold">
                                            {i.name}</h3>
                                        <p class="mt-2 text-sm text-gray-300">{i.description}</p>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                        </div>
                    : <div className="basis-2/3 flex flex-col text-left space-y-3">Error 404: Post not exists</div>}

                    <RightContent 
                        title="LATEST POSTS"
                        number="5"
                    />
                </div>
            </div>
        </div>
    )
}

export default Post