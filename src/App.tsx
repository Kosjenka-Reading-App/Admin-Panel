import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExercisePage from "./pages/ExercisePage";
import AdminPage from "./pages/AdminsPage";
import CategoriesPage from "./pages/CategoriesPage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <main className="w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admins" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admins"
            element={<ProtectedRoute element={<AdminPage />} />}
          />

          <Route
            path="/categories"
            element={<ProtectedRoute element={<CategoriesPage />} />}
          />

          <Route
            path="/exercises"
            element={<ProtectedRoute element={<ExercisePage />} />}
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
