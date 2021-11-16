import React from "react";
import {useNavigate, Link} from 'react-router-dom';
const ClassroomCard = ({ classroom }) => {
  const maxLength = 80;
  classroom.description =
    classroom?.description?.length > maxLength
      ? classroom.description.substring(0, maxLength) + "..."
      : classroom.description;
  return classroom ? (
    <div className="card classroom-item m-3">
      <div
        className="header d-flex flex-column justify-content-between"
        href="#"
      >
       
        <img
          src={classroom.banner}
          alt="classroom banner"
          className="classroom-banner img-fluid card-img-top"
        />
         <div className="dark-overlay"></div>

        <Link className="classroom-name font-weight-bold text-truncate" to={"/classrooms/"+classroom.id + "/tab-detail"}>
          <span>{classroom.name}</span>
          <br/>
          <span className="classroom-subject">{classroom.subject}</span>
        </Link>


        <div className="classroom-host">Thầy X</div>
      </div>
      {/* <div className="card-body">{classroom.description}</div> */}
      <div className="card-body">{classroom.description}</div>
    </div>
  ) : null;
};

export default ClassroomCard;
