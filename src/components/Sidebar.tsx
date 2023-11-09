import { FiLogOut, FiFileText } from 'react-icons/fi';
import { LuUsers } from 'react-icons/lu';
import { Link } from 'react-router-dom'; // Import the Link component

const Sidebar = () => {
    return (
        <div className="w-16 h-screen flex flex-col justify-between py-4 bg-custom-dark-blue">
            <div>
                {/* Square with rounded edges containing the "K" */}
                <div className="flex justify-center mt-4 mb-8">
                    <div className="bg-custom-blue rounded-lg w-12 h-12 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">K</span>
                    </div>
                </div>
                
                {/* Profile icon */}
                <div className="mb-6 flex justify-center">
                    <Link to="/profile" className="bg-custom-blue p-0 rounded-lg flex items-center justify-center w-12 h-12" title="Profile">
                        <LuUsers size={30} className="text-white" />
                    </Link>
                </div>

                {/* Sheets icon */}
                <div className="mb-6 flex justify-center">
                    <Link to="/exercises" className="bg-custom-blue p-0 rounded-lg flex items-center justify-center w-12 h-12" title="Exercise List">
                        <FiFileText size={30} className="text-white" />
                    </Link>
                </div>
            </div>

            {/* Logout button at the bottom */}
            <div className="flex justify-center pb-4">
                <Link to="/login" className="bg-custom-blue p-0 rounded-lg flex items-center justify-center w-12 h-12" title="Logout">
                    <FiLogOut size={30} className="text-white" />
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
