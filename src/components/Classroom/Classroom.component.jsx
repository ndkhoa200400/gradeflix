import ListMember from "../Classroom/Listmember.component";
import Assignment from "../Classroom/assignment.component";
import Banner from "../Classroom/banner.component";
const trangchutt = [{ title: 'Hoc 25/5', info: 'lam bai ' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }];

const Classroom = ({ isFull = true, ...props }) => {
    return (
        <div className="col-lg-11 mx-auto" >
            <div>
                <Banner ></Banner>
            </div>

            <div className="row">
                <div className="col-lg-3">
                    <ListMember></ListMember>
                </div>
                <div className="col-lg-7">
                    <li>
                        <Assignment list={trangchutt}></Assignment>
                    </li>
                </div>

            </div>
        </div>
    )
};

export default Classroom;
