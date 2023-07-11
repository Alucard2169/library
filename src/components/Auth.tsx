import { FC, useState, useContext ,MouseEvent} from "react";
import { authForm } from "../../contexts/AuthFormContext";
import {AiFillGoogleCircle} from 'react-icons/ai'



const Auth: FC = () => {
  const contextValue = useContext(authForm);
  const { state,setState } = contextValue || {}; // Perform null check

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

 const handleFormVisibility = (e: MouseEvent<HTMLDivElement>) => {
   const target = e.target as HTMLDivElement;
   const dataset = target.dataset?.set;
   if (dataset === "backdrop") {
    setState && setState(false);
   }
   return
 };


  return (
    <div
      onClick={(e) => handleFormVisibility(e)}
      className={`${
        !state ? "hidden" : null
      } fixed flex justify-center items-center w-screen h-screen bg-black bg-opacity-50`}
      data-set="backdrop"
    >
      <form className="flex flex-col bg-white rounded-lg gap-8 py-4 p-6">
        <h2 className="font-bold text-xl">Sign up</h2>

        <button className="py-1 px-4 text-white font-semibold rounded-full flex gap-2 justify-center items-center bg-COMPONENT_BG ">
          Sign-In using Google <AiFillGoogleCircle className="text-3xl" />
        </button>

        <div className="flex flex-col gap-4 mt-6">
          <label htmlFor="email" className="flex flex-col gap-2 ">
            <span className="text-sm">Email</span>
            <input
              type="email"
              className="py-2 px-3 text-xl border border-purple-600 focus:border-none outline-1 focus:outline-COMPONENT_BG rounded-full "
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-2 ">
            <span className="text-sm">Password</span>
            <input
              type="password"
              className="py-2 px-3 text-xl border border-purple-600 focus:border-none outline-1 focus:outline-COMPONENT_BG rounded-full "
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <input
            type="submit"
            value="SUBMIT"
            className="bg-COMPONENT_BG text-black rounded-full py-2 px-4 w-fit text-md cursor-pointer hover:bg-white hover:text-COMPONENT_BG transition-all duration-100 ease-in m-auto font-semibold"
          />
        </div>
      </form>
    </div>
  );
}
 
export default Auth;