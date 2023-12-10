import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "./ExerciseForm";
import exercisesService from "../services/exercises";
import { CategoryOption } from "./CategorySelect";

const CreateExercise = () => {
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [textExercise, setTextExercise] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await exercisesService.create(title, textExercise, complexity, [selectedCategory!.value]);
      navigate("/exercises");
    } catch (error) {
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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />
    </div>
  );
};

export default CreateExercise;