import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';  // Fixed path
import LoginPage from './components/Login';       // Fixed path
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Add a default route if needed */}
        <Route path="/" element={<LoginPage />} />  {/* Or your homepage component */}
        
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Optional: Add a 404 route for undefined paths */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;