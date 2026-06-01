import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import UpdatesSection from '../components/UpdatesSection';
import DownloadApp from '../components/DownloadApp';
import PeopleGrid from '../components/PeopleGrid';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="page active" id="home">
      <NavBar />
      <Hero />
      <div className="container main-grid">
        <div className="top-row">
          <UpdatesSection />
          <DownloadApp />
        </div>
        <PeopleGrid />
        <Gallery />
      </div>
      <Footer />
    </div>
  );
}
