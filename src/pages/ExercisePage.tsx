// src/pages/ExercisePage.tsx

import ExerciseList from "../components/tables/ExerciseList";
import SidebarWrapper from "./SidebarWrapper";

const ExercisePage = () => {
  return <SidebarWrapper page={<ExerciseList />} />;
};
export default ExercisePage;
