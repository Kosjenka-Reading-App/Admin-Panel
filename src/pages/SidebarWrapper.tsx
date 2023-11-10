import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

export default function SidebarPage({ page }: { page: React.ReactNode }) {
  const location = useLocation();
  const baseRoute = location.pathname.split("/")[1];

  return (
    <div className="flex w-full">
      <div className="w-16">
        <Sidebar activeRoute={baseRoute} />
      </div>
      <div className="flex-grow w-full">{page}</div>
    </div>
  );
}
