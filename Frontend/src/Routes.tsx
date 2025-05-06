import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import { RequireAuth } from './context/RequireAuth';
import Loader from './components/Loader';
import DelayedFallback from './components/DelayedFallback';

import AuthForm from "./pages/AuthForm";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function RoutesApp() {
  return (
    <Router>
      <AuthProvider>
        <DelayedFallback delay={2000} fallback={<Loader />}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route path="/register" element={<AuthForm activeTab="register" />} />
              <Route path="/login" element={<AuthForm activeTab="login" />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </DelayedFallback>
      </AuthProvider>
    </Router>
  );
}

export default RoutesApp;
