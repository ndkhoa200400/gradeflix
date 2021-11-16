import Banner from "../../components/banner/banner.component";
import Tab from "../../components/tab/tab.component";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
import TabDetail from "./tab-detail";
import TabPeople from "./tab-people";
import TabMyInfo from "./tab-my-info";

const getContentTab = (
  tab,
  idClass,
  classroom,
  onEditedClassRoom,
  onEditStudentId
) => {
  if (tab === "tab-my-info") {
    if (classroom && classroom.user.userRole === "STUDENT")
      return (
        <TabMyInfo classroom={classroom} onEditStudentId={onEditStudentId} />
      );
    const redirectLink = `/classrooms/${idClass}/tab-detail`;
    return <Navigate to={redirectLink} />;
  } else if (tab === "tab-people") return <TabPeople classroom={classroom} />;
  return (
    <TabDetail classroom={classroom} onEditedClassRoom={onEditedClassRoom} />
  );
};


const ClassroomPage = ({ isFull = true, ...props }) => {
  const params = useParams();
  const [classroom, setClassroom] = useState();
  console.log(params);
  const getClassroom = async () => {
    const data = await getApiMethod("classrooms/" + params.id.toString());

    setClassroom(data);
  };
  const onEditedClassRoom = (newClassroom) => {
    newClassroom.user = classroom.user;
    setClassroom(newClassroom);
  };
  const onEditStudentId = (studentId) => {
    classroom.user.studentId = studentId;
    setClassroom(classroom);
    console.log(classroom);
  };
  useEffect(() => getClassroom(), []);
  return classroom ? (
    <div className="container classroom">
      <div className="banner">
        <Banner classroom={classroom}></Banner>
      </div>

      <Tab id={params.id} classroom={classroom} className="tab"></Tab>
      {getContentTab(
        params.tab,
        params.id,
        classroom,
        onEditedClassRoom,
        onEditStudentId
      )}
    </div>
  ) : (
    <Spining />
  );
};

export default ClassroomPage;
