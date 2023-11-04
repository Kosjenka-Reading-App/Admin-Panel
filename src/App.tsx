import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow bg-white"> {/* Here we apply the bg-white class to the main content area */}
        {/* Your main content */}
      </main>
    </div>
  );
}

export default App;
