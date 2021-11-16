import { NavLink } from "react-router-dom";
import { Row, Container, Nav, Col, Navbar } from "react-bootstrap";


const Tab = ({ id, classroom }) => {
  const urlTab1 = "/classrooms/" + id + "/tab-detail";
  const urlTab2 = "/classrooms/" + id + "/tab-people";
  const urlTab3 = "/classrooms/" + id + "/tab-my-info";
  console.log(classroom);
  return (
    <Container>
      <Row style={{ padding: "10px" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Nav justify variant="pills" defaultActiveKey={urlTab1}>
            <Nav.Item>
              <NavLink
                to={urlTab1}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Thông tin chung
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={urlTab2}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Danh sách
              </NavLink>
            </Nav.Item>
            {classroom && classroom.user.userRole === "STUDENT" ? (
              <Nav.Item>
                <NavLink
                  to={urlTab3}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Thông tin của tôi
                </NavLink>
              </Nav.Item>
            ) : null}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Tab;
