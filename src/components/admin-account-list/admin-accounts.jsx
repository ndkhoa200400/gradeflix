
import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { postApiMethod } from "../../api/api-handler";
const { SearchBar } = Search;
const AdminAccounts = ({ gradeStructure, students, onUpdateGrade, classroomId, openGradeForm, errorList }) =>{
	const studentIdValidator = (newValue, row, column) => {
		if (isNaN(newValue)) {
			return {
				valid: false,
				message: "Hãy nhập điểm bằng số",
			};
		}
		if (+newValue >= 0 && +newValue <= 10) return { valid: true };
		return { valid: false, message: `Phạm vi điểm 0 - ${gradeStructure.total}` };
	};
	
	const columns = [
		{
			dataField: "account",
			text: "Tài khoản",
			editable: false,
		},
		{
			dataField: "fullName",
			text: "Họ và tên",
			editable: false,
		},		
        {

            dataField: "studentId",
			text: "MSSV",
			editable: true,
            validator: studentIdValidator,
        },
        {
            dataField: "status",
			text: "Trạng thái",
			editable: false,
        },
        {
			dataField: "action",
			text: "Thao tác",
			editable: false,
		},
	];
	

	const data = [
        {account: "12", fullName: "as", studentId: "as12", status: "Bị khóa", action: Lock({id: "1", isLocked: true})},
        {account: "11232", fullName: "as", studentId: "as12", status: "Hoạt động", action: Lock({id: "1", isLocked: false})},
        {account: "12sdv", fullName: "as", studentId: "as12", status: "Hoạt động",action:Lock({id: "1", isLocked: false})},
        {account: "1sdv2", fullName: "as", studentId: "as12", status: "Hoạt động",action:Lock({id: "1", isLocked: false})},
        {account: "1fd2", fullName: "as", studentId: "as12", status: "Hoạt động",action:Lock({id: "1", isLocked: false})},
        {account: "1122", fullName: "as", studentId: "as12", status: "Hoạt động",action:Lock({id: "1", isLocked: false})},
        {account: "1212", fullName: "as", studentId: "as12", status: "Hoạt động",action:Lock({id: "1", isLocked: false})},
        {account: "12vss", fullName: "as", studentId: "as12", status: "Hoạt động",action:Lock({id: "1", isLocked: false})},
        {account: "12v", fullName: "as", studentId: "as12", status: "Hoạt động",action:Lock({id: "1", isLocked: false})},
    ];

	const beforeSaveCell = async (oldValue, newValue, row, column, done) => {
		console.log(oldValue, newValue, oldValue === undefined && newValue === "");
		if (oldValue === newValue || (oldValue === undefined && newValue === "")) return;
		const studentId = row.studentId;
		const field = column.dataField;
		//call api
		try {
			const res = await postApiMethod(`classrooms/${classroomId}/students/${studentId}/grades?gradeName=${field}`, {
				newGrade: newValue,
			});
			onUpdateGrade(res);
		} catch (e) {
			console.log(e);
		}
	};

	//Mark to customize later!!
	const rowStyle = (row, rowIndex) => {
		const style = {};
		if (rowIndex === 0) {
            style.backgroundColor = "#FFCDD2";
        }

		return style;
	};
    const defaultSorted = [
		{
			dataField: "name",
			order: "desc",
		},
	];
    return (
        <ToolkitProvider defaultSorted = {defaultSorted} bootstrap5 keyField="account" data={data} columns={columns} search>
			{(props) => (
				<div>
					
                    <hr />
                    
					<Card className="text-center d-grid grap-2 div-horizontal">
						<BootstrapTable
							bootstrap4
							hover
							noDataIndication="Không có sinh viên nào"
							rowStyle={rowStyle}
							wrapperClasses="table-responsive"
							// rowEvents={ rowEvents }
							{...props.baseProps}
							cellEdit={cellEditFactory({
								mode: "click",
								blurToSave: true,
								beforeSaveCell,
							})}
						/>
					</Card>
				</div>
			)}
		</ToolkitProvider>
    )
}
const Lock = ({id, isLocked})=>{
    return(
        <Button>
            {isLocked?"unlock":"lock"}
        </Button>
    )
}

export default AdminAccounts;