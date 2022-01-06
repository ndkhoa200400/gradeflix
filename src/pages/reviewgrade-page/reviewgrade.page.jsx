import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SideBar from "../../components/sidebar/sidebar";
import ReviewContent from "../../components/review-content/review.content";
import TopNavigationHome from "../../components/top-nav/top-nav-home.component";
import "./style.css"
import ClassroomCard from "../../components/classroom-card/classroom-card.component";
const ReviewPage = ({ classroom, idReview }) => {
    const params = useParams();
    const [reviewId, setReviewId] = useState("");
    const [state, setState] = useState(0);
    const setID = (item) => {
        setReviewId(item.id.toString()) 
        console.log(item.id)
        console.log(reviewId)
    }
    useEffect(() => {
        console.log("test");
        console.log(classroom)
        setReviewId(idReview);
      }, []);
    return ( 
        <div>
            <div class="container">
                <div class="row flex-nowrap">
                    <div class={"col-auto scrollspy-example"} data-bs-spy="scroll">
                        <div id="" class="collapse collapse-horizontal show border-end">
                            <div id="sidebar-nav" class="list-group border-0 rounded-0  scrollclass" >
                                <SideBar id={classroom.id} gradeid={reviewId} setReview={setID} state={state}></SideBar>
                            </div>
                        </div>
                    </div>
                    <div class="col ps-md-2 pt-2">
                         <ReviewContent id={classroom.id} gradeId={reviewId} classroom = {classroom.classroom} setState= {setState} state={state} ></ReviewContent>
                    </div>
                </div>
            </div>


        </div>
    )
};

export default ReviewPage;
