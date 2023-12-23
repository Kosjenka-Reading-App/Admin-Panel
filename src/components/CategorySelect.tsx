import { useState } from "react";
import AsyncSelect from "react-select/async";
import categoriesService from "../services/categories"; // Ensure this is the correct path

export type CategoryOption = {
  value: string;
  label: string;
};

type CategorySelectProps = {
  selectedCategory: CategoryOption | null;
  setSelectedCategory: (category: CategoryOption | null) => void;
};

const CategorySelect = ({
  selectedCategory,
  setSelectedCategory,
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

  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setSelectedCategory(selectedOption);
  };

  return (
    <div>
      <label
        htmlFor="complexity"
        className="text-lg font-semibold text-gray-700 block"
      >
        Category
      </label>
      <AsyncSelect
        id="categories"
        cacheOptions
        required
        loadOptions={loadCategoryOptions}
        defaultOptions
        value={selectedCategory}
        onChange={handleCategoryChange}
        onInputChange={setInputValue}
        className="text-lg"
        placeholder="Select Category"
        styles={{
          control: (provided) => ({
            ...provided,
            fontSize: ".9rem",
            height: "2.65rem",
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
        }}
      />
    </div>
  );
};

export default CategorySelect;
