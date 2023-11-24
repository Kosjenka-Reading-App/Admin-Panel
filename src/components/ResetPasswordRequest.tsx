import React, { useState } from 'react';
import logo from "../assets/logo.png";
import Alert from './Alert'; 

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // State to store alert messages
  const [showAlert, setShowAlert] = useState(false); // State to control the display of the alert

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Call your API endpoint to request a password reset
    console.log('Request password reset for:', email);
    
    // Simulate a success response from the API
    // If the email exists in the system, an email will be sent
    setAlertMessage('If the email address exists in our system, we have sent a password reset link to your email address.');
    setShowAlert(true); // Show the alert message

    // Clear the email field to reset the form
    setEmail('');
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
              Recover Account
            </h2>
            {/* Render Alert component if showAlert is true */}
            {showAlert && <Alert message={alertMessage} />}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-custom-grey">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4 shadow-lg shadow-custom-grey border border-custom-blue text-custom-grey sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
              />
            </div>
            <button type="submit" className="w-full py-2 my-4 bg-custom-blue hover:bg-blue-400 text-white font-bold rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPassword;
