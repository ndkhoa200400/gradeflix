import ListMember from "../../components/listMember/Listmember.component";
const TabPeople = ({idClass}) => {
    return (
        <div //class={toggleState === 2 ? "tab-pane  show active" : "tab-pane fade"} 
                id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                <div className="col-lg-7 mx-auto">
                        <ListMember id = {idClass}></ListMember>
                </div>
        </div>
    )
}
export default TabPeople;