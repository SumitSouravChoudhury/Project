import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">Homepage</NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                <button>Register</button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <hr></hr>
    </header>
  );
}

export default Navbar;
