
import ExerciseForm from "./ExerciseForm";
import { useState , useEffect} from "react";
import exerciseService from "../services/exercises";
import { useNavigate, useParams } from "react-router-dom";

const EditExercise = () => {
     
  const { id } = useParams<{ id?: string }>();
  
  console.log(id)
  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [textExercise, setTextExercise] = useState("");
  const navigate = useNavigate();

  // Effect to fetch exercise data when the component mounts
  useEffect(() => {
    exerciseService
      .getByID(id!)
      .then((response) => {
        console.log(response.data.complexity)
        setTitle(response.data.title)
        setComplexity(response.data.complexity)
        setTextExercise(response.data.text)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    exerciseService
      .edit(id!,title, textExercise, complexity)
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
      <h1 className="font-bold text-2xl">Edit Exercise</h1>
    </div>
    <ExerciseForm onSubmit={handleSubmit} setTitle={setTitle} setComplexity={setComplexity} setTestExercise={setTextExercise} title={title} complexity={complexity} textExercise={textExercise} />
  </div>
  )
}

export default EditExercise