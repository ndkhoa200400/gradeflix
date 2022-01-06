import ReviewPage from "../reviewgrade-page/reviewgrade.page";
import "../reviewgrade-page/style.css"
import { useEffect } from "react";
const TabGradeReview = ({ classroom, idReview }) => {
    useEffect(() => {
		console.log(idReview)
	}, []);
    return (
        <div className="mx-auto">
            <ReviewPage classroom={classroom} idReview={idReview}></ReviewPage>
        </div>

    );
};
export default TabGradeReview;
