import Select from 'react-select';

type CategoryOption = {
  value: string;
  label: string;
};

type CategorySelectProps = {
  categories: CategoryOption[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
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

const CategorySelect = ({ categories, selectedCategory, setSelectedCategory }: CategorySelectProps) => {
  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setSelectedCategory(selectedOption ? selectedOption.value : '');
  };

  return (
    <Select
      options={categories}
      value={categories.find(c => c.value === selectedCategory)}
      onChange={handleCategoryChange}
      styles={customStyles}
      className="text-lg"
      placeholder="Select Category"
    />
  );
};

export default CategorySelect;
