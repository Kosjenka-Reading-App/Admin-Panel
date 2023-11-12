import CategoriesList from "../components/tables/CategoriesList";
import SidebarWrapper from "./SidebarWrapper";

const CategoriesPage = () => {
  return <SidebarWrapper page={<CategoriesList />} />;
};
export default CategoriesPage;
