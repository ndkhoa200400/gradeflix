import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import * as AuthService from "../../services/auth.service";
import Spining from "../../components/spinning/spinning.component";
import ApproveReviewGradeForm from "../approve-review-grade-form/approve-review-grade-form";
import dayjs from "dayjs";

const ModalConFirmReject = ({ show, id, studentid, reviewid, name, handleClose, gradeReview, grade }) => {
	const [onSubmiting, setOnSubmiting] = useState(false);

	const onClick = async () => {
		setOnSubmiting(true);
		try {
			// Lấy ảnh ngẫu nhiên làm banner
			const data = { name: name, studentId: studentid, grade: grade };
			data.name = name;
			data.studentId = studentid;

			await postApiMethod("classrooms/" + id + "/grade-reviews/" + +reviewid, data);

			handleClose();
			gradeReview();
		} catch (error) {
			alert("Đã xảy ra lỗi! Vui lòng thử lại");
		}
		setOnSubmiting(false);
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Bạn có chắc muốn hủy yêu cầu phúc khảo?</Modal.Title>
				{onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
			</Modal.Header>

			<Modal.Footer>
				<Button variant="outline-secondary" onClick={handleClose}>
					Đóng
				</Button>
				<Button variant="outline-primary" onClick={onClick}>
					Hủy yêu cầu
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

const ReviewContent = ({ id, gradeId, classroom, setState, state }) => {
	const [showEditClass, setEditCreateClass] = useState(false);
	const [showConfirmReject, setshowConfirmReject] = useState(false);
	const handleClose = () => {
		setEditCreateClass(false);
		setshowConfirmReject(false);
	};

	const [review, setReview] = useState();
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const setCommentValue = (value) => {
		setComment(value);
	};
	const getGradeReview = async () => {
		try {
			const param = {
				filter: {
					include: [
						{
							relation: "comments",
							scope: {
								include: [
									{
										relation: "user",
									},
								],
							},
						},
					],
				},
			};
			const resReview = await getApiMethod("classrooms/" + id + "/grade-reviews/" + gradeId, param);

			setReview(resReview);
			setComments(resReview.comments ?? []);
			setState(state + 1);
		} catch (error) {
			console.log("error", error);
		}
	};
	const onSubmitComment = async () => {
		if (comment !== "") {
			//...
			console.log(comment);
			const data = { comment: comment.trim() };

			try {
				const newComment = await postApiMethod("classrooms/" + id + "/grade-reviews/" + gradeId + "/comments", data);
				// await getGradeReview();
				setComments([...comments, newComment]);
				setComment("");
			} catch (error) {
				console.log("error", error);
				alert(error.message);
			}
		}
	};

	useEffect(() => {
		if (gradeId) {
			return getGradeReview();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gradeId]);

	const now = dayjs();
	const dayDifference = (item) => {
		return now.diff(dayjs(item.createdAt), "year") > 1
			? `${now.diff(dayjs(item.createdAt), "year")} năm trước`
			: now.diff(dayjs(item.createdAt), "minute") < 1
			? `Vừa xong`
			: now.diff(dayjs(item.createdAt), "minute") < 60
			? `${now.diff(dayjs(item.createdAt), "minute")} phút trước`
			: now.diff(dayjs(item.createdAt), "hour") < 24
			? `${now.diff(dayjs(item.createdAt), "hour")} giờ trước`
			: now.diff(dayjs(item.createdAt), "day") < 7
			? `${now.diff(dayjs(item.createdAt), "day")} ngày trước`
			: now.diff(dayjs(item.createdAt), "week") < 4
			? `${now.diff(dayjs(item.createdAt), "week")} tuần trước`
			: `${now.diff(dayjs(item.createdAt), "month")} tháng trước`;
	};

	return gradeId === "" ? null : review && comments ? (
		<div className="col font-size-review-grade-content ">
			<div>
				<Card className="d-flex justify-content-center row p-2 mb-3">
					<div className="flex-column ">
						<div
							className={`d-flex flex-row align-items-center text-left comment-top p-2 bg-white px-4 ${
								comments.length ? "border-bottom" : null
							}`}
						>
							<div className="d-flex flex-column ml-3 font-size-review-grade-content">
								<div className="d-flex flex-row post-title">
									<h5 className="user-info">
										<img
											src={review.user.avatar ?? "/default-avatar.png"}
											width={24}
											height={24}
											className="me-2"
											alt="member avatar"
										></img>
										<b> {review.user.fullname} </b>
									</h5>
								</div>
								<div className="d-flex flex-row post-title">
									<h5>Phúc khảo cột: {review.currentGrade.name}</h5>
									<span class="ml-2"></span>
								</div>
								<div className="d-flex flex-row post-title">
									<h5>Điểm hiện tại: {review.currentGrade.grade}</h5>
									<span class="ml-2"></span>
								</div>
								<div className="d-flex flex-row post-title">
									<h5>Điểm mong muốn: {review.expectedGrade.grade}</h5>
									<span className="ml-2"></span>
								</div>
								<div className="d-flex flex-row post-title">
									<span className="ml-2"></span>
								</div>
								<div className="d-flex flex-row post-title">
									<h5>Lí do:</h5>
									<span className="ml-2"></span>
								</div>
								<p>{review.explanation}</p>
							</div>
						</div>
						{comments?.length === 0 && review.status !== "FINAL" ? (
							<div className="text-center text-muted">Không có bình luận nào</div>
						) : (
							<div className="coment-bottom bg-white p-2 px-4">
								{comments.map((comment, idx) => (
									<div key={idx} className="commented-section mt-2">
										<td className="py-3 d-flex justify-content-between align-items-center">
											<div className="user-info">
												<img
													src={comment?.user?.avatar ?? "/default-avatar.png"}
													width={24}
													height={24}
													className="me-2"
													alt="member avatar"
												></img>
												<b>{comment.user.fullname} </b>{" "}
												<small class="padding-left-daydiff">{"   " + dayDifference(comment)}</small>
											</div>
										</td>
										<div class="comment-text-sm">
											<span>{comment.comment}</span>
										</div>
									</div>
								))}
								{review.status === "FINAL" ? (
									<div className="text-center text-muted mt-2">
										<div>Đã đóng bình luận</div>
									</div>
								) : (
									<div>
										<div>
											<div class="d-flex align-items-center add-comment-section my-4">
												<img
													src={AuthService?.getUserInfo()?.avatar ?? "/default-avatar.png"}
													width={24}
													height={24}
													className="me-2"
													alt="member avatar"
												></img>
												<div className="input-group">
													<input
														type="text"
														class="form-control"
														placeholder="Thêm bình luận"
														value={comment}
														onInput={(value) => setCommentValue(value.target.value)}
													/>
													<button className="btn btn-primary " type="button" onClick={() => onSubmitComment()}>
														Bình luận
													</button>
												</div>
											</div>
										</div>
										{classroom.user.userRole === "TEACHER" || classroom.user.userRole === "HOST" ? (
											<div>
												<button
													type="button"
													class="btn btn-outline-success me-3"
													onClick={() => setEditCreateClass(true)}
												>
													Chấp nhận
												</button>
												<button type="button" class="btn btn-outline-danger" onClick={() => setshowConfirmReject(true)}>
													Từ chối
												</button>
											</div>
										) : null}
									</div>
								)}
							</div>
						)}
					</div>
				</Card>

				<ApproveReviewGradeForm
					show={showEditClass}
					handleClose={handleClose}
					id={id}
					studentid={review.studentId}
					reviewid={gradeId}
					name={review.currentGrade.name}
					gradeReview={getGradeReview}
				/>
				<ModalConFirmReject
					show={showConfirmReject}
					handleClose={handleClose}
					id={id}
					studentid={review.studentId}
					reviewid={gradeId}
					name={review.currentGrade.name}
					gradeReview={getGradeReview}
					grade={review.currentGrade.grade}
				/>
			</div>
		</div>
	) : (
		<div>
			<Spining isFull={false} className="mx-auto my-5"></Spining>
		</div>
	);
};

export default ReviewContent;
