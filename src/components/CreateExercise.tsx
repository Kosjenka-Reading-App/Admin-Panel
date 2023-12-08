import React, { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    categoriesService.list(1, 100, '', '', 'asc')
      .then(response => {
        const categoryOptions: CategoryOption[] = response.data.map((category: string) => ({
          value: category,
          label: category,
        }));
        setCategories(categoryOptions);
      })
      .catch((error: any) => console.error("Failed to fetch categories", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await exercisesService.create(title, textExercise, complexity);
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
        setTextExercise={setTextExercise}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default CreateExercise;
