import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DownloadSection from './components/DownloadSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import DeveloperGuide from './pages/DeveloperGuide';

const Home = () => (
    <>
        <Navbar />
        <Hero />
        <DownloadSection />
        <AboutSection />
        <Footer />
    </>
);

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-slate-900 font-sans selection:bg-primary/20 selection:text-primary">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/developer-guide" element={<DeveloperGuide />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
