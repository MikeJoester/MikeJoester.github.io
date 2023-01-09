import React from 'react';

const RightContent = (props) => {
  let array=[]
  for (let i = 0; i < props.title.length; i++) {
    array.push(i);
  }
  // console.log(array);

  return (
    <div className="basis-1/3 flex-1 flex-col">
        <div className="flex flex-col space-y-5">
          <h1 className="font-bold self-start text-2xl">{props.title}</h1>
          <div class="flex flex-col space-y-5">
          {array.slice(0, 3).map((i)=>
            <div class="flex flex-row bg-slate-600 scale-100 hover:scale-110 ease-in-out duration-150 rounded-xl space-x-2">
            <img title="post-pic" src="https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" class="w-2/5 rounded-l-xl"/>

            <div class="flex flex-col justify-start text-left p-2">
              <a href="/post"><h1 class="font-bold text-xl">Article Title</h1></a>
              <div class="flex flex-row space-x-1">
                <p class="text-base">By:</p> 
                <a href="/user"><p class="text-base text-yellow-400 font-semibold">RigumaBallz</p></a>
              </div>
              <p class="text-sm text-justify pr-5 overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed interdum ipsum. Curabitur eu finibus elit.
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