import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BrandProvider } from './theme/BrandContext'
import { useAuth } from './hooks/useAuth'
import { AppShell } from './components/layout/AppShell'
import { LoginPage } from './pages/auth/LoginPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { ResetSuccessPage } from './pages/auth/ResetSuccessPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { StatementsPage } from './pages/statements/StatementsPage'
import { TerminalListPage } from './pages/terminals/TerminalListPage'
import { EmployeeDirectoryPage } from './pages/employees/EmployeeDirectoryPage'
import { NewsPage } from './pages/news/NewsPage'
import { LibraryPage } from './pages/library/LibraryPage'
import { ReportsPage } from './pages/reports/ReportsPage'
import { SafetyPage } from './pages/safety/SafetyPage'
import { ToolsPage } from './pages/tools/ToolsPage'
import { EquipmentUnloadingPage } from './pages/tools/EquipmentUnloadingPage'
import { FeedbackPage } from './pages/tools/FeedbackPage'
import { AdminPage } from './pages/admin/AdminPage'

export default function App() {
  const { user, login, logout, setRole } = useAuth()
  const [showNotes, setShowNotes] = useState(false)

  const handleLogin = useCallback(() => {
    login()
  }, [login])

  return (
    <BrandProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes - no shell */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-success" element={<ResetSuccessPage />} />

          {/* App routes - with shell */}
          {user ? (
            <Route
              element={
                <AppShell
                  user={user}
                  onLogout={logout}
                  onSetRole={setRole}
                  showNotes={showNotes}
                  onToggleNotes={() => setShowNotes(!showNotes)}
                />
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="/statements" element={<StatementsPage />} />
              <Route path="/terminals" element={<TerminalListPage />} />
              <Route path="/employees" element={<EmployeeDirectoryPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/equipment" element={<EquipmentUnloadingPage />} />
              <Route path="/tools/safety" element={<SafetyPage />} />
              <Route path="/tools/feedback" element={<FeedbackPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </BrandProvider>
  )
}
