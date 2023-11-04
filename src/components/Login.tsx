import React, { useState } from 'react';
import logo from "../assets/logo.png"

const Login: React.FC = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     // Handle successful login response here
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle login error here
  //   }
  // };

  return (
    <div className='w-full h-screen flex bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800'>
        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
            <div className=' bg-custom-blue w-full h-[550px] hidden md:block rounded-tl-2xl rounded-bl-2xl'>
                <img className='w-3/4 h-3/4 pl-20 pt-20' src={logo} alt="/" />
            </div>
            <div className='p-10 pr-20 flex flex-col justify-around bg-white rounded-tr-2xl rounded-br-2xl'>
                <form>
                    <h2 className='text-2xl font-bold text-center mb-8'>Login to Admin Panel</h2>
                    {/* <div>
                        <input className='border p-2 mr-2' type="text" placeholder='Username' />
                       
                    </div>
                    <div>
                        
                        <input className='border p-2' type="password" placeholder='Password' />
                    </div> */}
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
