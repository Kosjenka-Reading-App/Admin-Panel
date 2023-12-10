import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "./ExerciseForm";
import exercisesService from "../services/exercises";
import categoriesService from "../services/categories";

type CategoryOption = {
  value: string;
  label: string;
};

const CreateExercise = () => {
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [textExercise, setTextExercise] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const navigate = useNavigate();

  // Function to asynchronously load category options
  const loadCategoryOptions = async (inputValue: string) => {
    try {
      const response = await categoriesService.list(1, 100, inputValue, '', 'asc');
      const categoryOptions: CategoryOption[] = response.data.map((category: string) => ({
        value: category,
        label: category,
      }));
      return categoryOptions;
    } catch (error) {
      console.error("Failed to fetch categories", error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        await exercisesService.create(title, textExercise, complexity); 
      }
      navigate("/exercises");
    } catch (error: any) {
      console.error("Failed to create exercise:", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-custom-light-grey py-3 px-4 mb-5">
        <h1 className="font-bold text-2xl">Create Exercise</h1>
      </div>
      <ExerciseForm
        onSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        complexity={complexity}
        setComplexity={setComplexity}
        textExercise={textExercise}
        setTestExercise={setTextExercise}
        loadOptions={loadCategoryOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default CreateExercise;
