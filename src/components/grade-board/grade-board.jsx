import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { postApiMethod } from "../../api/api-handler";
import "./grade-board.css";

const { SearchBar } = Search;

const GradeBoard = ({ gradeStructure, students, onUpdateGrade, classroomId, openGradeForm, errorList }) => {
	const headerFormatter = (column, colIndex, { sortElement, filterElement }) => {
		return (
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}>
				{filterElement}
				{column.text}
				{sortElement}
			</div>
		);
	};
	const headerGradeFormatter = (column, colIndex, { sortElement, filterElement }) => {
		return (
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", cursor: "pointer" }}>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}>
						{filterElement}
						{column.text}
						{sortElement}
					</div>
				</div>
				&nbsp;
				<Button
					variant="link"
					style={{ padding: "0px" }}
					onClick={() => {
						const title = "Tải lên điểm cho cột điểm " + column.text;
						const endPoint = "student-grades?gradeName=" + column.dataField;
						openGradeForm(title, endPoint);
					}}
				>
					<i className="fa fa-upload" aria-hidden="true"></i>
				</Button>
			</div>
		);
	};
	const sortCaret = (order, column) => {
		if (!order)
			return (
				<span>
					&nbsp;<i className="fas fa-sort" style={{ fontSize: "10px" }}></i>
				</span>
			);
		else if (order === "asc")
			return (
				<span>
					&nbsp;<i className="fas fa-sort-up" style={{ fontSize: "10px" }}></i>
				</span>
			);
		else if (order === "desc")
			return (
				<span>
					&nbsp;<i className="fas fa-sort-down" style={{ fontSize: "10px" }}></i>
				</span>
			);
		return null;
	};
	const gradeValidator = (newValue, row, column) => {
		if (isNaN(newValue)) {
			return {
				valid: false,
				message: "Hãy nhập điểm bằng số",
			};
		}
		if (+newValue >= 0 && +newValue <= gradeStructure.total) return { valid: true };
		return { valid: false, message: `Phạm vi điểm 0 - ${gradeStructure.total}` };
	};
	const formatter = (cell, row) => {
		console.log("==== ~ formatter ~ row", row);
		console.log("==== ~ formatter ~ cell", cell);

		if (row.account !== "") {
			if (cell.fullname) {
				return (
					<span>
						<Link to={`/users/${row.account.id}`}>{cell.fullname}</Link>
					</span>
				);
			}
		}
		return <span>{cell}</span>;
	};
	const gradeCompositions = gradeStructure ? gradeStructure.gradeCompositions : [];
	const defaultSorted = [
		{
			dataField: "name",
			order: "desc",
		},
	];
	const columns = [
		{
			dataField: "studentId",
			text: "MSSV",
			editable: false,
			sort: true,
			headerFormatter,
			sortCaret,
			formatter,
		},
		{
			dataField: "fullName",
			text: "Họ và tên",
			sort: true,
			editable: false,
			headerFormatter,
			sortCaret,
			formatter,
		},
		{
			dataField: "account",
			text: "Tài khoản",
			sort: true,
			editable: false,
			headerFormatter,
			sortCaret,
			formatter,
		},
	];
	gradeCompositions.forEach((e) => {
		columns.push({
			dataField: e.name,
			text: `${e.name} (${e.percent}%)`,
			editable: true,
			headerFormatter: headerGradeFormatter,
			validator: gradeValidator,
		});
	});
	columns.push({
		dataField: "total",
		text: "Tổng kết",
		sort: true,
		editable: false,
		headerFormatter,
		sortCaret,
		formatter: (cell, row) => {
			if (gradeStructure && +cell < +gradeStructure.total * 0.5) return <span style={{ color: "red" }}>{cell}</span>;
			else return <span>{cell}</span>;
		},
	});

	const data = [];
	console.log("students", students);
	students.forEach((e) => {
		const newObj = { studentId: e.studentId, fullName: e.fullName, account: e.user ? e.user : "" };
		var updated = false;
		for (var i = 0; i < gradeCompositions.length; i++) {
			if (e.grades) {
				for (var j = 0; j < e.grades.length; j++)
					if (e.grades[j].name === gradeCompositions[i].name) {
						newObj[`${gradeCompositions[i].name}`] = e.grades[j].grade;
						updated = true;
						break;
					}
				if (!updated) newObj[`${gradeCompositions[i].name}`] = "";
			} else newObj[`${gradeCompositions[i].name}`] = "";
		}

		newObj["total"] = e["total"] ? e["total"] : "";
		data.push(newObj);
	});

	console.log("==== ~ students.forEach ~ data", data);

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
		for (var i = 0; i < errorList.length; i++)
			if (row.studentId === errorList[i]) {
				style.backgroundColor = "#FFCDD2";
				break;
			}

		return style;
	};
	return (
		<ToolkitProvider bootstrap5 defaultSorted={defaultSorted} keyField="studentId" data={data} columns={columns} search>
			{(props) => (
				<div>
					<SearchBar {...props.searchProps} className="search-field" placeholder="Tìm kiếm" />
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
	);
};
export default GradeBoard;
