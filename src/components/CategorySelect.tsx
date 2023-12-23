import { useState } from "react";
import AsyncSelect from "react-select/async";
import categoriesService from "../services/categories"; // Ensure this is the correct path
import { MultiValue } from "react-select";

export type CategoryOption = {
  value: string;
  label: string;
};

type CategorySelectProps = {
  selectedCategories: CategoryOption[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<CategoryOption[]>>;
};

const CategorySelect = ({
  selectedCategories,
  setSelectedCategories,
}: CategorySelectProps) => {
  const [, setInputValue] = useState("");

  const loadCategoryOptions = async (inputVal: string) => {
    try {
      const response = await categoriesService.list(
        1,
        100,
        inputVal,
        "",
        "asc"
      );
      return response.data.map((category: string) => ({
        value: category,
        label: category,
      }));
    } catch (error) {
      console.error("Failed to fetch categories", error);
      return [];
    }
  };

  const handleCategoryChange = (
    selectedOptions: MultiValue<CategoryOption>
  ) => {
    setSelectedCategories(selectedOptions as Array<CategoryOption>);
  };

  return (
    <div>
      <label
        htmlFor="complexity"
        className="text-lg font-semibold text-gray-700 block"
      >
        Categories
      </label>
      <AsyncSelect
        id="categories"
        cacheOptions
        required
        isMulti
        loadOptions={loadCategoryOptions}
        defaultOptions
        value={selectedCategories}
        onChange={handleCategoryChange}
        onInputChange={setInputValue}
        className="text-lg"
        placeholder="Select Category"
        styles={{
          control: (provided) => ({
            ...provided,
            fontSize: ".9rem",
            // height: "2.65rem",
            border: "1px solid rgb(203 213 225)",
            borderRadius: "7px",
            boxShadow: "none",
            ":hover": {
              border: "1px solid rgb(203 213 225)",
              borderColor: "rgb(203 213 225)",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            color: "black",
            background: state.isSelected ? "transparent" : "white",
            ":hover": {
              backgroundColor: "#DEF2FF",
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            padding: "0",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            padding: "0",
          }),
        }}
      />
    </div>
  );
};

export default CategorySelect;
