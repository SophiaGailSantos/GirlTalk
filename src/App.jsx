import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { getProfile } from './data/profile.js'

import Navbar from './components/Navbar.jsx'
import AppNavbar from './components/AppNavbar.jsx'
import RevealFX from './components/RevealFX.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import TrackerPreview from './components/TrackerPreview.jsx'
import ArticlesPreview from './components/ArticlesPreview.jsx'
import Topics from './components/Topics.jsx'
import Reminders from './components/Reminders.jsx'
import Tips from './components/Tips.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import Footer from './components/Footer.jsx'

import Login from './pages/Login.jsx'
import AuthCallback from './pages/AuthCallback.jsx'
import Welcome from './pages/Welcome.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Tracker from './pages/Tracker.jsx'
import Articles from './pages/Articles.jsx'
import TopicsPage from './pages/Topics.jsx'
import Onboarding from './pages/Onboarding.jsx'
import CommunityPage from './pages/Community.jsx'
import Profile from './pages/Profile.jsx'
import Info from './pages/Info.jsx'

/* ---------- Public homepage (logged-out landing) ---------- */
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TrackerPreview />
        <ArticlesPreview />
        <Topics />
        <Reminders />
        <Tips />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}

/* ---------- Scroll to top (or to the hash section) on route change ---------- */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/* ---------- Routes that require an account ---------- */
function ProtectedRoute({ children, allowSetup = false }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="route-loading">
        <span className="route-loading-dot" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  // New members must finish setup before they see the app.
  if (!allowSetup && !isSetupDone(user.id)) return <Navigate to="/setup" replace />

  return children
}

/* True once the member has completed first-time setup. */
function isSetupDone(userId) {
  try {
    return Boolean(getProfile(userId).setupDone)
  } catch {
    return true
  }
}

/* ---------- Routes only for logged-out visitors ---------- */
function PublicOnlyRoute({ children, redirectTo = '/dashboard' }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="route-loading">
        <span className="route-loading-dot" />
      </div>
    )
  }

  if (user) return <Navigate to={redirectTo} replace />
  return children
}

/* ---------- Homepage is only for logged-out visitors ---------- */
function HomeOnlyRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="route-loading">
        <span className="route-loading-dot" />
      </div>
    )
  }

  if (user) {
    return <Navigate to={isSetupDone(user.id) ? '/dashboard' : '/setup'} replace />
  }
  return children
}

/* ---------- Authenticated app shell (navbar + page) ---------- */
function AppLayout({ children }) {
  return (
    <div className="app-theme-dark">
      <AppNavbar />
      <main>{children}</main>
    </div>
  )
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public homepage (logged-in users go straight to the dashboard) */}
      <Route
        path="/"
        element={
          <HomeOnlyRoute>
            <HomePage />
          </HomeOnlyRoute>
        }
      />

      {/* Auth pages (only when logged out) */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      {/* Signup lives on the same Google-only screen as login. */}
      <Route path="/signup" element={<Navigate to="/login" replace />} />

      {/* Supabase email confirmation / magic link landing */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* First-time setup — new members land here until setup is done */}
      <Route
        path="/setup"
        element={
          <ProtectedRoute allowSetup>
            <div className="app-theme-dark">
              <Onboarding />
            </div>
          </ProtectedRoute>
        }
      />

      {/* Onboarding (after signup, before dashboard) */}
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      />

      {/* Logged-in experience */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tracker"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Tracker />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/topics"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TopicsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/articles"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Articles />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CommunityPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Static information pages */}
      <Route path="/about" element={<Info page="about" />} />
      <Route path="/contact" element={<Info page="contact" />} />
      <Route path="/privacy" element={<Info page="privacy" />} />
      <Route path="/terms" element={<Info page="terms" />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RevealFX />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
