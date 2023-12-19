import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesService from "../services/categories";
import Alert from "./Alert";
import CategoryForm from "./CategoryForm";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    categoriesService
      .create(name)
      .then(() => {
        navigate("/categories");
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          "An error occurred while creating the category.";
        setAlertMessage(message);
        setShowAlert(true);
      });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="w-full py-4 px-6 bg-custom-light-grey border-b border-gray-200">
        <h1 className="font-bold text-2xl">Create Category</h1>
      </div>
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-custom-light-grey p-12 rounded-lg shadow-xl w-full max-w-2xl">
          {showAlert && <Alert message={alertMessage} />}
          <CategoryForm onSubmit={handleSubmit} name={name} setName={setName} />
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
