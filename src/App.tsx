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
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isLoggedIn, loading } = useAuth();

  return (
    <main className="w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admins" />} />
          <Route
            path="/login"
            element={!loading && isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/admins"
            element={
              <ProtectedRoute
                element={<AdminPage />}
                loading={loading}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute
                element={<CategoriesPage />}
                loading={loading}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/exercises"
            element={
              <ProtectedRoute
                element={<ExercisePage />}
                loading={loading}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
