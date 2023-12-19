import { Link } from "react-router-dom";

export default function ConfirmCreation({ to }: { to: string }) {
  return (
    <div className="flex items-center justify-between mt-8">
      <button
        type="submit"
        className="px-6 py-3 bg-custom-dark-blue text-white text-lg rounded hover:bg-blue-800"
      >
        Save
      </button>
      <Link
        to={to}
        className="px-6 py-3 bg-custom-grey text-gray-800 text-lg rounded hover:bg-gray-400"
      >
        Cancel
      </Link>
    </div>
  );
}
