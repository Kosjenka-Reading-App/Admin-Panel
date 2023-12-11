import CategoryForm from "./CategoryForm";
import { useState, useEffect } from "react";
import categoriesService from "../services/categories";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "./Alert";

const EditCategory = () => {

    const { oldCategory } = useParams<{ oldCategory: string }>();
    const [name, setName] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        try {
            oldCategory && setName(oldCategory)

        } catch (error) {
            console.log(error)
            navigate("/categories");

        } finally {
            setIsLoading(false)
        }
    }, [oldCategory]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        oldCategory && categoriesService
            .editCategory(oldCategory, name)
            .then(() => {
                navigate("/categories");
            })
            .catch((error) => {
                const message = error.response?.data?.message || "An error occurred while creating the category.";
                setAlertMessage(message);
                setShowAlert(true);
            });
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen">
                <div className="bg-custom-light-grey py-3 px-4 mb-5">
                    <h1 className="font-bold text-2xl">Edit Category</h1>
                </div>
                <div className="justify-center">
                    <h1 className="font-bold text-2xl text-center">Loading...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="w-full py-4 px-6 bg-custom-light-grey border-b border-gray-200">
                <h1 className="font-bold text-2xl">
                    Edit Category
                </h1>
            </div>
            <div className="flex-grow flex items-center justify-center p-8">
                <div className="bg-custom-light-grey p-12 rounded-lg shadow-xl w-full max-w-2xl">
                    {showAlert && <Alert message={alertMessage} />}
                    <CategoryForm
                        onSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                </div>
            </div>
        </div>
    )
}

export default EditCategory