import { useState } from "react";
import ListMember from "../listMember/Listmember.component";
import Assignment from "../assignment/assignment.component";
const trangchutt = [{ title: 'Hoc 25/5', info: 'lam bai ' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }];

const Tab = ({ id }) => {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
        console.log(index)
    }
    return (
        <div >
            <ul class="nav nav-tabs mb-3 mx-auto" id="ex1" role="tablist" >
                <li class="nav-item" role="presentation">
                    <a
                        class={toggleState === 1 ? "nav-link active" : "nav-link"}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onClick={() => toggleTab(1)}
                    >Trang chủ</a
                    >
                </li>
                <li class="nav-item" role="presentation" >
                    <a
                        class={toggleState === 2 ? "nav-link active" : "nav-link"}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => toggleTab(2)}
                    >Danh sách</a
                    >
                </li>
                <li class="nav-item" role="presentation" >
                    <a
                        class={toggleState === 3 ? "nav-link active" : "nav-link"}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => toggleTab(3)}
                    >Tab 3</a
                    >
                </li>
            </ul>
            <div class="tab-content" id="ex1-content">
                <div
                    class={toggleState === 1 ? "tab-pane  show active" : "tab-pane fade"}
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                >
                    <div className="col-lg-7 mx-auto">
                    
                        <Assignment list={trangchutt}></Assignment>
                    
                </div>
                </div>
                <div class={toggleState === 2 ? "tab-pane  show active" : "tab-pane fade"} id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                <div className="col-lg-7 mx-auto">
                        <ListMember id = {id}></ListMember>
                </div>
                </div>
                <div class={toggleState === 3 ? "tab-pane  show active" : "tab-pane fade"} id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                    Tab 3 content
                </div>
            </div>
        </div>
    )
};

export default Tab;
