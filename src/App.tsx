import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthScreen } from './pages/AuthScreen';
import { HomeScreen } from './pages/HomeScreen';
import { ChatScreen } from './pages/ChatScreen';
import { ContactsScreen } from './pages/ContactsScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { useAppStore } from './store/useAppStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppStore(state => state.user);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const user = useAppStore(state => state.user);
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/" replace /> : <AuthScreen />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat/:id" 
          element={
            <ProtectedRoute>
              <ChatScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contacts" 
          element={
            <ProtectedRoute>
              <ContactsScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsScreen />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-full bg-black text-white selection:bg-white selection:text-black">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
