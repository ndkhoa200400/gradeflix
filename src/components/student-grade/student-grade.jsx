import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
const StudentGrade = ({ classroom ,studentList}) => {
	const [mappingGrades, setMappingGrades] = useState({});


	useEffect(() => {
		if (studentList) {
			const mapping = {};
			const studentGrade = studentList.grades
			for (const parem of classroom.gradeStructure.parems) {
				const grade = studentGrade.find((g) => g.name === parem.name) ?? "";

				mapping[parem.name] = grade.grade;
			}
			setMappingGrades(mapping);
		}
	}, [studentList, classroom]);

	return studentList ? (
		<div className="student-grades p-2">
				<Row className="px-2 text-center">
				<Col className="border border-2 border-end-0 py-2 fw-bold" sm={8}>Cột điểm</Col>
				<Col className="border border-2 py-2 fw-bold">Điểm</Col>
			</Row>
		{		classroom.gradeStructure.parems.map((parem) => (
			<Row className="p-2">
				<Col className="border border-2 border-end-0 p-3" sm={8}>{parem.name}</Col>
				<Col className="border border-2 p-3">{mappingGrades[parem.name]}</Col>
			</Row>
			))}
		</div>

	) : (
		<div>
			<h3>Chưa cập nhật bảng điểm.</h3>
		</div>
	);
};

export default StudentGrade;
