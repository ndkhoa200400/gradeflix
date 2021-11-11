import React from "react";
import ClassroomCard from "../classroom-card/classroom-card.component";


import { Alert } from "react-bootstrap";
const ClassroomList = ({ classrooms }) => {
  return classrooms?.length > 0 ? (
    <div className="d-md-flex flex-wrap flex-row align-items-center">
      {classrooms.map((classroom) => (
        <ClassroomCard key={classroom.id} classroom={classroom} />
      ))}
    </div>
  ) : (
    <Alert className="m-5 " variant={"info"}>
      <Alert.Heading>Bạn chưa có lớp học nào!</Alert.Heading>
      <p>Bạn có thể tạo hoặc tham gia một lớp học.</p>
    </Alert>
  );
};

export default ClassroomList;
