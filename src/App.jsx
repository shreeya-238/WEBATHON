import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/index.jsx';
import Category from './pages/category/index.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import CompanyLogin from './pages/auth/CompanyLogin.jsx';
import CompanySignup from './pages/auth/CompanySignup.jsx';
import AdminLogin from './pages/auth/AdminLogin.jsx';
import AdminSignup from './pages/auth/AdminSignup.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

function App() {
  return (
    <Router>
              <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/signup" element={<CompanySignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
