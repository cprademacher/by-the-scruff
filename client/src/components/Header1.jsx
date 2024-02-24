import { Link } from "react-router-dom";
import { useState } from "react";
import BarsIcon from "./icons/Bars";

export default function Header1() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const navClasses = `styled-nav mobile-nav ${
    mobileNavActive ? "visible" : "hidden"
  }`;

  return (
    <header className="styled-header">
      <div className="center">
        <div className="wrapper">
          <Link to="/" className="logo">
            Driftwood Clothing Co.
          </Link>
          <nav className={navClasses}>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMobileNavActive((prev) => !prev)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="nav-link"
              onClick={() => setMobileNavActive((prev) => !prev)}
            >
              All Products
            </Link>
            {/* <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/account" className="nav-link">Account</Link> */}
            <Link
              to="/cart"
              className="nav-link"
              onClick={() => setMobileNavActive((prev) => !prev)}
            >
              Cart ({/*cartProducts.length*/})
            </Link>
          </nav>
          <button
            onClick={() => setMobileNavActive((prev) => !prev)}
            className="nav-button"
          >
            <BarsIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
