import React from "react";
const TopNavigation = ({ title, titleLink }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3">
      <div className="container-fluid">
        {titleLink ? (
          <a
            className="navbar-brand d-flex align-items-center"
            href={titleLink}
          >
            <img src="/logo.png" alt="" width={24} height={24} />
            <span className="font-weight-bold">{title}</span>
          </a>
        ) : (
          <div className="navbar-brand d-flex align-items-center">
            <img src="/logo.png" alt="" width={24} height={24} />
            <span className="font-weight-bold">{title}</span>
          </div>
        )}
      </div>
    </nav>
  );
};
export default TopNavigation;
