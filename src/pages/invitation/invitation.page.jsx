import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { postApiMethod } from "../../api/api-handler";
import TopNavigation from "../../components/top-nav/top-nav.component";

// query string:
// /inv/classroomId=?&role=?
// /classrooms/{id}/acceptInvitation?role=

const Invitation = () => {
  const acceptInviataion = () => {
    postApiMethod(`classrooms/${1}/accept-invitation?role=${1}`, {});
  };

  return (
    <div>
      <TopNavigation title={"Tham gia lớp học của bạn"} />
      <Container className=" text-center">
        <Card className="invitation">
          <Card.Header variant="top" className="p-4">
            <div className="p-2 d-flex justify-content-center align-items-center">
              <img src="/logo.png" alt="" width={24} height={24} />
              <span className="mx-2">Gradebook</span>
            </div>

            <div className="text-muted">Lớp học trực tuyến, học hoặc là biến.</div>
          </Card.Header>
          <Card.Body className="p-4">
            <Card.Title>Tham gia lớp học</Card.Title>
            <p>Bạn đang tham gia lớp học với tư cách học viên.</p>
            <Button
              onClick={acceptInviataion}
              variant="primary"
              className="cursor-pointer"
            >
              Tham gia lớp học
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Invitation;
