
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AuthForm from "./pages/AuthForm";
function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<AuthForm activeTab="register" />} />
        <Route path="/login" element={<AuthForm activeTab="login" />} />
        <Route path="/*" element={<NotFound />} />
      </Routes >
    </Router >
  );
};

export default RoutesApp;