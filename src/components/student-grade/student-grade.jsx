import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { getApiMethod } from "../../api/api-handler";
const StudentGrade = ({ classroom }) => {
	const [studentList, setStudentList] = useState();
	const [mappingGrades, setMappingGrades] = useState({});
	useEffect(() => {
		const getGrades = async () => {
			if (classroom.user.studentId) {
				const result = await getApiMethod(`/classrooms/${classroom.id}/students/${classroom.user.studentId}/grades`);
				setStudentList(result);
			}
		};
		try {
			return getGrades();
		} catch (err) {
			console.log(err);
		}
	}, [classroom]);

	useEffect(() => {
		console.log("grades", studentList);
		if (studentList) {
			const mapping = {};
			const studentGrade = studentList.grades
			for (const parem of classroom.gradeStructure.parems) {
				const grade = studentGrade.find((g) => g.name === parem.name) ?? "";

				mapping[parem.name] = grade.grade;
			}
			setMappingGrades(mapping);
		}
	}, [studentList]);

	return studentList ? (
		classroom.gradeStructure.parems.map((parem) => (
			<Row>
				<Col>{parem.name}</Col>
				<Col>{mappingGrades[parem.name]}</Col>
			</Row>
		))
	) : (
		<div>
			<h3>Chưa cập nhật bảng điểm.</h3>
		</div>
	);
};

export default StudentGrade;
