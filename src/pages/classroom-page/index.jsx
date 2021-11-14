import ListMember from "../../components/Classroom/Listmember.component";
import Assignment from "../../components/Classroom/assignment.component";
import Banner from "../../components/Classroom/banner.component";
import Tab from "../../components/Classroom/tab.component";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import { useNavigate, Link } from 'react-router-dom';
import Spining from "../../components/spinning/spinning.component";
const trangchutt = [{ title: 'Hoc 25/5', info: 'lam bai ' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }];


const ClassroomPage = ({ isFull = true, ...props }) => {
    const params = useParams();
    const [classroom, setClassroom] = useState();
    console.log(params.id)
    const getClassroom = async () => {
        const data = await getApiMethod("classrooms/" + params.id.toString());
        setClassroom(data);
    };
    console.log(classroom)
    useEffect(() => getClassroom(), []);
    return (
        <div className="col-lg-11 mx-auto" >
            {classroom ? <div>
                <div>
                    <Banner classroom={classroom} ></Banner>
                </div>
               
                <Tab id={params.id}></Tab>
            </div> : (
                <Spining />
            )}
        </div>
    )
};

export default ClassroomPage;
