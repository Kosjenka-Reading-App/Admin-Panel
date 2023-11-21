import AdminForm from "../components/AdminForm";
import SidebarWrapper from "./SidebarWrapper";

export default function CreateAdminPage() {
  return <SidebarWrapper page={<AdminForm />} />;
}
