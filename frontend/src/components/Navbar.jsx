import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => {
              navigate(`/properties/search/${search}`);
            }}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            List a Room
          </a>
        ) : (
          <a href="/login" className="host">
            List a Room
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
          ref={buttonRef}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
            alt="hamburger"
          />
        </button>

        {dropdownMenu && (
          <div className="navbar_right_accountmenu" ref={dropdownRef}>
            {user ? (
              <>
                <Link to={`/${user._id}/trips`}>Trip List</Link>
                <Link to={`/${user._id}/wishList`}>Wish List</Link>
                <Link to={`/${user._id}/properties`}>Property List</Link>
                <Link to={`/${user._id}/reservations`}>Reservation List</Link>
                <Link to="/create-listing">Become A Host</Link>
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch(setLogout());
                  }}
                >
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
