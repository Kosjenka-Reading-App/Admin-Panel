import ExerciseForm from "./ExerciseForm";
import { useState, useEffect } from "react";
import exerciseService from "../services/exercises";
import { useNavigate } from "react-router-dom";
import categoriesService from "../services/categories"; 

type CategoryOption = {
  value: string;
  label: string;
};

const CreateExercise = () => {
  const [title, setTitle] = useState<string>("");
  const [complexity, setComplexity] = useState<string>("");
  const [textExercise, setTextExercise] = useState<string>("");
  // Initialize categories with the correct type
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set default values for the parameters
    const defaultPage = 1;
    const defaultPerPage = 10;
    const defaultSearchQuery = '';
    const defaultSortField = '';
    const defaultSortDir = 'asc'; // or 'desc' or '', depending on your API
  
    categoriesService.list(defaultPage, defaultPerPage, defaultSearchQuery, defaultSortField, defaultSortDir)
      .then((response) => {
        const categoryOptions: CategoryOption[] = response.data.map((item: any) => ({
          value: item.category,
          label: item.category,
        }));
        setCategories(categoryOptions);
      })
      .catch((error) => {
        console.error("Failed to fetch categories", error);
      });
  }, []);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    exerciseService
      .create(title, textExercise, complexity)
      .then(() => {
        navigate("/exercises");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="w-full h-screen">
      <div className="bg-custom-light-grey py-3 px-4 mb-5">
        <h1 className="font-bold text-2xl">Create Exercise</h1>
      </div>
      <ExerciseForm
        onSubmit={handleSubmit}
        setTitle={setTitle}
        setComplexity={setComplexity}
        setTextExercise={setTextExercise}
        title={title}
        complexity={complexity}
        textExercise={textExercise}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default CreateExercise;
