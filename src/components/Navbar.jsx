import { NavLink } from 'react-router-dom'
import { useThree } from "@react-three/fiber"
import * as THREE from "three"

const Navbar = () => {
  return (
    <header clasName="header">
        <nav className="flex text-lg gap-10 font-medium bg-transparent fixed shadow-md w-full z-50">
        
            <span className="flex justify-start">
                <NavLink to="/" className="w-10 h-10 rounded-lg bg-* flex font-bold shadow-md">
                    <p className="blue-gradient_text">MW</p>
                </NavLink>
            </span>
            
        
            <span className="flex justify-end text-lg gap-7 font-medium mt-1">
                <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}> 
                    About
                </NavLink>

                <NavLink to="/projects" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}> 
                    Projects
                </NavLink>

                <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}> 
                    Contact
                </NavLink>
            </span>
        </nav>
    </header>
  )
}

export default Navbar