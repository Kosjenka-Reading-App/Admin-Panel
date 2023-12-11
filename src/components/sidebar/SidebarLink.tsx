import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface SidebarLinkProps {
  active: boolean;
  to: string;
  icon: IconType;
}

export default function SidebarLink({
  active,
  to,
  icon: Icon,
}: SidebarLinkProps) {
  const activeClass = active ? "border-2 border-custom-light-blue" : "";
  return (
    <div className="mb-6 flex justify-center">
      <Link
        id={`sidebar-${to}`}
        to={to}
        className={`${activeClass} p-0 rounded-lg bg-custom-dark-blue flex items-center justify-center w-12 h-12 hover:bg-custom-hover-blue transition`}
        title={to}
      >
        <Icon size={30} className="text-white" />
      </Link>
    </div>
  );
}
