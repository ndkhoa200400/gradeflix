
import Banner from "../../components/banner/banner.component";
import Tab from "../../components/tab/tab.component";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
import TabDetail from "./tab-detail";
import TabPeople from "./tab-people";
import Tab3 from "./tab-3";
const trangchutt = [{ title: 'Hoc 25/5', info: 'lam bai ' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }];




const getContentTab = (tab, idClass)=>{
    if (tab === "tab3")
        return (<Tab3/>);
    else 
        if (tab === "tabPeople")
            return (<TabPeople idClass = {idClass}/>);
    return  (<TabDetail trangchutt = {trangchutt}/>);
}
const ClassroomPage = ({ isFull = true, ...props }) => {
    const params = useParams();
    const [classroom, setClassroom] = useState();
    console.log(params)
    const contentTab = getContentTab(params.tab, params.id);
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
                {contentTab}
            </div> : 
            (
                <Spining />
            )}
        </div>
    )
};

export default ClassroomPage;
