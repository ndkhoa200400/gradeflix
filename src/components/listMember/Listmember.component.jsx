import ListStudent from "../listStudent/liststudent.component";
import ListTeacher from "../listTeacher/listteacher.component";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../spinning/spinning.component";
const students = [
  { name: "student", id: "18127107" },
  { name: "Dang Huy", id: "18127107" },
];
const teachers = [{ name: "Nam" }, { name: "Huy" }];
const ListMember = (params) => {
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const getMembers = async () => {
    const data = await getApiMethod(
      "classrooms/" + params.id.toString() + "/users"
    );
    console.log("🚀 ~ file: Listmember.component.jsx ~ line 18 ~ getMembers ~ data", data)
        
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
    setTeachers(tempTeachers)
    setStudents(tempStudents)
  };
  useEffect(() => getMembers(), []);

  return (
    <div>
      {teachers && students ? (
        <div className="col-xs- col-sm- col-md- col-lg-">
          <ListTeacher list={teachers} idClass={params.id.toString()}></ListTeacher>
          <ListStudent list={students} idClass={params.id.toString()}></ListStudent>
        </div>
      ) : (
        <Spining></Spining>
      )}
    </div>
  );
};

export default ListMember;
