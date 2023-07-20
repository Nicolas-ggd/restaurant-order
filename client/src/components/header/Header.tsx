import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Switcher } from "../../utils/Switcher";

export const Header = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const userLogOut = async () => {
    await axios
      .post("http://localhost:8000/logout", {
        userId: userId,
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userId");
        navigate("/");
      });
  };
  return (
    <>
      <header>
        <nav
          className="bg-white transition duration-300 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
          style={{ position: "fixed", width: "100%", top: 0, zIndex: 999 }}
        >
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/country" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Home
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
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
        </nav>
      </header>
    </>
  );
};
