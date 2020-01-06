import * as React from "react";
import { Link } from "react-router-dom";
import {
  REPOSITORIES_ROUTE,
  PROFILE_ROUTE,
  HOME_ROUTE
} from "../constants/routes";

const routes = [
  {
    label: "Home",
    to: HOME_ROUTE
  },
  {
    label: "Profile",
    to: PROFILE_ROUTE
  },
  {
    label: "Repositories",
    to: REPOSITORIES_ROUTE
  }
];

const Navigation = () => {
  return (
    <nav>
      <ul>
        {routes.map(({ to, label }) => {
          return (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
