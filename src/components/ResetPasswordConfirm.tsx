import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "./Alert";
import logo from "../assets/logo.png";
import { AxiosResponse } from "axios";

type ConfirmResetPasswordProps = {
  title: string;
  label: string;
  buttonText: string;
  onSubmit: (password: string, token: string) => Promise<AxiosResponse>;
  defaultErrorMessage?: string;
};

const ConfirmResetPassword = ({
  title,
  label,
  buttonText,
  onSubmit,
  defaultErrorMessage,
}: ConfirmResetPasswordProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      navigate("/");
    }
  }, [searchParams, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const token = searchParams.get("token");
    if (token) {
      onSubmit(password, token)
        .then(() => navigate("/login"))
        .catch(() =>
          setErrorMessage(
            defaultErrorMessage ||
              "Failed to reset the password. Please try again or contact support."
          )
        );
    }
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
        <div className="flex justify-center items-center bg-custom-light-blue w-full h-full md:rounded-tl-2xl md:rounded-bl-2xl">
          <img
            className="w-9/10 md:w-auto md:h-auto max-w-[90%] max-h-[90%]"
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="p-10 pr-20 flex flex-col justify-around bg-white rounded-tr-2xl rounded-br-2xl">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl text-custom-blue font-bold text-center mb-8">
              {title}
            </h2>
            {errorMessage && <Alert message={errorMessage} />}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-custom-grey"
              >
                {label}
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
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-custom-grey"
              >
                Confirm password
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
            <button
              type="submit"
              className="w-full py-2 my-4 bg-custom-blue hover:bg-blue-400 text-white font-bold rounded-lg"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;
