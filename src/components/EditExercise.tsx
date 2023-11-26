import ExerciseForm from "./ExerciseForm";
import { useState, useEffect } from "react";
import exerciseService from "../services/exercises";
import { useNavigate, useParams } from "react-router-dom";

const EditExercise = () => {

  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [textExercise, setTextExercise] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    id && exerciseService
      .getByID(id)
      .then((response) => {
        setTitle(response.data.title)
        setComplexity(response.data.complexity)
        setTextExercise(response.data.text)
      })
      .catch((error) => {
        console.log(error)
        navigate("/exercises");
      }).finally(() => {
        setIsLoading(false)
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    id && exerciseService
      .edit(id, title, textExercise, complexity)
      .then(() => {
        navigate("/exercises");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <div className="bg-custom-light-grey py-3 px-4 mb-5">
          <h1 className="font-bold text-2xl">Edit Exercise</h1>
        </div>
        <div className="justify-center">
          <h1 className="font-bold text-2xl text-center">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen">
      <div className="bg-custom-light-grey py-3 px-4 mb-5">
        <h1 className="font-bold text-2xl">Edit Exercise</h1>
      </div>
      <ExerciseForm
        onSubmit={handleSubmit}
        setTitle={setTitle}
        setComplexity={setComplexity}
        setTestExercise={setTextExercise}
        title={title}
        complexity={complexity}
        textExercise={textExercise} />
    </div>
  )
}

export default EditExercise