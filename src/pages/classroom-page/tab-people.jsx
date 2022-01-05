import ListMember from "../../components/list-member/list-member.component";
const TabPeople = ({ classroom }) => {
	return (
		<div //class={toggleState === 2 ? "tab-pane  show active" : "tab-pane fade"}
		>
			<div className="members-list">
				<ListMember classroom={classroom}></ListMember>
			</div>
		</div>
	);
};
export default TabPeople;
