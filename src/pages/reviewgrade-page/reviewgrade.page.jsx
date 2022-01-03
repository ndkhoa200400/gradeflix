import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SideBar from "../../components/sidebar/sidebar";
import ReviewContent from "../../components/review-content/review.content";
import TopNavigationHome from "../../components/top-nav/top-nav-home.component";
import "./style.css"
import ClassroomCard from "../../components/classroom-card/classroom-card.component";
const ReviewPage = (classroom) => {
    const params = useParams();
    const [reviewId, setReviewId] = useState("1");
    const setID = (item) => {
        setReviewId(item.id.toString()) 
        console.log(item.id)
        console.log(reviewId)
    }
    
    return (
        <div>
            <div class="container">
                <div class="row flex-nowrap">
                    <div class={"col-auto scrollspy-example"} data-bs-spy="scroll">
                        <div id="" class="collapse collapse-horizontal show border-end">
                            <div id="sidebar-nav" class="list-group border-0 rounded-0  scrollclass" >
                                <SideBar id={classroom.classroom.id} gradeid={reviewId} setReview={setID}></SideBar>
                            </div>
                        </div>
                    </div>
                    <div class="col ps-md-2 pt-2">
                         <ReviewContent id={classroom.classroom.id} gradeid={reviewId} classroom = {classroom.classroom}></ReviewContent>
                    </div>
                </div>
            </div>


        </div>
    )
};

export default ReviewPage;
