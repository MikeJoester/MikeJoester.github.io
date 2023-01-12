import React, { useState } from 'react';
import SearchButton from './SearchButton';
import WriteButton from './WriteButton';
import CreatePostButton from './CreatePostButton';
import "./Navbar.css";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const toggleDisplay = () => setDisplay(!display);
  const hidden = (display) ? "hidden" : "";

  return (
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" class="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/2949/2949874.png" class="mr-3 h-6 sm:h-10" alt="Blog's Logo" />
                <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">My Blog</span>
            </a>

            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleDisplay}>
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            
            <div class={"w-full md:block md:w-auto " + hidden} id="navbar-default">
                <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:items-center">
                    <li>
                        <a href="/" class="block py-2 pr-4 pl-3 bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-gray-400" aria-current="page">Home</a>
                    </li>

                    <li>
                        {/* <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Write</a> */}
                        
                        <SearchButton/>
                    </li>

                    <li>
                        <WriteButton/>
                    </li>

                    <li>
                        <CreatePostButton/>
                    </li>

                    <li>
                        <a href="/#/user" class="block pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <div className="flex flex-row space-x-2 justify-center">
                                
                                <img alt="logo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="w-12 h-max rounded-full"/>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;