import React, { FormEventHandler } from 'react'
import { Link } from "react-router-dom";

type CategoryFormProps = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>

}


const CategoryForm = ({ onSubmit, name, setName }: CategoryFormProps) => {

    return (

        <form onSubmit={onSubmit} className="space-y-8">
            <div>
                <label
                    htmlFor="name"
                    className="text-lg font-semibold text-gray-700 block"
                >
                    Category Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-custom-black mt-1 px-4 py-3 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 block w-full rounded-md text-lg"
                    placeholder="Enter category name"
                    required
                />
            </div>
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