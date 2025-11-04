import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PrinciplesSection from './components/PrinciplesSection';
import YouthAgendaSection from './components/YouthAgendaSection';
import BiographySection from './components/BiographySection';
import ContactSection from './components/ContactSection';
import MediaCenter from './components/MediaCenter';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import AdminPage from './admin';

export default function App() {
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    // Check if current URL is admin page
    const path = window.location.pathname;
    setIsAdminPage(path === '/admin' || path === '/admin.html');

    // Handle popstate for browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      setIsAdminPage(path === '/admin' || path === '/admin.html');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple client-side routing
  if (isAdminPage) {
    return (
      <>
        <AdminPage />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PrinciplesSection />
      <YouthAgendaSection />
      <BiographySection />
      <ContactSection />
      <MediaCenter />
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}
