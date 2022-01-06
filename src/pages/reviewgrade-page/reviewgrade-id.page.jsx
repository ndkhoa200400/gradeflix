import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SideBar from "../../components/sidebar/sidebar";
import ReviewContent from "../../components/review-content/review.content";
import TopNavigationHome from "../../components/top-nav/top-nav-home.component";
import "./style.css"
import ClassroomCard from "../../components/classroom-card/classroom-card.component";
import { getApiMethod } from "../../api/api-handler";
import ClassroomPage from "../classroom-page";
const ReviewPageId = () => {
    const params = useParams();
    useEffect(() => {
		console.log(params.reviewId.toString())
	}, []);
    return  (
        <ClassroomPage idReview = {params.reviewId.toString()}/>
    )
};

export default ReviewPageId;
