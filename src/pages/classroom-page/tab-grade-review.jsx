import ReviewPage from "../reviewgrade-page/reviewgrade.page";
import "../reviewgrade-page/style.css"
const TabGradeReview = ({ classroom }) => {
    return (
        <div className="mx-auto">
            <ReviewPage classroom={classroom}></ReviewPage>
        </div>

    );
};
export default TabGradeReview;
