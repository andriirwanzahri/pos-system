import Search from "./utils/Search";
import { PropTypes } from "prop-types";

const Navbar = ({ title, searchPlaceholder }) => (
  <nav className="border-b mx-4 py-4">
    <div className="container flex justify-between items-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="-space-x-4">
        <Search placeholder={searchPlaceholder} />
      </div>
    </div>
  </nav>
);

export default Navbar;

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
};
