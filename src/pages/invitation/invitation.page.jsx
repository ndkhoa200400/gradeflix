import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
import TopNavigation from "../../components/top-nav/top-nav.component";
import { useQuery } from "../../custome-hook";
// query string:
// /invitation/classroomId=?&role=?
// /classrooms/{id}/acceptInvitation?role=

const Invitation = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [invitationInfo, setInvitationInfo] = useState(null);

  const checkJoinClass = async () => {
    const classroomId = query.get("classroomId");
    const role = query.get("role");
    const token = query.get("token");
    if (!classroomId || !role) {
      alert("Đường dẫn bị lỗi. Vui lòng truy cập lại sau!");
      navigate(`/`, {
        replace: true,
      });
      return;
    }
    const res = await getApiMethod(
      `classrooms/${classroomId}/check-join-class`
    );
    if (res.isJoined) {
      //alert("Bạn đã tham gia vào lớp này!");
      return navigate(`/classrooms/${classroomId}/tab-detail`, {
        replace: true,
      });
    }
    return setInvitationInfo({
      classroomId,
      role,
      token,
    });
  };

  useEffect(() => {
    if (query) {
      return checkJoinClass();
    }
  }, [query]);

  const acceptInviataion = async () => {
    if (!invitationInfo) 
    {
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau");
        navigate(`/`, {
          replace: true,
        });
        return;
    }
        
    try {
      await postApiMethod(
        `classrooms/${invitationInfo.classroomId}/accept-invitation?role=${
          invitationInfo.role
        }${invitationInfo.token ? "&token=" + invitationInfo.token : ""}`,
        {}
      );
     
      navigate(`/classrooms/${invitationInfo.classroomId}/tab-detail`, {
        replace: true,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return invitationInfo ? (
    <div>
      <TopNavigation title={"Tham gia lớp học của bạn"} />
      <Container className=" text-center">
        <Card className="invitation">
          <Card.Header variant="top" className="p-4">
            <div className="p-2 d-flex justify-content-center align-items-center">
              <img src="/logo.png" alt="" width={24} height={24} />
              <span className="mx-2">Gradeflix</span>
            </div>

            <div className="text-muted">
              Lớp học trực tuyến, kết nối mọi người với nhau.
            </div>
          </Card.Header>
          <Card.Body className="p-4">
            <Card.Title>Tham gia lớp học</Card.Title>
            <p>
              Bạn đang tham gia lớp học với tư cách{" "}
              {invitationInfo.role === "TEACHER" ? "giáo viên" : "học sinh"}
            </p>
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
  ) : (
    <Spining isFull={true} />
  );
};

export default Invitation;
