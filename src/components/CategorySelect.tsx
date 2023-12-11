import React, { useState } from "react";
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

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    fontSize: ".9rem",
    height: "2.65rem",
    border: ".09rem solid #0099FF",
    boxShadow:
      "0 .4rem 1rem rgba(0, 0, 0, 0.37), 0 0 .1rem rgba(0, 0, 0, 0.37)",
    borderRadius: "7px",
    borderColor: "custom-blue",
    ":hover": {
      borderColor: "#0099FF",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: "black",
    background: state.isSelected ? "transparent" : "white",
    ":hover": {
      backgroundColor: "#DEF2FF",
    },
  }),
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
    <AsyncSelect
      id="categories"
      cacheOptions
      required
      loadOptions={loadCategoryOptions}
      defaultOptions
      value={selectedCategory}
      onChange={handleCategoryChange}
      onInputChange={setInputValue}
      styles={customStyles}
      className="text-lg"
      placeholder="Select Category"
    />
  );
};

export default CategorySelect;
