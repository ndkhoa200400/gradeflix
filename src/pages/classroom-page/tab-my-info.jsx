import React, { useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import Spining from "../../components/spinning/spinning.component";
import EditStudentIdModal from "./edit-student-id-modal";
import StudentGrade from "../../components/student-grade/student-grade";
import ListParem from "../../components/list-parem/list-parem.component";
const TabMyInfo = ({ classroom, onEditStudentId,studentList }) => {
  const [showEditStudentId, setEditStudentId] = useState(false);
  const handleClose = () => {
    setEditStudentId(false);
  };
  const openModal = () => {
    setEditStudentId(true);
  };
  return (
    <div>
      {!classroom ? (
        <Spining />
      ) : (
        <Row>
          <Col sm={3}>
            <Card  style={{ marginBottom: "10px" }}>
              <Card.Header>
                <Card.Title>Thông tin cá nhân</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text
                  style={{
                    display: "flex",
                    lexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Mã số sinh viên</div>
                  <div>{classroom.user.studentId}</div>
                </Card.Text>
                <Card.Text
                  style={{
                    display: "flex",
                    lexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Họ và tên</div>
                  <div>{classroom.user.fullname}</div>
                </Card.Text>
                <Card.Text
                  style={{
                    display: "flex",
                    lexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Bài tập hoàn thành</div>
                  <div>0</div>
                </Card.Text>
                <Card.Text
                  style={{
                    display: "flex",
                    lexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Bài tập được giao</div>
                  <div>0</div>
                </Card.Text>
                <Card.Text
                  style={{
                    display: "flex",
                    lexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Điểm tích lũy</div>
                  <div>0.0</div>
                </Card.Text>
                <br />
                <div
                  style={{
                    display: "flex",
                    lexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outline-primary" onClick={openModal}>
                    Chỉnh sửa mã số sinh viên
                  </Button>
                  <EditStudentIdModal
                    show={showEditStudentId}
                    handleClose={handleClose}
                    onEditStudentId={onEditStudentId}
                    classroom={classroom}
                  />
                </div>
              </Card.Body>
            </Card>
						<ListParem classroom={classroom}/>
          </Col>
          <Col sm={9}>
            <Card >
              <Card.Header>
                <Card.Title>Bảng điểm</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ height: "200px" }}>
                  <StudentGrade classroom={classroom} studentList={studentList}/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default TabMyInfo;
