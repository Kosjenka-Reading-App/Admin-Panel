import logo from "../assets/logo.png";
import React, { useState } from "react";
import { login } from "../services/auth";
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { isLoggedIn, loading: loadingAuth } = useAuth();
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password)
      .then(() => navigate("/"))
      .catch(() => setIsHidden(false));
  };

  if (loadingAuth) {
    return <></>;
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
        
        <div className="flex justify-center items-center bg-custom-light-blue w-full h-full md:rounded-tl-2xl md:rounded-bl-2xl">
          <img className="w-9/10 md:w-auto md:h-auto max-w-[90%] max-h-[90%]" src={logo} alt="Logo" />
        </div>
  
        <div className="p-10 pr-20 flex flex-col justify-around bg-white rounded-tr-2xl rounded-br-2xl">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl text-custom-blue font-bold text-center mb-8">
              Login to Admin Panel
            </h2>

            <h2
              id="error"
              className={`${
                isHidden ? "hidden" : "block"
              } text-lg text-red-600  text-left mb-4`}
            >
              Invalid Username/Password
            </h2>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-custom-grey dark:text-custom-grey"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 shadow-lg shadow-custom-grey border border-custom-blue text-custom-grey sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-custom-grey dark:text-custom-grey"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mb-3 shadow-lg shadow-custom-grey border border-custom-blue text-custom-grey sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 my-4 bg-custom-blue hover:bg-blue-400 rounded-lg"
            >
              Login
            </button>
            <Link
              to="/password/reset"
              className="text-left text-sm text-blue-500"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
