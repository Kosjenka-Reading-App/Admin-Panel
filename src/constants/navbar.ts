import { FiFileText } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { BsBoxFill } from "react-icons/bs";
import { ADMIN_PERMISSIONS } from "./permissions";

const ROUTES = [
  {
    path: "/admins",
    name: "Admins",
    icon: LuUsers,
    permission: ADMIN_PERMISSIONS.SUPERADMIN,
  },
  {
    path: "/exercises",
    name: "Exercises",
    icon: FiFileText,
    permission: ADMIN_PERMISSIONS.ADMIN,
  },
  {
    path: "/categories",
    name: "Categories",
    icon: BsBoxFill,
    permission: ADMIN_PERMISSIONS.ADMIN,
  },
];

export { ROUTES };
