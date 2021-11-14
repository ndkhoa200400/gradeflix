import React from "react";
import Avatar from "../Avatar/Avatar.component";
import { Link } from "react-router-dom";
const TopNavigation = ({ title, titleLink }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3">
      <div className="container-fluid">
        {titleLink ? (
          <Link
            className="navbar-brand d-flex align-items-center"
            to={titleLink}
          >
            <img src="/logo.png" alt="" width={24} height={24} />
            <span className="font-weight-bold">{title}</span>
          </Link>
        ) : (
          <div className="navbar-brand d-flex align-items-center">
            <img src="/logo.png" alt="" width={24} height={24} />
            <span className="font-weight-bold">{title}</span>
          </div>
        )}
      </div>
      <Avatar/>
    </nav>
  );
};
export default TopNavigation;
