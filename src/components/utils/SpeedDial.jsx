import { useState } from "react";
import { RiSettings3Fill } from "react-icons/ri";

function SpeedDial() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div
        id="speed-dial-menu-dropdown-alternative-square"
        className={`z-20 absolute left-20 bottom-10 mt-2 ${
          isMenuOpen ? "block" : "hidden"
        } py-1 mb-4 space-y-2 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600`}
      >
        <ul className="text-sm text-gray-500 dark:text-gray-300">
          <li>
            <a
              href="#"
              className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600"
            >
              <span className="text-sm font-medium">Keluar</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600"
            >
              <span className="text-sm font-medium">Jumlah Data</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="text-sm font-medium">Add comment</span>
            </a>
          </li>
        </ul>
      </div>
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        className="btn-sidebar"
      >
        
        <RiSettings3Fill size={35} />
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
}

export default SpeedDial;
