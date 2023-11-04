import { FiUsers, FiLogOut, FiFileText } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <div 
            className="w-16 h-screen flex flex-col justify-between py-4"
            style={{ backgroundColor: '#002D7E' }}
        >
            <div>
                {/* Square with rounded edges containing the "K" */}
                <div className="flex justify-center mt-4 mb-8">
                    <div className="bg-[#DEF2FF] rounded-lg w-12 h-12 flex items-center justify-center">
                        <span className="text-[#0099FF] text-3xl font-bold">K</span>
                    </div>
                </div>
                
                {/* Profile icon */}
                <div className="mb-6 flex justify-center">
                    <button
                        className="bg-[#003EAE] p-0 rounded-lg flex items-center justify-center"
                        title="Profile"
                        style={{ width: '3rem', height: '3rem' }}
                    >
                        <FiUsers size={30} style={{ color: 'white' }} />
                    </button>
                </div>

                {/* Sheets icon */}
                <div className="mb-6 flex justify-center">
                    <button
                        className="bg-[#003EAE] p-0 rounded-lg flex items-center justify-center"
                        title="Exercise List"
                        style={{ width: '3rem', height: '3rem' }}
                    >
                        <FiFileText size={30} style={{ color: 'white' }} />
                    </button>
                </div>
            </div>

            {/* Logout button at the bottom */}
            <div className="flex justify-center pb-4">
                <button
                    className="bg-[#003EAE] p-0 rounded-lg flex items-center justify-center"
                    title="Logout"
                    style={{ width: '3rem', height: '3rem' }}
                >
                    <FiLogOut size={30} style={{ color: 'white' }} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
