import { NavLink } from "react-router-dom";
const trangchutt = [{ title: 'Hoc 25/5', info: 'lam bai ' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }];

const Tab = ({ id }) => {
    const urlTab1 = "/classrooms/"+ id + "/tabDetail";
    const urlTab2 = "/classrooms/"+ id + "/tabPeople";
    const urlTab3 = "/classrooms/"+ id + "/tab3";
    return (
        <div >
            <ul className="nav nav-tabs mb-3 mx-auto" id="ex1" role="tablist" >
                <li className="nav-item" role="presentation">
                    <NavLink
                        to= {urlTab1}
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                    >Trang chủ</NavLink>
                </li>
                <li className="nav-item" role="presentation" >
                    <NavLink
                      
                        to={urlTab2}
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                    >Danh sách</NavLink>
                </li>
                <li className="nav-item" role="presentation" >
                    <NavLink
                        to={urlTab3}
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                    >Tab 3
                    </NavLink >
                </li>
            </ul>
           
        </div>
    )
};

export default Tab;
