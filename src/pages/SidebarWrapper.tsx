import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

export default function SidebarPage({ page }: { page: React.ReactNode }) {
  const location = useLocation();
  const auth = useAuth();
  const baseRoute = location.pathname.split("/")[1];

  return auth.loading ? (
    <></>
  ) : (
    <div className="flex w-full">
      <div className="w-16">
        <Sidebar activeRoute={baseRoute} auth={auth} />
      </div>
      <div className="flex-grow w-full">{page}</div>
    </div>
  );
}
