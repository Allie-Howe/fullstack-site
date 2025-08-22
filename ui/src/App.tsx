import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import NavigationBar from './components/NavigationBar';
import './App.css';

// TODO: Finish moving login/register to modal instead of pages
function App() {
  return <AuthProvider>
    <NavigationBar />
    <main className="main-content">
      <HomePage />
    </main>
  </AuthProvider>;
}

export default App;
