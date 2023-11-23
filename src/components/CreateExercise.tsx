import ExerciseForm from "./ExerciseForm";
import { useState } from "react";
import exerciseService from "../services/exercises";
import { useNavigate } from "react-router-dom";

const CreateExercise = () => {

  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [textExercise, setTextExercise] = useState("");
  const navigate = useNavigate();



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
      <ExerciseForm onSubmit={handleSubmit} setTitle={setTitle} setComplexity={setComplexity} setTestExercise={setTextExercise} title={title} complexity={complexity} textExercise={textExercise} />
    </div>
  );
};

export default CreateExercise;
