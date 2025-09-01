import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Category from './pages/category';

// Auth Pages
import ConsumerSignup from './pages/auth/consumer-signup';
import ConsumerLogin from './pages/auth/consumer-login';
import CompanySignup from './pages/auth/company-signup';
import CompanyLogin from './pages/auth/company-login';
import AdminSignup from './pages/auth/admin-signup';
import AdminLogin from './pages/auth/admin-login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Category />} />
        
        {/* Consumer Authentication */}
        <Route path="/auth/consumer-signup" element={<ConsumerSignup />} />
        <Route path="/auth/consumer-login" element={<ConsumerLogin />} />
        
        {/* Company Authentication */}
        <Route path="/auth/company-signup" element={<CompanySignup />} />
        <Route path="/auth/company-login" element={<CompanyLogin />} />
        
        {/* Admin Authentication */}
        <Route path="/auth/admin-signup" element={<AdminSignup />} />
        <Route path="/auth/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
