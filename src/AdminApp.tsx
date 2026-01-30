/**
 * DivinityAGI Admin Dashboard - Standalone Application
 * 
 * This is a separate admin application for monitoring DivinityAGI app usage.
 * Deploy this independently from the main DivinityAGI app.
 * 
 * Features:
 * - Real-time event monitoring
 * - User analytics and metrics
 * - Verified Leader application tracking
 * - Subscription and revenue analytics
 * - Export and reporting capabilities
 */

import React, { useState } from "react";
import { AdminMonitoringProvider } from "./components/admin-monitoring-context";
import { AdminDashboardPage } from "./components/admin-dashboard-page";
import { AdminLoginPage } from "./components/admin-login-page";
import { Toaster } from "sonner@2.0.3";

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if admin is already logged in
    const stored = localStorage.getItem('divinityagi_admin_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        // Check if session is still valid (24 hours)
        if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
          return true;
        }
      } catch (e) {
        console.error('Invalid admin session');
      }
    }
    return false;
  });

  const handleLogin = (password: string) => {
    // In production, validate against your secure admin password
    // For now, using environment variable or hardcoded value
    const ADMIN_PASSWORD = "DivinityAGI2024Admin!"; // CHANGE THIS!
    
    if (password === ADMIN_PASSWORD) {
      // Store session
      localStorage.setItem('divinityagi_admin_session', JSON.stringify({
        timestamp: Date.now(),
        authenticated: true
      }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('divinityagi_admin_session');
    setIsAuthenticated(false);
  };

  const handleBackFromLogin = () => {
    // Navigate back to main app profile page
    window.location.href = '/?tab=profile';
  };

  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
      
      <AdminMonitoringProvider>
        <div className="min-h-screen bg-[#0B1426]">
          {isAuthenticated ? (
            <AdminDashboardPage onBack={handleLogout} />
          ) : (
            <AdminLoginPage onLogin={handleLogin} onBack={handleBackFromLogin} />
          )}
        </div>
      </AdminMonitoringProvider>
    </>
  );
}