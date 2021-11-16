
import Banner from "../../components/banner/banner.component";
import Tab from "../../components/tab/tab.component";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
import TabDetail from "./tab-detail";
import TabPeople from "./tab-people";
import TabMyInfo from "./tab-my-info";



const getContentTab = (tab, idClass, classroom, onEditedClassRoom)=>{
    if (tab === "tab-my-info")
        return (<TabMyInfo classroom = {classroom}/>);
    else 
        if (tab === "tab-people")
            return (<TabPeople classroom = {classroom}/>);
    return  (<TabDetail classroom = {classroom} onEditedClassRoom={onEditedClassRoom}/>);
}
const ClassroomPage = ({ isFull = true, ...props }) => {
    const params = useParams();
    const [classroom, setClassroom] = useState();
    console.log(params)
    const getClassroom = async () => {
        const data = await getApiMethod("classrooms/" + params.id.toString());
        
        setClassroom(data);
    };
    useEffect(() => getClassroom(), []);
    return (
        <div className="col-lg-11 mx-auto" >
            {classroom ? <div>
                <div>
                    <Banner classroom={classroom} ></Banner>
                </div>
               
                <Tab id={params.id}></Tab>
                {getContentTab(params.tab, params.id, classroom)}
            </div> : 
            (
                <Spining />
            )}
        </div>
    )
};

export default ClassroomPage;
