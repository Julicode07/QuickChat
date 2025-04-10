
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ChatInfo from "./pages/[Chat]";

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/chat/:id" element={<ChatInfo />} />
      </Routes >
    </Router >
  );
};

export default RoutesApp;