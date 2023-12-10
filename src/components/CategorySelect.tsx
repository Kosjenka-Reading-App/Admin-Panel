import AsyncSelect from 'react-select/async';

type CategoryOption = {
  value: string;
  label: string;
};

type CategorySelectProps = {
loadOptions: (inputValue: string, callback: (options: CategoryOption[]) => void) => Promise<CategoryOption[]>;
  selectedCategory: CategoryOption | null;  
  setSelectedCategory: (category: CategoryOption | null) => void; 
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    fontSize: '.9rem',
    height: '2.65rem',
    border: '.09rem solid #0099FF',
    boxShadow: '0 .4rem 1rem rgba(0, 0, 0, 0.37), 0 0 .1rem rgba(0, 0, 0, 0.37)',
    borderRadius: '7px',
    borderColor: 'custom-blue',
    ':hover': {
      borderColor: '#0099FF',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
    background: state.isSelected ? 'transparent' : 'white',
    ':hover': {
      backgroundColor: '#DEF2FF',
    },
  }),
};

const CategorySelect = ({ loadOptions, selectedCategory, setSelectedCategory }: CategorySelectProps) => {
  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setSelectedCategory(selectedOption); 
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      value={selectedCategory}
      onChange={handleCategoryChange}
      styles={customStyles}
      className="text-lg"
      placeholder="Select Category"
    />
  );
};

export default CategorySelect;
