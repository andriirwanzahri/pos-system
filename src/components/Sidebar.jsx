import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TbTableFilled } from "react-icons/tb";
import { TiClipboard } from "react-icons/ti";
import SpeedDial from "./utils/SpeedDial";

const Sidebar = () => {
  return (
    <aside className="w-20 text-xs h-screen shadow">
      <div className="p-4 flex flex-col h-screen justify-between items-center">
        <ul>
          <img className="w-20 mb-10" src="images/LOGO-LOEN2.png" alt="" />
          <li>
            <NavLink
              end
              className={({ isActive }) =>
                isActive ? "active-btn-sidebar" : "btn-sidebar"
              }
              to="/"
            >
              {<GoHome size={35} />}
              {/* Home */}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tables"
              className={({ isActive }) =>
                isActive ? "active-btn-sidebar" : "btn-sidebar"
              }
            >
              {<TbTableFilled size={35} />}
              {/* Tables */}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "active-btn-sidebar" : "btn-sidebar"
              }
            >
              {<TiClipboard size={35} />}
              {/* Orders */}
            </NavLink>
          </li>
        </ul>
        <div className="mb-0 ">
          <SpeedDial />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
