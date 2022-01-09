import React, { useState } from "react";
import SideBar from "../../components/sidebar/sidebar";
import ReviewContent from "../../components/review-content/review.content";
import "./style.css";
const ReviewPage = ({ classroom, idReview }) => {
	const [reviewId, setReviewId] = useState(idReview);
	const [state, setState] = useState(idReview);
	const setID = (item) => {
		setReviewId(item.id.toString());
		window.history.replaceState("", "", "/classrooms/" + classroom.id + "/tab-review-grade/" + item.id);
	};

	return (
		<div>
			<div class="container position-relative">
				<div class="row flex-nowrap">
					<div class={"col-auto scrollspy-example"} data-bs-spy="scroll">
						<div id="" class="collapse collapse-horizontal show border-end">
							<div id="sidebar-nav" class="list-group border-0 rounded-0  scrollclass">
								<SideBar id={classroom.id} gradeid={reviewId} setReview={setID} state={state}></SideBar>
							</div>
						</div>
					</div>
					<div class="col ps-md-2">
						<ReviewContent
							id={classroom.id}
							gradeId={reviewId}
							classroom={classroom}
							setState={setState}
							state={state}
						></ReviewContent>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewPage;
