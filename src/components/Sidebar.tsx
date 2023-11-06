import { FiLogOut, FiFileText } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';

const Sidebar = () => {
    return (
        <div className="w-16 h-screen flex flex-col justify-between py-4 bg-blue-900">
            <div>
                {/* Square with rounded edges containing the "K" */}
                <div className="flex justify-center mt-4 mb-8">
                    <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center">
                        <span className="text-blue-500 text-3xl font-bold">K</span>
                    </div>
                </div>
                
                {/* Profile icon */}
                <div className="mb-6 flex justify-center">
                    <button
                        className="bg-blue-800 p-0 rounded-lg flex items-center justify-center w-12 h-12"
                        title="Profile"
                    >
                        <ImProfile size={30} className="text-white" />
                    </button>
                </div>

                {/* Sheets icon */}
                <div className="mb-6 flex justify-center">
                    <button
                        className="bg-blue-800 p-0 rounded-lg flex items-center justify-center w-12 h-12"
                        title="Exercise List"
                    >
                        <FiFileText size={30} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Logout button at the bottom */}
            <div className="flex justify-center pb-4">
                <button
                    className="bg-blue-800 p-0 rounded-lg flex items-center justify-center w-12 h-12"
                    title="Logout"
                >
                    <FiLogOut size={30} className="text-white" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
