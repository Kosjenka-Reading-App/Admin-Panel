import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseForm from "./ExerciseForm";
import exerciseService from "../services/exercises";

type CategoryOption = {
  value: string;
  label: string;
};

const EditExercise = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [textExercise, setTextExercise] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const exerciseResponse = await exerciseService.getByID(id);
          setTitle(exerciseResponse.title);
          setComplexity(exerciseResponse.complexity);
          setTextExercise(exerciseResponse.text);
          const categories = exerciseResponse.categories.map(
            (category: string) => ({
              value: category,
              label: category,
            })
          );
          setSelectedCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/exercises");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      try {
        await exerciseService.edit(
          id,
          title,
          textExercise,
          complexity,
          selectedCategories.map((category) => category.value)
        );
        navigate("/exercises");
      } catch (error) {
        console.error("Failed to edit exercise:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="font-bold text-2xl text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <div className="bg-custom-light-grey py-3 px-4 mb-5">
        <h1 className="font-bold text-2xl">Edit Exercise</h1>
      </div>
      <ExerciseForm
        onSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        complexity={complexity}
        setComplexity={setComplexity}
        textExercise={textExercise}
        setTestExercise={setTextExercise}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
};

export default EditExercise;
