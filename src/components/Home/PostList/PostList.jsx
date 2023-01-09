import React, {useEffect, useState, useContext} from 'react';
import {Context} from '../../../context/Context';
import axios from 'axios';

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
          const res = await axios.get(`http://dev.thanqminh.com:3000/task_lists/${props.id}/todos`, headerData);
          setPosts(res.data);
        }
        fetchPosts();
        
    }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
        {posts.slice(0, 3).map((post) => 
        <a href={"/post/" + props.id + "/" + post.id}>
            <div className="flex flex-col">
                <img title="img1" src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="object-fill rounded-t-2xl"/>
                <div className="flex flex-row bg-slate-600 rounded-b-2xl">
                <img title="avatar" src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1092&q=80" className="w-14 h-14 rounded-full object-fill m-3"/>
                <hr className="w-px h-auto bg-slate-300 my-1"/>
                <div className="flex flex-col pl-5 pt-1 text-white text-left">
                    <h1 className="font-semibold">{post.name}</h1>
                    <h1 className="text-base text-yellow-400">{user.data.data.name}</h1>
                </div>
                </div>
            </div>
        </a>
        )}
    </div>
  )
}

export default PostList