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
import CreateAdminPage from "./pages/CreateAdminPage";
import CreateExercisePage from "./pages/CreateExercisePage";
import { ADMIN_PERMISSIONS } from "./constants/permissions";
import EditExercisePage from "./pages/EditExercisePage";
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";

function App() {
  return (
    <main className="w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admins" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admins"
            element={
              <ProtectedRoute
                element={<AdminPage />}
                permissionLevel={ADMIN_PERMISSIONS.SUPERADMIN}
              />
            }
          />

          <Route
            path="/admins/create"
            element={
              <ProtectedRoute
                element={<CreateAdminPage />}
                permissionLevel={ADMIN_PERMISSIONS.SUPERADMIN}
              />
            }
          />

          <Route
            path="/admins/confirm"
            element={
              <ResetPasswordConfirm
                title="Confirm account"
                label="Set password"
                buttonText="Create account"
              />
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute
                element={<CategoriesPage />}
                permissionLevel={ADMIN_PERMISSIONS.ADMIN}
              />
            }
          />

          <Route
            path="/categories/create"
            element={
              <ProtectedRoute
                element={<CreateCategoryPage />}
                permissionLevel={ADMIN_PERMISSIONS.ADMIN}
              />
            }
          />
          <Route
            path="/categories/:oldCategory/edit"
            element={
              <ProtectedRoute
                element={<EditCategoryPage />}
                permissionLevel={ADMIN_PERMISSIONS.ADMIN}
              />
            }
          />
          <Route
            path="/exercises"
            element={
              <ProtectedRoute
                element={<ExercisePage />}
                permissionLevel={ADMIN_PERMISSIONS.ADMIN}
              />
            }
          />
          <Route
            path="/exercises/create"
            element={
              <ProtectedRoute
                element={<CreateExercisePage />}
                permissionLevel={ADMIN_PERMISSIONS.ADMIN}
              />
            }
          />
          <Route
            path="/exercises/:id/edit"
            element={
              <ProtectedRoute
                element={<EditExercisePage />}
                permissionLevel={ADMIN_PERMISSIONS.ADMIN}
              />
            }
          />

          <Route path="/password/reset" element={<ResetPasswordRequest />} />

          <Route
            path="/password/confirm"
            element={
              <ResetPasswordConfirm
                title="Reset password"
                label="New password"
                buttonText="Set new password"
              />
            }
          />

          <Route path="/404" element={<h1>404 Not Found</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
