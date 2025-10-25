import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Surveys from './pages/Surveys';
import CreateSurvey from './pages/CreateSurvey';
import SurveyResponse from './pages/SurveyResponse';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/surveys"
        element={
          <ProtectedRoute>
            <Surveys />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-survey"
        element={
          <ProtectedRoute>
            <CreateSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="/surveys/:id"
        element={
          <ProtectedRoute>
            <SurveyResponse />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/surveys" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
