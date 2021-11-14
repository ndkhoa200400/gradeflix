import ListStudent from "../Classroom/liststudent.component";
import ListTeacher from "../Classroom/listteacher.component";
const students = [{ name: 'student', id: '18127107' }, { name: 'Dang Huy', id: '18127107' }];
const teachers = [{ name: 'Nam' }, { name: 'Itachi' }];
const ListMember = () => {
    return (

        <div className="col-xs- col-sm- col-md- col-lg-">
            <ListTeacher list={teachers}></ListTeacher>
            <ListStudent list={students}></ListStudent>
        </div>


    )
};

export default ListMember;
