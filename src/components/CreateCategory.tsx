// CreateCategory.tsx
import React, { useState } from "react";
import {Link } from "react-router-dom";
import categoriesService from "../services/categories";
import Alert from "./Alert"; 

const CreateCategory = () => {  // Changed from React.FC to regular function declaration
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); 
  const [showAlert, setShowAlert] = useState(false); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    categoriesService
      .create(name)
      .then(() => {
      })
      .catch((err) => {
        const message = err.response?.data?.message || "An error occurred while creating the category.";
        setAlertMessage(message); 
        setShowAlert(true); 
      });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="w-full py-4 px-6 bg-custom-light-grey border-b border-gray-200">
        <h1 className="text-custom-dark-blue text-xl font-bold">
          Create Category
        </h1>
      </div>
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-custom-light-grey p-12 rounded-lg shadow-xl w-full max-w-2xl">
          {showAlert && <Alert message={alertMessage} />}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="text-lg font-semibold text-gray-700 block"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-custom-black mt-1 px-4 py-3 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 block w-full rounded-md text-lg"
                placeholder="Enter category name"
                required
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-custom-dark-blue text-white text-lg rounded hover:bg-blue-800"
              >
                Save
              </button>
              <Link
                to="/categories"
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

export default CreateCategory;
