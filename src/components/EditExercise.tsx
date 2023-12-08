import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseForm from "./ExerciseForm";
import exerciseService from "../services/exercises";
import categoriesService from "../services/categories";

type CategoryOption = {
  value: string;
  label: string;
};

const EditExercise = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [textExercise, setTextExercise] = useState("");
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoriesResponse = await categoriesService.list(1, 100, '', '', '');
        const categoryOptions: CategoryOption[] = categoriesResponse.data.map((item: { category: string }) => ({
          value: item.category,
          label: item.category,
        }));
        setCategories(categoryOptions);

        if (id) {
          const exerciseResponse = await exerciseService.getByID(id);
          setTitle(exerciseResponse.data.title);
          setComplexity(exerciseResponse.data.complexity);
          setTextExercise(exerciseResponse.data.text);
          setSelectedCategory(exerciseResponse.data.category);
        }
      } catch (error: any) { 
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
        await exerciseService.edit(id, title, textExercise, complexity);
        navigate("/exercises");
      } catch (error: any) {
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
        setTextExercise={setTextExercise}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default EditExercise;
