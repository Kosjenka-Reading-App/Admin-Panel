import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import Alert from './Alert';

const ConfirmResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Set an error message if passwords do not match
      setErrorMessage("Passwords do not match!");
      return;
    }
    // Clear the error message on successful match
    setErrorMessage('');
    // TODO: Call your API endpoint to confirm the new password
    console.log('New password set:', password);
    // Simulate a successful response from the API
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
        <div className="bg-custom-light-blue w-full h-[550px] hidden md:block rounded-tl-2xl rounded-bl-2xl">
          <img className="w-2/3 h-2/3 pl-20 pt-20 m-10" src={logo} alt="Logo" />
        </div>
        <div className="p-10 pr-20 flex flex-col justify-around bg-white rounded-tr-2xl rounded-br-2xl">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl text-custom-blue font-bold text-center mb-8">
              Reset Account Password
            </h2>
            {/* Render Alert component if there is an error message */}
            {errorMessage && <Alert message={errorMessage} />}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-custom-grey">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4 shadow-lg shadow-custom-grey border border-custom-blue text-custom-grey sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-custom-grey">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mb-4 shadow-lg shadow-custom-grey border border-custom-blue text-custom-grey sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <button type="submit" className="w-full py-2 my-4 bg-custom-blue hover:bg-blue-400 text-white font-bold rounded-lg">
              Set New Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;
