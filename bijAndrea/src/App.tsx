import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicesList from "./pages/Services/ServicesList";
import ServiceDetail from "./pages/Services/ServicesDetail";
import TeasList from "./pages/Teas/TeasList";
import TeaDetail from "./pages/Teas/TeaDeatails";
import Rooms from "./pages/Rooms";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="/teas" element={<TeasList />} />
        <Route path="/teas/:teaSlug" element={<TeaDetail />} />
        <Route path="/rooms" element={<Rooms />} /> 
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
