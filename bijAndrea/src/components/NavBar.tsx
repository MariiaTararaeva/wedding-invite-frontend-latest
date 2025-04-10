import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="bg-pink-100 p-4 flex justify-between items-center">
      <div className="text-2xl font-fancy">Andreas High Tea</div>
      <div className="space-x-4">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/services" className="hover:underline">Eat Me</NavLink>
        <NavLink to="/teas" className="hover:underline">Drink Me</NavLink>
        <NavLink to="/contact" className="hover:underline">Contact</NavLink>
        <NavLink to="/booking" className="ml-2 px-3 py-1 bg-blue-200 rounded hover:bg-blue-300">
          Boek Nu
        </NavLink>
      </div>
    </nav>
)}
