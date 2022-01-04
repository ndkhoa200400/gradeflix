import { NavLink } from "react-router-dom";
import { Row, Container, Nav, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
import dayjs from "dayjs";
const State = {
  PENDING: 'Mới',
  PROCESSING: 'Đang thực hiện',
  FINAL: 'Hoàn thành',
};

const getState = (state) => {
  switch (state) {
    case "PENDING":
      return State.PENDING;
    case "PROCESSING":
      return State.PROCESSING;
    case "FINAL":
      return State.FINAL;
    default:
      return "";
  }
}


const SideBar = ({ id, gradeid, setReview }) => {
  const now = dayjs();
  const dayDifference = (item) => {
    return now.diff(dayjs(item.createdAt), "year") > 1
      ? `${now.diff(dayjs(item.createdAt), "year")} năm trước`
      : now.diff(dayjs(item.createdAt), "minute") < 1
        ? `Vừa xong`
        : now.diff(dayjs(item.createdAt), "minute") < 60
          ? `${now.diff(dayjs(item.createdAt), "minute")} phút trước`
          : now.diff(dayjs(item.createdAt), "hour") < 24
            ? `${now.diff(dayjs(item.createdAt), "hour")} giờ trước`
            : now.diff(dayjs(item.createdAt), "day") < 7
              ? `${now.diff(dayjs(item.createdAt), "day")} ngày trước`
              : now.diff(dayjs(item.createdAt), "week") < 4
                ? `${now.diff(dayjs(item.createdAt), "week")} tuần trước`
                : `${now.diff(dayjs(item.createdAt), "month")} tháng trước`;
  }

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
      <a onClick={() => setReview(item)} class={"list-group-item list-group-item-action flex-column align-items-start" + (item.id.toString() === gradeid.toString() ? " active" : "") } >
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
        <div class="row">
          <div class="text-start">{dayDifference(item)}</div>
          <p class="text-end t">{getState(item.status)}</p>
        </div>

      </a>
    ))
  );
};

export default SideBar;
