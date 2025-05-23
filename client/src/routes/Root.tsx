import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';

const Root: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
        <BackToTopButton />
      <Footer />
    </div>
  );
};
export default Root;
