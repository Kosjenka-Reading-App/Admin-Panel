import Select from "react-select";

type ExerciseFormProps = {
  complexity: string;
  setComplexity: React.Dispatch<React.SetStateAction<string>>;
};

const Dropdown = ({ complexity, setComplexity }: ExerciseFormProps) => {
  const options = [
    { value: "easy", label: "EASY", color: "custom-green" },
    { value: "medium", label: "MEDIUM", color: "custom-yellow" },
    { value: "hard", label: "HARD", color: "custom-red" },
  ];

  const getColorBasedOnValueText = (value: string) => {
    switch (value) {
      case "easy":
        return "#10CA00";
      case "medium":
        return "#FFD700";
      case "hard":
        return "#FF0000";
    }
  };

  return (
    <div>
      <label
        htmlFor="complexity"
        className="text-lg font-semibold text-gray-700 block"
      >
        Complexity
      </label>
      <Select
        options={options}
        name="complexity"
        id="complexity"
        required
        value={options.find((option) => option.value === complexity)}
        onChange={(selectedOption) =>
          setComplexity(selectedOption?.value || "")
        }
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
            color:
              state.isSelected || state.isFocused
                ? getColorBasedOnValueText(state.data.value)
                : getColorBasedOnValueText(state.data.value),
            fontWeight: "bold",
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

export default Dropdown;
