import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExercisePage from "./pages/ExercisePage";
import AdminPage from "./pages/AdminsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AdminForm from "./components/AdminForm";

function App() {
  return (
    <main className="w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admins" />} />
          <Route path="/admins" element={<AdminPage />} />
          <Route path="/admins/create" element={<AdminForm />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/exercises" element={<ExercisePage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
