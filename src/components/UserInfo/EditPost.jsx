import React, {useContext, useState} from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { images } from '../../constants';

const EditPost = (props) => {
  const [showEdit, setEdit] = useState(false);
  const {user} = useContext(Context);
  const [postName, setPostName] = useState(props.info.name);
  const [postDesc, setPostDesc] = useState(props.info.description);
  // console.log(props.info);
    
  const headerData = {
    headers: {
        'content-type' : 'application/json',
        'access-token' : user.headers["access-token"],
        'uid'          : user.headers.uid,
        'client'       : user.headers.client
    }
  };

  const onClickSave = async(e) => {
    e.preventDefault();
    props.info.name = postName;
    props.info.description = postDesc;
    try {
      const res = await axios.patch(`http://dev.thanqminh.com:3000/task_lists/${props.info.task_list_id}/todos/${props.info.id}`, props.info, headerData);
      console.log(res.data);
      
      alert("Edit Success!");
      window.location.reload();
    } catch (error) {
      console.log(props.info);
      alert("Edit failed!");
    }
  }

  return (
    <>
      <button 
        type="button"
        onClick={() => setEdit(true)}
      >
        <img src={images.edit}/>
      </button>
      {showEdit ? (
          <>
             <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                    <div className="flex p-5 border-b border-solid border-slate-200 rounded-t justify-between">
                        <h3 className="bg-transparent text-3xl block font-semibold">
                            Edit Post
                        </h3>
                        <button className="px-3 pb-2 bg-transparent border-0 text-white float-right leading-none font-semibold outline-white hover:bg-slate-200 hover:text-slate-800 rounded-xl" onClick={() => setEdit(false)}>
                            <span className="bg-transparent text-3xl block">
                                ×
                            </span>
                        </button>
                        
                    </div>
                    
                    <div className="flex flex-col p-6 space-y-6">
                        <input
                        defaultValue={props.info.name}
                        type="text"
                        placeholder="Title..." 
                        className="p-2 text-lg w-full relative rounded-lg text-black" 
                        onChange={e => setPostName(e.target.value)}/>

                        <textarea
                        defaultValue={props.info.description}
                        placeholder="Type here..." title="userdesc" rows="4" cols="50" className="text-black p-2 rounded-lg w-full font-normal" onChange={e => setPostDesc(e.target.value)}></textarea>

                        <div className="flex flex-row justify-between">
                            <div className="basis-2/3"></div>
                            <button className="flex-1 w-1/3 bg-slate-500 px-5 py-2 text-xl rounded-lg hover:bg-slate-400 self-right" onClick={onClickSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
    </>
  )
}

export default EditPost;