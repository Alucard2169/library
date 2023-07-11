import { CiSearch } from "react-icons/ci";
import Card from "../components/Card";

const SearchPage = () => {
  return (
    <div className="h-full w-full bg-MAIN_BG">
      <div className="h-fit">
        <form className="relative w-1/4 flex items-center">
                  <label htmlFor="searchQuery" className="absolute left-2">
                      <CiSearch className="text-white text-2xl font-bold"/>
          </label>
          <input
            type="text"
            id="searchQuery"
            className="w-full p-2 pl-12 rounded-full bg-COMPONENT_BG text-white outline-none border-none focus:outline-white font-semibold text-lg"
          />
        </form>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-12 px-12">
              <Card/>
              <Card/>
              <Card/>
              <Card/>
          </div>
    </div>
  );
};

export default SearchPage;
