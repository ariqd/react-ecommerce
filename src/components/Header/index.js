import "./styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import Logo from "../../assets/logo.png";

const Header = ({ currentUser }) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Atalla Logo" />
          </Link>
        </div>
        <div className="callToActions">
          {currentUser ? (
            <ul>
              <li>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => auth.signOut()}
                >
                  LOGOUT
                </span>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
