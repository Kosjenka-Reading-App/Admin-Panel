import React from "react";
import Dropdown from "./Dropdown";
import CategorySelect from "./CategorySelect";
import TextInput from "./TextInput";
import ConfirmCreation from "./ConfirmCreation";

type CategoryOption = {
  value: string;
  label: string;
};

type ExerciseFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
  complexity: string;
  textExercise: string;
  selectedCategory: CategoryOption | null;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryOption | null>
  >;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setComplexity: React.Dispatch<React.SetStateAction<string>>;
  setTestExercise: React.Dispatch<React.SetStateAction<string>>;
};

const ExerciseForm = ({
  onSubmit,
  title,
  complexity,
  textExercise,
  selectedCategory,
  setSelectedCategory,
  setTitle,
  setComplexity,
  setTestExercise,
}: ExerciseFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center m-auto shadow-lg shadow-custom-grey bg-custom-light-grey sm:max-w-[900px]"
    >
      <div className="w-full p-12">
        <TextInput
          label="Title"
          name="title"
          id="title"
          value={title}
          setValue={setTitle}
          placeholder="Title"
          required
        />

        <div className="flex gap-4 my-4">
          <div className="w-1/2">
            <Dropdown complexity={complexity} setComplexity={setComplexity} />
          </div>
          <div className="w-1/2">
            <CategorySelect
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>

        <TextInput
          name="text"
          id="text"
          label="Text"
          type="textarea"
          value={textExercise}
          setValue={setTestExercise}
          required
          placeholder="Please enter your exercise"
        />

        <ConfirmCreation to="/exercises" />
      </div>
    </form>
  );
};
export default ExerciseForm;
