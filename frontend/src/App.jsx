import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About"; 
import Contact from "./components/Contact"; 
import Login from "./components/Login"; 
import Subscribe from "./components/Subscribe"; 
import Articles from "./components/Articles"; 
import Payment from "./components/Payment";
import Magazines from "./components/Magazines"; 
import Blogs from "./components/Blogs"; 
import Home from "./components/Home"; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-200 to-gray-200">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow px-4 sm:px-8 md:px-16 lg:px-24">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} /> 
            <Route path="/Contact" element={<Contact />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/Subscribe" element={<Subscribe />} />
            <Route path="/Articles" element={<Articles />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/Magazines" element={<Magazines />} />
            <Route path="/Blogs" element={<Blogs />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
