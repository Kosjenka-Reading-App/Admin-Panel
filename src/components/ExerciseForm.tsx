import React, { FormEventHandler } from "react";
import Dropdown from "./Dropdown";

type ExerciseFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  complexity: string;
  textExercise: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setComplexity: React.Dispatch<React.SetStateAction<string>>;
  setTestExercise: React.Dispatch<React.SetStateAction<string>>;
};

const ExerciseForm = ({
  onSubmit,
  title,
  complexity,
  textExercise,
  setTitle,
  setComplexity,
  setTestExercise,
}: ExerciseFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col mt-10 items-center justify-center h-3/4 w-3/4 m-auto shadow-lg shadow-custom-grey sm:max-w-[900px] bg-custom-light-grey">
        <div className="flex h-1/5 w-3/4 mt-0 m-auto ">
          <div className="flex-1 p-4 ">
            <div>
              <label className="block mt-2 mb-3 px-1 text-3xl  font-bold text-custom-black">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                id="title"
                required
                className=" px-3 mb-4 shadow-lg shadow-gray-400 border border-custom-blue text-custom-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Add Title"
              />
            </div>
          </div>
          <div className="flex-1 p-4">
            <div>
              <label className="block mt-2 mb-3 px-1 text-3xl  font-bold text-custom-black">
                Complexity
              </label>
              <Dropdown complexity={complexity} setComplexity={setComplexity} />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4  h-1/2 w-3/4 m-auto">
          <div>
            <label className="block mt-2 mb-6 px-1 text-3xl  font-bold text-custom-black">
              Text
            </label>

            <textarea
              name="text"
              required
              className="w-full text-sm font-sans font-normal leading-5 px-6 py-2 rounded-lg shadow-lg shadow-gray-400 border border-custom-blue text-custom-black sm:text-sm focus:ring-primary-600 focus:border-primary-600 block
        focus-visible:outline-0 overflow-y-auto"
              placeholder="Please enter your exercise"
              value={textExercise}
              onChange={(e) => setTestExercise(e.target.value)}
              style={{ minHeight: "300px" }}
            />
          </div>
        </div>
        <button className="w-1/5 justify-center  py-2 mb-10 bg-custom-blue hover:bg-blue-400 rounded-lg">
          Save
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
