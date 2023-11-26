import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import the Link component
import SidebarLink from "./SidebarLink";
import { AuthData } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/navbar";
import { ADMIN_PERMISSIONS_VALUE } from "../../constants/permissions";
import { logOut } from "../../services/auth";

const Sidebar = ({
  activeRoute,
  auth,
}: {
  activeRoute: string;
  auth: AuthData;
}) => {
  const allowedRoutes = ROUTES.filter(
    (route) =>
      ADMIN_PERMISSIONS_VALUE[route.permission] <=
      ADMIN_PERMISSIONS_VALUE[auth.type!]
  );

  return (
    <div className="w-16 h-screen flex flex-col justify-between py-4 bg-navbar-color">
      <div>
        <div className="flex justify-center mt-4 mb-8">
          <div className="bg-custom-light-blue rounded-lg w-12 h-12 flex items-center justify-center">
            <span className="text-custom-blue text-3xl font-bold">K</span>
          </div>
        </div>
        {allowedRoutes.map((route) => (
          <SidebarLink
            key={route.path}
            active={activeRoute === route.path.split("/")[1]}
            to={route.path}
            icon={route.icon}
          />
        ))}
      </div>

      <div className="flex justify-center pb-4">
        <Link
          to="/login"
          className="bg-custom-dark-blue p-0 rounded-lg flex items-center justify-center w-12 h-12 hover:bg-custom-hover-blue transition"
          title="Logout"
          onClick={logOut}
        >
          <FiLogOut size={30} className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
