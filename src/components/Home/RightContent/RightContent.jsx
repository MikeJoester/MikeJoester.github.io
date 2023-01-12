import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Context } from '../../../context/Context';

const RightContent = () => {
  const { user } = useContext(Context);
  const [latestList, setLatest] = useState([]);
  const [cateID, setCateID] = useState();
  const headerData = {
    headers: {
        'content-type' : 'application/json',
        'access-token' : user.headers["access-token"],
        'uid'          : user.headers.uid,
        'client'       : user.headers.client
    }
  };

  useEffect(() => {
    const fetchLatestPost = async() => {
      const res = await axios.get("https://dev.thanqminh.com:3001/task_lists", headerData);
      setCateID(res.data[res.data.length - 1].id);
      const response = await axios.get(`https://dev.thanqminh.com:3001/task_lists/${res.data[res.data.length - 1].id}/todos`, headerData);
      setLatest(response.data);
    }
    fetchLatestPost();
    
  }, []);
  //console.log(latestList);
  // {`/post/${cateID}/${i.id}`}
  // console.log(array);

  return (
    <div className="basis-1/3 flex-1 flex-col">
        <div className="flex flex-col space-y-5">
          <h1 className="font-bold self-start text-2xl">LATEST POSTS</h1>
          <div class="flex flex-col space-y-5">
          {latestList.slice(0, 3).map((i)=>
            <div class="flex flex-row bg-slate-600 scale-100 hover:scale-110 ease-in-out duration-150 rounded-xl space-x-2">
            <img title="post-pic" src="https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" class="w-2/5 rounded-l-xl"/>

            <div class="flex flex-col justify-start text-left p-2">
              <a href={`/#/post/${cateID}/${i.id}`}><h1 class="font-bold text-xl">{i.name}</h1></a>
              <div class="flex flex-row space-x-1">
                <p class="text-base">By:</p> 
                <a href="/#/user"><p class="text-base text-yellow-400 font-semibold">{user.data.data.name}</p></a>
              </div>
              <p class="text-sm text-justify pr-5 overflow-hidden">
                {i.description.substring(0, 80)}
              </p>
            </div>
          </div>
          )}
          </div>
        </div>
    </div>
  )
}

export default RightContent