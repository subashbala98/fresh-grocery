import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./Header.css";
const navLink = [
  { path: "/", title: "All" },
  { path: "list", title: "List of Products" },
  { path: "add", title: "Add Products" },
];
const Header = () => (
  <div className="nav_container">
    <nav className="flex justify-content-evenly align-items-center">
      <div className="logo_container">
        <a href="/">
          <img className="applogo" alt="logo" src={logo} />
        </a>
      </div>
      <div className="list_container">
        <ul>
          <li>
            {navLink.map((list, i) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? `px-4 py-3 activeLink` : "px-4 py-3"
                }
                key={i}
                to={list.path}
                children={list.title}
              />
              // className="px-4 py-3"
            ))}
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
export default Header;
