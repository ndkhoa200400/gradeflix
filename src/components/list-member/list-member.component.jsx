import ListStudent from "../list-student/list-student.component";
import ListTeacher from "../list-teacher/list-teacher.component";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../spinning/spinning.component";

const ListMember = (params) => {
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const getMembers = async () => {
    const data = await getApiMethod(
      "classrooms/" + params.classroom.id.toString() + "/users"
    );
    const tempTeachers = [];
    const tempStudents = [];
    for (const user of data) {
     
      if (user.userRole === "TEACHER" || user.userRole === "HOST") {
        tempTeachers.push(user);
      } else {
        tempStudents.push(user);
      }
    }
    setTeachers(tempTeachers);
    setStudents(tempStudents);
  };
  useEffect(() => getMembers(), []);
  const onKickMember = (user)=>{
    const newTeachers = [...teachers]
    for(var i = 0; i < newTeachers.length; i++){
      if (newTeachers[i].id === user.id)
      {
        newTeachers.splice(i, 1);
        setTeachers(newTeachers);
        return;
      }
    }
    const newStudents = [...students]
    for(var i = 0; i < newStudents.length; i++){
      if (newStudents[i].id === user.id)
      {
        newStudents.splice(i, 1);
        setStudents(newStudents);
        return;
      }
    }
  }
  const onEditStudentId = (user)=>{
    const newStudents = [...students]
    for(var i = 0; i < newStudents.length; i++){
      if (newStudents[i].id === user.id)
      {
        
        newStudents[i] = user;
        setStudents(newStudents);
        return;
      }
    }
  }
  return teachers && students ? (
    <div className="show-list">
      <ListTeacher list={teachers} classroom={params.classroom} onKickMember={onKickMember}></ListTeacher>
      <ListStudent list={students} classroom={params.classroom} onKickMember={onKickMember} onEditStudentId={onEditStudentId}></ListStudent>
    </div>
  ) : (
    <div>
      <Spining isFull={false} className="mx-auto my-5"></Spining>
    </div>
  );
};

export default ListMember;
