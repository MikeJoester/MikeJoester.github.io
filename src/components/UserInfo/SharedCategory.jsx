import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    EditCategory,
  } from "..";
import { Context } from "../../context/Context";

const SharedCategory = (props) => {
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
        const res = await axios.get("http://dev.thanqminh.com:3000/task_lists", headerData);
        setCate(res.data);
        }
        fetchCategory();
        
    }, []);

    return (
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-left text-gray-500 dark:text-gray-400">
                <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Category Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Total Posts
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Total Likes
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Shares
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody class="text-base">
                    {category.map((i, index) => 
                        <tr className={index % 2 === 0 ? "dark:bg-gray-800 bg-white border-b dark:border-gray-700 hover:bg-slate-600" : "dark:bg-gray-900 bg-white border-b dark:border-gray-700 hover:bg-slate-600"}>
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {i.name}
                        </th>
                        <td className="py-4 px-6">
                            {i.todo_count}
                        </td>
                        <td className="py-4 px-6">
                            {i.done_count}
                        </td>
                        <td className="py-4 px-6">
                            {i.share_count}
                        </td>
                        <td className="py-4 px-6">
                            <EditCategory info={i}/>
                        </td>
                    </tr>    
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SharedCategory