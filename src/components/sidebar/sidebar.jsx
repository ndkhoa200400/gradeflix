import { NavLink } from "react-router-dom";
import { Row, Container, Nav, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";

const SideBar = ({ id, gradeid, setReview}) => {
  const [reviews, setReviews] = useState([]);
  const getGradeBoards = async () => {
    try {
      const res = await getApiMethod("classrooms/" + id + "/grade-reviews");
      console.log(res);
      setReviews(res);

    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getGradeBoards();

  }, []);
  return (
    reviews.map(item => (
      <a onClick={()=>setReview(item)} class={"list-group-item list-group-item-action flex-column align-items-start" + (item.id.toString() === gradeid.toString() ? " active" : "")} >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1" >Phúc Khảo {item.currentGrade.name}</h5>
      </div>
      <div className="user-info">
        <img
          src={item.user.avatar ?? "/default-avatar.png"}
          width={24}
          height={24}
          className="me-2"
          alt="member avatar"
        ></img>
        {item.user.fullname}{" "}
      </div>
      <p class="text-end">{item.status}</p>

    </a>
    ))
  );
};

export default SideBar;
