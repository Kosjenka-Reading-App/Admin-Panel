import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
// ... Import other components for your routes ...

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} /> // Add your ProfilePage component
        <Route path="/exercises" element={<ExercisesPage />} /> // Add your ExercisesPage component
        <Route path="/exercises/create" element={<CreateExercisePage />} /> // Add your CreateExercisePage component
        <Route path="/admins" element={<AdminsPage />} /> // Add your AdminsPage component
        <Route path="/admins/create" element={<CreateAdminPage />} /> // Add your CreateAdminPage component
        {/* ... other routes ... */}
      </Routes>
    </Router>
  );
}

export default App;
