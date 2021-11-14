
import Assignment from "../../components/assignment/assignment.component";
const TabDetail = ({trangchutt}) => {
    return (
        <div
            // class={toggleState === 1 ? "tab-pane  show active" : "tab-pane fade"}
            id="ex1-tabs-1"
            role="tabpanel"
            aria-labelledby="ex1-tab-1"
        >
            <div className="col-lg-7 mx-auto">
            
                <Assignment list={trangchutt}></Assignment>
            
            </div>
        </div>
    )
}
export default TabDetail;