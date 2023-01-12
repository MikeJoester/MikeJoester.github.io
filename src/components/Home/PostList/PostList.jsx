import React, {useEffect, useState, useContext} from 'react';
import {Context} from '../../../context/Context';
import axios from 'axios';
import {
    EditPost,
} from "../../../components/";

const PostList = (props) => {
    const { user } = useContext(Context);
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
          const res = await axios.get(`https://dev.thanqminh.com:3001/task_lists/${props.id}/todos`, headerData);
          setPosts(res.data);
        }
        fetchPosts();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-5">
            {posts.slice(0, props.limit).map((post) => 
                <div className="flex flex-col">
                    {/* <p>Shared: {String(props.shared)}</p> */}
                    <div className="relative">
                        <img title="img1" src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="object-fill rounded-t-2xl"/>
                        { props.enableEdit ? 
                        <div className="flex flex-row space-x-4 absolute top-0 right-0 bg-slate-400 p-3 rounded-bl-xl">
                            <EditPost info={{
                                ...post,
                                task_list_id : props.id,
                            }}/>
                            <button onClick={async(e)=>{
                                e.preventDefault();
                                try {
                                    await axios.post(`https://dev.thanqminh.com:3001/task_lists/${props.id}/todos/`, post, headerData);
                                    alert("Duplicated!");
                                    window.location.reload();
                                } catch (error) {
                                    alert("Cannot Duplicate!");
                                }
                            }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" fill="white"/></svg></button>
                            <button onClick={async(e) => {
                                e.preventDefault();
                                try {
                                    if (window.confirm("Confirm delete post?")){
                                        await axios.delete(`https://dev.thanqminh.com:3001/task_lists/${props.id}/todos/${post.id}`, headerData);
                                        alert("Post Deleted!");
                                        window.location.reload();
                                    }                                    
                                } catch (error) {
                                    alert("Cannot delete post!");
                                }
                            }}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" fill="white"/></svg></button>
                        </div> : null }
                    </div>
                    <div className="flex flex-row bg-slate-600 rounded-b-2xl">
                        <img title="avatar" src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1092&q=80" className="w-14 h-14 rounded-full object-fill m-3"/>
                        <hr className="w-px h-auto bg-slate-300 my-1"/>
                        <div className="flex flex-col pl-5 pt-1 text-white text-left">
                            <a className="font-semibold hover:text-slate-300" href={props.shared ? ("/#/shared/" + props.id + "/" + post.id) : ("/#/post/" + props.id + "/" + post.id)}>{post.name}</a>
                            {!props.shared ? <a className="text-base text-yellow-400 hover:underline" href="/#/user">{user.data.data.name}</a> : null}
                            {props.shared ? <p className="text-sm text-justify pr-5 overflow-hidden">{post.description}</p> : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostList