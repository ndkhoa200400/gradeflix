import ListParem from "../../components/list-parem/list-parem.component";
const TabParem = ({ classroom }) => {
  return (
    <div //class={toggleState === 2 ? "tab-pane  show active" : "tab-pane fade"}
      role="tabpanel"
    >
      <div className="parem-list-tab">
        <ListParem classroom={classroom}></ListParem>
      </div>
    </div>
  );
};
export default TabParem;
