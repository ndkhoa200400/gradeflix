import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SideBar from "../../components/sidebar/sidebar";
import ReviewContent from "../../components/review-content/review.content";
import "./style.css"
const ReviewPage = () => {
    const params = useParams();
    return (
        <div>
            <div class="container">
                <div class="row flex-nowrap">
                    <div class="col-auto ">
                        <div id="sidebar" class="collapse collapse-horizontal show border-end">
                            <div id="sidebar-nav" class="list-group border-0 rounded-0 ">
                                <SideBar id={params.id} gradeid={params.reviewid}></SideBar>
                            </div>
                        </div>
                    </div>
                    <main class="col ps-md-2 pt-2">
                        <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="bi bi-list bi-lg py-2 p-1"></i> Xem danh sách</a>
                        <ReviewContent id={params.id} gradeid={params.reviewid}></ReviewContent>
                    </main>
                </div>
            </div>


        </div>
    )
};

export default ReviewPage;
