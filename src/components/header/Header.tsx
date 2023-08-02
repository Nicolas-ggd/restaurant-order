import { Link, useNavigate } from "react-router-dom";
import React, { FormEvent } from "react";
import axios from "axios";
import { Switcher } from "../../utils/Switcher";

interface HeaderProps {
  setIsSearch: (value: string) => void;
  isSearch: string;
}

export const Header: React.FC<HeaderProps> = ({ isSearch, setIsSearch }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const searchOrder = (e: FormEvent<HTMLInputElement>) => {
    setIsSearch(e.currentTarget.value);
  }

  const sendSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearch("");
  } 

  const userLogOut = async () => {
    await axios
      .post(`https://restaurant-order-4hbo.onrender.com/logout`, {
        userId: userId,
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userId");
        navigate("/");
      });
  };
  return (
    <div
      className="bg-white transition duration-300 border-gray-200 px-4 lg:px-6 py-8 dark:bg-gray-900"
      style={{ position: "fixed", width: "100%", top: 0, zIndex: 999 }}
    >
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link to="/restaurant" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Home
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          <form onSubmit={sendSearch} className="flex items-center">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="bg-gray-50 outline-none transition duration-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Orders..."
                value={isSearch}
                onChange={searchOrder}
                required
              />
            </div>
          </form>
          <a
            onClick={userLogOut}
            className="block mx-5 pr-5 ml-5 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
          >
            Log Out
          </a>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <Switcher />
        </div>
      </div>
    </div>
  );
};
