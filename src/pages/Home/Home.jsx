import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../../context/Context';

import {
    Navbar,
    LeftContent,
    RightContent,
    PostList,
} from "../../components/";

import {
  images,
} from "../../constants/";

import "./Home.css";

const Home = () => {
  const [category, setCate] = useState([]);
  const { user } = useContext(Context);
  const headerData = {
    headers: {
        'content-type' : 'application/json',
        'access-token' : user.headers["access-token"],
        'uid'          : user.headers.uid,
        'client'       : user.headers.client
    }
  };

  useEffect(() => {
    const fetchCategory = async() => {
      const res = await axios.get("https://dev.thanqminh.com:3001/task_lists", headerData);
      setCate(res.data);
    }
    fetchCategory();
    
  }, []);

  return (
    <div class="login-header">
        <Navbar/>
        <div class="flex flex-col px-10 pb-10 pt-32 space-y-10">
          <div class="flex flex-row w-full space-x-8">
            <LeftContent props={category}/>
            <RightContent/>
          </div>
        
        {category.map((i) =>
        <div>
          <details className="flex flex-col w-full space-y-4 group" open>
            <summary className="items-center flex flex-row justify-between">
              <h1 className="text-4xl self-start flex-wrap text-left font-semibold">{i.name}</h1>
              <div className="flex flex-row space-x-2 items-center cursor-pointer">
                <h1>Expand</h1>
                <img title="arrow" src={images.arrow} className="w-8 h-8 group-open:rotate-180 transition-transform origin-center"/>
              </div>
            </summary>
            <PostList id={i.id} limit={3} enableEdit={false}/>
          </details>
          <br/>
          <hr/> 
          </div>
        )}
        </div>
    </div>
  )
}

export default Home;