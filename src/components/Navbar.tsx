import {useContext} from 'react'
import homepageLogo from '../assets/homeIcon.png'
import {BiSolidUser} from 'react-icons/bi'
import { CiSearch } from "react-icons/ci"
import { CgDarkMode } from 'react-icons/cg'
import {Link} from 'react-router-dom'
import { authForm } from '../../contexts/AuthFormContext'

const Navbar = () => {
  const contextValue = useContext(authForm);
  const { setState } = contextValue || {}; // Perform null check

  return (
    <nav className="h-screen w-fit py-4 px-2 border-r-2 border-COMPONENT_BG ">
      <ul className="flex flex-col h-full justify-between">
        <li>
          <div className="flex flex-col gap-6 items-center">
            <Link to="/">
              {" "}
              <img
                src={homepageLogo}
                alt="homepage logo"
                className="w-10 h-10"
              />
            </Link>

            <div className="bg-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer">
              <BiSolidUser
                className="w-6 h-6 hover:text-COMPONENT_BG transition-all duration-200 ease"
                onClick={() => setState && setState(true)}
              />
            </div>
          </div>
        </li>
        <li>
          <Link to="/search">
            <CiSearch className="text-white text-3xl w-10 h-10 bg-COMPONENT_BG p-2 rounded-md cursor-pointer transition-all duration-200 ease-in hover:rounded-3xl hover:bg-gray-600" />
          </Link>
        </li>

        <li>
          <CgDarkMode className="text-white w-8 h-8 bg-COMPONENT_BG rounded-full hover:text-black cursor-pointer transition-all duration-200 ease-in hover:bg-gray-600" />
        </li>
      </ul>
    </nav>
  );
}
 
export default Navbar;