import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    EditCategory,
  } from "..";
import { Context } from "../../context/Context";

const SharedCategory = () => {
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
        const res = await axios.get("https://dev.thanqminh.com:3001/shared", headerData);
        setCate(res.data);
        }
        fetchCategory();
        
    }, []);

    return (
        <div className="flex flex-row overflow-x-scroll space-x-5 p-3">
            {category.map((i) =>
            <a className="relative cursor-pointer rounded-xl bg-white shadow-lg hover:shadow-xl w-1/2" href={`/#/category/shared/${i.id}`}>
                <div className="relative flex items-end overflow-hidden rounded-xl">
                    <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" alt="wallpaper"/>
                </div>
        
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-80">
                    <h3 className="text-xl text-white font-bold">
                        {i.name}</h3>
                    <p className="mt-2 text-sm text-gray-300">{i.description}</p>
                </div>
            </a>
            )}
        </div>
    )
}

export default SharedCategory