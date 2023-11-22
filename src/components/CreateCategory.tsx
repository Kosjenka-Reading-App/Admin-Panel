// CreateCategory.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesService from "../services/categories";

const CreateCategory: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    categoriesService
      .create(name)
      .then(() => {
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err);
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
              <button
                onClick={() => navigate("/categories")}
                className="px-6 py-3 bg-custom-grey text-gray-800 text-lg rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
