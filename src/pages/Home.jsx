import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import UpdatesSection from '../components/UpdatesSection';
import RetireeStats from '../components/RetireeStats';
import PeopleGrid from '../components/PeopleGrid';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import sl4 from '../assets/sl4.jpg';

export default function Home() {
  return (
    <div className="page active" id="home">
      <NavBar />
      <Hero />
      <div style={{ position: 'relative', overflow: 'hidden', padding: '40px 0' }}>
        <div style={{ position: 'absolute', top: -20, left: -20, right: -20, bottom: -20, zIndex: -1, background: `url(${sl4}) center/cover no-repeat`, filter: 'blur(16px)', opacity: 0.6 }}></div>

        <div className="container main-grid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="top-row">
            <UpdatesSection />
            <RetireeStats />
          </div>
          <PeopleGrid />
          <Gallery />
        </div>
      </div>
      <Footer />
    </div>
  );
}
