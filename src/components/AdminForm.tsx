import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

import adminService from "../services/admins";
import TextInput from "./TextInput";

const AdminForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    adminService
      .create(email, password, isSuperAdmin)
      .then(() => {
        navigate("/admins");
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setErrorMessage("An account with this email already exists.");
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="w-full py-4 px-6 bg-custom-light-grey border-b border-gray-200">
        <h1 className="font-bold text-2xl">Create Admin</h1>
      </div>
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-custom-light-grey p-12 rounded-lg shadow-xl w-full max-w-2xl">
          {errorMessage && <Alert message={errorMessage} />}
          <form onSubmit={handleSubmit} className="space-y-8">
            <TextInput
              label="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              setValue={setEmail}
              placeholder="example@email.com"
              required
            />

            <TextInput
              label="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              setValue={setPassword}
              placeholder="********"
              required
            />

            <div className="flex items-center">
              <input
                id="super-admin"
                type="checkbox"
                checked={isSuperAdmin}
                onChange={(e) => setIsSuperAdmin(e.target.checked)}
                className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
              />
              <label
                htmlFor="super-admin"
                className="ml-2 text-lg font-semibold text-gray-900"
              >
                Super admin privileges
              </label>
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-custom-dark-blue text-white text-lg rounded hover:bg-blue-800"
              >
                Save
              </button>
              <Link
                to="/admins"
                className="px-6 py-3 bg-custom-grey text-gray-800 text-lg rounded hover:bg-gray-400"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
