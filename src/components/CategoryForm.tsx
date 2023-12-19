import React, { FormEventHandler } from 'react'
import { Link } from "react-router-dom";
import TextInput from './TextInput';

type CategoryFormProps = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>
}

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

            <div className="flex items-center justify-between mt-8">
                <button
                    type="submit"
                    className="px-6 py-3 bg-custom-dark-blue text-white text-lg rounded hover:bg-blue-800"
                >
                    Save
                </button>
                <Link
                    to="/categories"
                    className="px-6 py-3 bg-custom-grey text-gray-800 text-lg rounded hover:bg-gray-400"
                >
                    Cancel
                </Link>
            </div>
        </form>


    )
}

export default CategoryForm