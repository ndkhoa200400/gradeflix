import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import * as AuthService from "../../services/auth.service";
import Spining from "../../components/spinning/spinning.component";
import TopNavigation from "../../components/top-nav/top-nav.component";
import { useQuery } from "../../custome-hook";
import SideBar from "../../components/sidebar/sidebar";
import ApproveReviewGradeForm from "../approve-review-grade-form/approve-review-grade-form";


const ModalConFirmReject = ({ show, id, studentid, reviewid, name, handleClose, gradeReview,grade}) => {
    const [onSubmiting, setOnSubmiting] = useState(false);
    const navigate = useNavigate();

    const onClick = async () => {
        setOnSubmiting(true);
        try {
            // Lấy ảnh ngẫu nhiên làm banner
            const data = {"name": name, "studentId" : studentid, "grade" : grade}
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


const ReviewContent = ({ id, gradeid }) => {
    const [showEditClass, setEditCreateClass] = useState(false);
    const [showConfirmReject, setshowConfirmReject] = useState(false);
    const handleClose = () => {
        setEditCreateClass(false);
        setshowConfirmReject(false);
    };

    const [show, setShow] = useState(false);
    const openModal = () => {
        setEditCreateClass(true);
    };

    const [review, setReview] = useState();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const setCommentValue = (value) => {
        setComment(value);
    }
    const getGradeReview = async () => {
        try {
            const res = await getApiMethod("classrooms/" + id + "/grade-reviews/" + gradeid);
            console.log(res);
            setReview(res);
            const resComment = await getApiMethod("classrooms/" + id + "/grade-reviews/" + gradeid + "/comments");
            setComments(resComment);
        } catch (error) {
            console.log("error", error);
        }
    };
    const onSubmitComment = async () => {
        if (comment !== "") {
            //...
            console.log(comment);
            const data = { "comment": comment };

            try {
                await postApiMethod("classrooms/" + id + "/grade-reviews/" + gradeid + "/comments", data);
                await getGradeReview();
                setComment("");
            } catch (error) {
                console.log("error", error);
                alert(error.message);
            }

        }

    };

    useEffect(() => {
        getGradeReview();
    }, []);



    return review && comments ? (
        <div class="col py-3">
            <div>
                <div>
                    <div class="d-flex justify-content-center row">
                        <div class="flex-column ">
                            <div class="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
                                <div class="d-flex flex-column ml-3">
                                    <div class="d-flex flex-row post-title">
                                        <div className="user-info">
                                            <img
                                                src={review.user.avatar ?? "/default-avatar.png"}
                                                width={24}
                                                height={24}
                                                className="me-2"
                                                alt="member avatar"
                                            ></img>
                                            <b> {review.user.fullname}{" "}</b>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row post-title">
                                        <h5>Phúc khảo: {review.currentGrade.name}</h5><span class="ml-2"></span>

                                    </div>
                                    <div class="d-flex flex-row post-title">
                                        <h6>Điểm hiện tại: {review.currentGrade.grade}</h6><span class="ml-2"></span>

                                    </div>
                                    <div class="d-flex flex-row post-title">
                                        <h6>Điểm mong muốn: {review.expectedGrade.grade}</h6><span class="ml-2"></span>

                                    </div>
                                    <div class="d-flex flex-row post-title">
                                        <h6>Mô tả:</h6><span class="ml-2"></span>

                                    </div>
                                    <div class="comment-text-sm"><span>{review.explanation}</span></div>
                                </div>
                            </div>
                            <div class="coment-bottom bg-white p-2 px-4">

                                {
                                    comments.map(comment => (
                                        <div class="commented-section mt-2">
                                            <td className="py-3 d-flex justify-content-between align-items-center">
                                                <div className="user-info">
                                                    <img
                                                        src={comment.user.avatar ?? "/default-avatar.png"}
                                                        width={24}
                                                        height={24}
                                                        className="me-2"
                                                        alt="member avatar"
                                                    ></img>
                                                    <b>{comment.user.fullname}{" "}</b>
                                                </div>
                                            </td>
                                            <div class="comment-text-sm"><span>{comment.comment}</span></div>

                                        </div>
                                    ))
                                }
                                {review.status === "FINAL" ? null :
                                    <div>
                                        <div>
                                            <div class="d-flex flex-row add-comment-section mt-4 mb-4"> <img
                                                src={AuthService.getUserInfo().avatar ?? "/default-avatar.png"}
                                                width={24}
                                                height={24}
                                                className="me-2"
                                                alt="member avatar"
                                            ></img>
                                                <input type="text" class="form-control mr-3" placeholder="Add comment" value={comment}
                                                    onInput={value => setCommentValue(value.target.value)}
                                                />
                                                <button class="btn btn-primary" type="button"
                                                    onClick={() => onSubmitComment()}
                                                >Comment</button>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-success btn-lg" onClick={() => setEditCreateClass(true)}>Approve</button>
                                        <button type="button" class="btn btn-outline-danger btn-lg" onClick={() => setshowConfirmReject(true)} >Reject</button>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <ApproveReviewGradeForm
                    show={showEditClass}
                    handleClose={handleClose}
                    id={id}
                    studentid={review.studentId}
                    reviewid={gradeid}
                    name={review.currentGrade.name}
                    gradeReview={getGradeReview}
                />
                <ModalConFirmReject
                    show={showConfirmReject}
                    handleClose={handleClose}
                    id={id}
                    studentid={review.studentId}
                    reviewid={gradeid}
                    name={review.currentGrade.name}
                    gradeReview={getGradeReview}
                    grade = {review.currentGrade.grade}
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