import React from "react";
import ReviewPage from "../reviewgrade-page/reviewgrade.page";
import "../reviewgrade-page/style.css";
const TabGradeReview = ({ classroom, idReview }) => {
	return (
		<div className="mx-auto">
			<ReviewPage classroom={classroom} idReview={idReview}></ReviewPage>
		</div>
	);
};
export default TabGradeReview;
