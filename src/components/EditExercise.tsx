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
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoriesResponse = await categoriesService.list(1, 100, '', '', '');
        categoriesResponse.data.map((item: { category: string }) => ({
          value: item.category,
          label: item.category,
        }));

        if (id) {
          const exerciseResponse = await exerciseService.getByID(id);
          setTitle(exerciseResponse.data.title);
          setComplexity(exerciseResponse.data.complexity);
          setTextExercise(exerciseResponse.data.text);
          const category= exerciseResponse.data.category[0]?.category ;
          console.log(category);
          setSelectedCategory({ value: category, label: category });
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
    if (id && selectedCategory) {
      try {
        await exerciseService.edit(id, title, textExercise, complexity, [selectedCategory.value]);
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
        setTestExercise={setTextExercise}
        loadOptions={loadCategoryOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default EditExercise;
