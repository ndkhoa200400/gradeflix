import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.component";
import Spining from "../spinning/spinning.component";
import ChangeID from "../change-id-form/change-id-form-component";
import { Dropdown, Modal, Table, Button } from "react-bootstrap";

import { postApiMethod } from "../../api/api-handler";

import { Alert } from "react-bootstrap";



const ListParem = ({ classroom }) => {
    const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
    const parem = classroom.gradeStructure ? classroom.gradeStructure.parems : "";

    return (
        <div className="list-parem my-5 parem-list mx-auto">
            <div class="right-item">
                {classroom.user.userRole === "STUDENT" ?
                    null
                    :
                    <button
                        type="button"
                        class="btn btn-outline-dark"
                    >
                        <i className="fas fa-edit fa-1x"></i>
                    </button>}
            </div>

            <br></br>

            {classroom.gradeStructure ?
                <div>
                    <div class="row">
                        <div class="col-sm-7">
                            <h2>Thang điểm</h2>
                        </div>
                        <div class="col-sm-5 right-item">
                            <h2>{total}</h2>
                        </div>

                    </div>
                    <hr></hr>
                    <div>
                        {parem.map((item) => (
                            <div class="row margin-parem">
                                <div class="col-sm-7 ">
                                    <h5> {item.name} </h5>
                                </div>
                                <br />
                                <div class="col-sm-5 right-item">
                                    <h5>{item.percent}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> : <Alert className="m-5 " variant={"info"}>
                    <Alert.Heading>Bạn chưa thêm thang điểm!</Alert.Heading>
                    <p>Chọn nút edit để thêm</p>
                </Alert>}

        </div>
    );
};

export default ListParem;
