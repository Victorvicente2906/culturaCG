import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EventsProvider } from './contexts/EventsContext';
import { UserRole } from './types';
import HomePage from './pages/public/HomePage';
import AgendaPage from './pages/public/AgendaPage';
import EventDetailPage from './pages/public/EventDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import OrganizerEventsPage from './pages/organizer/OrganizerEventsPage';
import OrganizerNewEventPage from './pages/organizer/OrganizerNewEventPage';
import OrganizerEditEventPage from './pages/organizer/OrganizerEditEventPage';
import OrganizerProfilePage from './pages/organizer/OrganizerProfilePage';
import CuratorEventsPage from './pages/curator/CuratorEventsPage';
import CuratorEventDetailPage from './pages/curator/CuratorEventDetailPage';
import CuratorProfilePage from './pages/curator/CuratorProfilePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminCuratorsPage from './pages/admin/AdminCuratorsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

function ProtectedRoute({ allowedRoles, children }: { allowedRoles: UserRole[]; children: React.ReactNode }) {
  const { user, isRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isRole(allowedRoles)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/eventos/:id" element={<EventDetailPage />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'curator' ? '/curador/eventos' : '/organizador/eventos'} replace /> : <LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route
          path="/organizador/eventos"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <OrganizerEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizador/eventos/novo"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <OrganizerNewEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizador/eventos/:id/editar"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <OrganizerEditEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizador/perfil"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <OrganizerProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/curador/eventos"
          element={
            <ProtectedRoute allowedRoles={['curator']}>
              <CuratorEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/curador/eventos/:id"
          element={
            <ProtectedRoute allowedRoles={['curator']}>
              <CuratorEventDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/curador/perfil"
          element={
            <ProtectedRoute allowedRoles={['curator']}>
              <CuratorProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/eventos"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/curadores"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminCuratorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categorias"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminCategoriesPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <AppRoutes />
      </EventsProvider>
    </AuthProvider>
  );
}
