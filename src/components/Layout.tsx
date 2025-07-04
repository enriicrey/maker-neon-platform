
import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20 lg:pt-20 md:pt-16 sm:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
