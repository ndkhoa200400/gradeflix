import { NavLink } from "react-router-dom";
import { Row, Container, Nav, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";

const SideBar = ({ id, gradeid }) => {
  const classroomID = "nRhLjhOI";
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

    <Container>
      <Row >
        <Col>
          <Nav justify variant="pills"  class="nav flex-column">
            {reviews.map(item => (
              <Nav.Item>
                <NavLink
                  to={"/classrooms/" + id + "/grade-review/" + item.id}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1" >Phúc Khảo {item.currentGrade.name}</h5>
                    </div>
                    <div><small class ="text-end" >Lý Duy Nam</small></div>
                    <p class="text-end">{item.status}</p>
                    
                  </a>
                </NavLink>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;
