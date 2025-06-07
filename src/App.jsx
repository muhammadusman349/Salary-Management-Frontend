import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';
import DepartmentPage from './pages/DepartmentPage';
import PositionPage from './pages/PositionPage';
import PositionDetail from './components/Employee/PositionDetail';
import DepartmentDetail from './components/Employee/DepartmentDetail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
          <Route path="/positions" element={<PositionPage />} />
          <Route path="/positions/:id" element={<PositionDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;