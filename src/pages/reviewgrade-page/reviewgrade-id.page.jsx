import React from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import ClassroomPage from "../classroom-page";
const ReviewPageId = () => {
	const params = useParams();
	return <ClassroomPage idReview={params.reviewId.toString()} />;
};

export default ReviewPageId;
