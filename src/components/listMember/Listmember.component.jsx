import ListStudent from "../listStudent/liststudent.component";
import ListTeacher from "../listTeacher/listteacher.component";
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
      console.log(data);
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

  return teachers && students ? (
    <div className="show-list">
      <ListTeacher list={teachers} classroom={params.classroom}></ListTeacher>
      <ListStudent list={students} classroom={params.classroom}></ListStudent>
    </div>
  ) : (
    <div>
      <Spining isFull={false} className="mx-auto my-5"></Spining>
    </div>
  );
};

export default ListMember;
