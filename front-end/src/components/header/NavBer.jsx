import { FaHome, FaKey } from "react-icons/fa";
import { IoIosMan } from "react-icons/io";
import { NavLink } from "react-router-dom";

const NavBer = () => {
  return (
    <ul className="menu static w-40">
      <li>
        <NavLink to="/">
          <FaHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/employees">
          <IoIosMan />
          Employees
        </NavLink>
      </li>
      <li>
        <NavLink to="/addEmployee">
        <FaKey />
          AddEmployee
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBer;
