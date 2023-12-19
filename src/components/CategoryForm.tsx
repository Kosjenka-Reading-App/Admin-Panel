import React, { FormEventHandler } from "react";
import TextInput from "./TextInput";
import ConfirmCreation from "./ConfirmCreation";

type CategoryFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryForm = ({ onSubmit, name, setName }: CategoryFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <TextInput
        label="Category Name"
        id="name"
        name="name"
        value={name}
        setValue={setName}
        placeholder="Enter category name"
        required
      />

      <ConfirmCreation to="/categories" />
    </form>
  );
};

export default CategoryForm;
