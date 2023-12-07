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
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  complexity: string;
  setComplexity: React.Dispatch<React.SetStateAction<string>>;
  textExercise: string;
  setTextExercise: React.Dispatch<React.SetStateAction<string>>;
  categories: CategoryOption[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const ExerciseForm = ({
  onSubmit,
  title,
  setTitle,
  complexity,
  setComplexity,
  textExercise,
  setTextExercise,
  categories,
  selectedCategory,
  setSelectedCategory
}: ExerciseFormProps) => {

  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setSelectedCategory(selectedOption ? selectedOption.value : '');
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: '60px',
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      padding: '8px',
    }),
    clearIndicator: (base: any) => ({
      ...base,
      padding: '8px',
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: '14px 16px',
    }),
    input: (base: any) => ({
      ...base,
      margin: '0px',
    }),
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-3xl font-bold text-custom-black">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="h-10 px-3 mb-4 shadow-lg border border-custom-blue text-custom-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
          placeholder="Add Title"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="complexity" className="text-3xl font-bold text-custom-black">
          Complexity
        </label>
        <Dropdown complexity={complexity} setComplexity={setComplexity}/>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-3xl font-bold text-custom-black">
          Category
        </label>
        <Select
          id="category"
          options={categories}
          value={categories.find(c => c.value === selectedCategory)}
          onChange={handleCategoryChange}
          styles={customStyles}
          className="text-lg"
          placeholder="Select Category"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="text" className="text-3xl font-bold text-custom-black">
          Text
        </label>
        <textarea
          id="text"
          value={textExercise}
          onChange={(e) => setTextExercise(e.target.value)}
          className="h-40 px-6 py-3 border border-custom-blue text-custom-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
          placeholder="Enter exercise text"
          required
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-custom-dark-blue text-white text-lg rounded hover:bg-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default ExerciseForm;
