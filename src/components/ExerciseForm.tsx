import React from 'react';
import Dropdown from './Dropdown';
import Select from 'react-select';

type CategoryOption = {
  value: string;
  label: string;
};

type ExerciseFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
  complexity: string;
  textExercise: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setComplexity: React.Dispatch<React.SetStateAction<string>>;
  setTextExercise: React.Dispatch<React.SetStateAction<string>>;
  categories: CategoryOption[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const ExerciseForm = ({
  onSubmit,
  title,
  complexity,
  textExercise,
  setTitle,
  setComplexity,
  setTextExercise,
  categories,
  selectedCategory,
  setSelectedCategory
}: ExerciseFormProps) => {

  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setSelectedCategory(selectedOption ? selectedOption.value : '');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col mt-10 items-center justify-center h-3/4 w-3/4 m-auto shadow-lg shadow-custom-grey sm:max-w-[900px] bg-custom-light-grey">
        <div className="flex h-1/5 w-3/4 mt-0 m-auto ">
          <div className="flex-1 p-4 ">
            <div>
              <label className="block mt-2 mb-3 px-1 text-3xl font-bold text-custom-black">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                className="px-3 mb-4 shadow-lg shadow-gray-400 border border-custom-blue text-custom-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Add Title"
                required
              />
            </div>
          </div>
          <div className="flex-1 p-4">
            <div>
              <label className="block mt-2 mb-3 px-1 text-3xl font-bold text-custom-black">
                Complexity
              </label>
              <Dropdown complexity={complexity} setComplexity={setComplexity}/>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 w-3/4">
          <div>
            <label className="block mt-2 mb-3 px-1 text-3xl font-bold text-custom-black">
              Category
            </label>
            <Select
              options={categories}
              value={categories.find(c => c.value === selectedCategory)}
              onChange={handleCategoryChange}
              className="mb-4 shadow-lg shadow-gray-400 border border-custom-blue text-custom-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Select Category"
              required
            />
          </div>
        </div>
        <div className="flex-1 p-4 w-3/4">
          <div>
            <label className="block mt-2 mb-6 px-1 text-3xl font-bold text-custom-black">
              Text
            </label>
            <textarea
              value={textExercise}
              onChange={(e) => setTextExercise(e.target.value)}
              className="w-full px-6 py-2 rounded-lg shadow-lg shadow-gray-400 border border-custom-blue text-custom-black sm:text-sm focus:ring-primary-600 focus:border-primary-600 block overflow-y-auto"
              placeholder="Please enter your exercise"
              style={{ minHeight: "300px" }}
              required
            />
          </div>
        </div>
        <button type="submit" className="w-1/5 justify-center py-2 mb-10 bg-custom-blue hover:bg-blue-800 rounded-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
