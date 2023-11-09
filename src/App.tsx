import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExercisePage from "./pages/ExercisePage";

function App() {
  return (
    <main className="w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/exercises" />} />
          <Route path="/exercises" element={<ExercisePage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
