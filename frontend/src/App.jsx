import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Subscribe from "./components/Subscribe";
import Articles from "./components/Articles";
import Magazines from "./components/Magazines";
import PaymentPage from "./components/PaymentPage";
import Home from "./components/Home";
import MyCollections from "./components/MyCollections";
import Userdash from "./components/Userdash";
import Events from "./components/Events";

// Admin Panel Components
import Viewarticle from "./Adminpanel/Viewarticle";
import Addarticle from "./Adminpanel/Addarticle";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow px-4 sm:px-8 md:px-16 lg:px-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Subscribe" element={<Subscribe />} />
            <Route path="/Articles" element={<Articles />} />
            <Route path="/Magazines" element={<Magazines />} />
            <Route path="/PaymentPage" element={<PaymentPage />} />
            <Route path="/MyCollections" element={<MyCollections />} />
            <Route path="/Userdash" element={<Userdash />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Adminpanel/Viewarticle" element={<Viewarticle />} />
            <Route path="/Adminpanel/Addarticle" element={<Addarticle />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
