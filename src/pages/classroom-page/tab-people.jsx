import ListMember from "../../components/listMember/Listmember.component";
const TabPeople = ({ classroom }) => {
  return (
    <div //class={toggleState === 2 ? "tab-pane  show active" : "tab-pane fade"}
      role="tabpanel"
    >
      <div className="members-list">
        <ListMember classroom={classroom}></ListMember>
      </div>
    </div>
  );
};
export default TabPeople;
