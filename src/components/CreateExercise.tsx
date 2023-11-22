import ExerciseForm from "./ExerciseForm";

const CreateExercise = () => {


  return (
    <div className="w-full h-screen">
      <div className="bg-custom-light-grey py-3 px-4 mb-5">
        <h1 className="font-bold text-2xl">Create Exercise</h1>
      </div>
      <ExerciseForm />
    </div>
  );
};

export default CreateExercise;
