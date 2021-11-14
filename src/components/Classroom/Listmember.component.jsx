import ListStudent from "../Classroom/liststudent.component";
import ListTeacher from "../Classroom/listteacher.component";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
const students = [{ name: 'student', id: '18127107' }, { name: 'Dang Huy', id: '18127107' }];
const teachers = [{ name: 'Nam' }, { name: 'Huy' }];
const ListMember = (id) => {
    const [members, setMembers] = useState();

    const getMembers = async () => {
    const data = await getApiMethod("classrooms/"+id.id.toString()+"/users");
        setMembers(data);
    };
    useEffect(() => getMembers(), []);
    return (
        <div>
            {members? <div className="col-xs- col-sm- col-md- col-lg-">
            <ListTeacher list={students}></ListTeacher>
            <ListStudent list={teachers}></ListStudent>
        </div> : <Spining></Spining>}
        </div>


    )
};

export default ListMember;
