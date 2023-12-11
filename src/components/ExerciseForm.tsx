import React from 'react';
import Dropdown from './Dropdown';
import CategorySelect from './CategorySelect';

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
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryOption | null>>;
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
  setTestExercise
}: ExerciseFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center m-auto shadow-lg shadow-custom-grey bg-custom-light-grey p-4 sm:max-w-[900px]">
      <div className="w-full max-w-xl m-auto">
        <div className="mb-4">
          <label className="block text-3xl font-bold text-custom-black mb-2">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="title"
            className="w-full px-3 py-2 mb-4 shadow-lg shadow-gray-400 border border-custom-blue text-custom-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
            placeholder="Add Title"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-3xl font-bold text-custom-black mb-2">
              Complexity
            </label>
            <Dropdown complexity={complexity} setComplexity={setComplexity} />
          </div>
          <div className="w-1/2">
            <label className="block text-3xl font-bold text-custom-black mb-2">
              Category
            </label>
            <CategorySelect
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-3xl font-bold text-custom-black mb-2">
            Text
          </label>
          <textarea
            className="w-full px-6 py-2 shadow-lg shadow-gray-400 border border-custom-blue text-custom-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
            placeholder="Please enter your exercise"
            value={textExercise}
            onChange={(e) => setTestExercise(e.target.value)}
            style={{ minHeight: "300px" }}
          />
        </div>
        <div className="w-full flex justify-center p-4"> { }
          <button className="w-1/4 py-2 bg-custom-dark-blue hover:bg-blue-400 text-white rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default ExerciseForm;
