import { useState } from "react";
import { NavLink } from "react-router";

import "../styles/Navbar.css";

const navItems = [
  {
    label: "HOME",
    path: "/",
  },
  {
    label: "RESUME",
    path: "/resume",
  },
  {
    label: "PROJECTS",
    path: "/projects",
  },
  {
    label: "ABOUT ME",
    path: "/about",
  },
  {
    label: "CONTACT",
    path: "/contact",
  },
];

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <header className={`navbar ${collapsed ? "navbar--collapsed" : ""}`}>
      {!collapsed && (
        <div className="navbar__inner">
          <NavLink to="/" end className="navbar__brand">
            Mia'Zadai Navarro
          </NavLink>

          <nav
            className="navbar__links"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `navbar__link ${
                    isActive ? "navbar__link--active" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      <button
        type="button"
        className="navbar__collapse-button"
        aria-label={
          collapsed
            ? "Expand navigation"
            : "Collapse navigation"
        }
        title={
          collapsed
            ? "Expand navigation"
            : "Collapse navigation"
        }
        onClick={() => setCollapsed((current) => !current)}
      >
        {collapsed ? "▼" : "▲"}
      </button>
    </header>
  );
}

export default Navbar;