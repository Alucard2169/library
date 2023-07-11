import { FC } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import Auth from './components/Auth';
import { AuthFormProvider } from "../contexts/AuthFormContext";


const  App:FC = () => {
  return (
    <AuthFormProvider>
      <div className=" flex w-screen h-screen bg-MAIN_BG">
        <Navbar />
        <Auth />
        <div className="w-full px-4 py-2">
          <Outlet />
        </div>
      </div>
    </AuthFormProvider>
  );
}

export default App
