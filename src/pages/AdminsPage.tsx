import AdminList from "../components/tables/AdminList";
import SidebarWrapper from "./SidebarWrapper";

const AdminPage = () => {
  return <SidebarWrapper page={<AdminList />} />;
};
export default AdminPage;
