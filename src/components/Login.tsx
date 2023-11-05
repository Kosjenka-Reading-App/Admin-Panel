import React, { useState } from 'react';
import logo from "../assets/logo.png"

const Login: React.FC = () => {
  

  return (
    <div className='w-full h-screen flex bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800'>
        <div className='grid grid-cols-1 md:grid-cols-2 m-auto  h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
            <div className=' bg-custom-light-blue w-full h-[550px] hidden md:block rounded-tl-2xl rounded-bl-2xl'>
                <img className='w-2/3 h-2/3 pl-20 pt-20 m-10' src={logo} alt="/" />
            </div>
            <div className='p-10 pr-20 flex flex-col justify-around bg-white rounded-tr-2xl rounded-br-2xl'>
                <form>
                    <h2 className='text-2xl font-bold text-center mb-8'>Login to Admin Panel</h2>
                    <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Email Address</label>
                      <input type="email" name="email" id="email" className="mb-4 shadow-lg shadow-gray-300 border border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com"  />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="mb-3 shadow-lg shadow-gray-300 border border-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  />
                  </div>
                    <button className='w-full py-2 my-4 bg-blue-600 hover:bg-blue-600 rounded-lg'>Login</button>
                    <p className='text-left text-sm text-blue-500'>Forgot Password?</p>
                </form>
                
            </div>
        </div>
    </div>
  );
};

export default Login;
