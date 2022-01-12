import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import StudentGradeCompoistionItem from "./student-grade-composition-item";
const StudentGrade = ({ classroom, studentList }) => {
	const [mappingGrades, setMappingGrades] = useState({});
	useEffect(() => {
		if (studentList) {
			const mapping = {};
			// if true => show total
			let isAllFinalized = true;
			const studentGrade = studentList.grades ?? [];
			if (classroom?.gradeStructure)
				for (const gradeCompositions of classroom?.gradeStructure?.gradeCompositions) {
					const grade = studentGrade.find((g) => g.name === gradeCompositions.name);
					if (gradeCompositions.isFinal && grade?.grade) mapping[gradeCompositions.name] = grade.grade;
					else {
						mapping[gradeCompositions.name] = "Chưa công bố";
						isAllFinalized = false;
					}
				}
			if (studentList?.total && isAllFinalized) {
				mapping["total"] = studentList.total ?? 0;
			}
			setMappingGrades(mapping);
		}
	}, [studentList, classroom]);
	if (!classroom || !classroom.gradeStructure) {
		return (
			<div>
				<h3>Lớp chưa có thang điểm</h3>
			</div>
		);
	}
	return studentList && classroom?.gradeStructure?.gradeCompositions ? (
		<div className="student-grades p-2">
			<Row className="px-2 text-center">
				<Col className="border border-2 border-end-0 py-2 fw-bold" sm={8}>
					Cột điểm
				</Col>
				<Col className="border border-2 py-2 fw-bold">Điểm</Col>
			</Row>
			{classroom.gradeStructure.gradeCompositions.map((gradeComposition, idx) => (
				<StudentGradeCompoistionItem
					key={idx}
					gradeComposition={gradeComposition}
					grade={mappingGrades[gradeComposition.name]}
					classroom={classroom}
				/>
			))}
			{mappingGrades["total"] ? (
				<Row className="p-2">
					<Col className="border border-2 border-end-0 p-3" sm={8}>
						Tổng kết
					</Col>
					<Col className="border border-2 p-3">
						<div className="d-flex justify-content-between">{mappingGrades["total"]}</div>
					</Col>
				</Row>
			) : null}
		</div>
	) : (
		<div>
			<h3>Cập nhật đúng mã số sinh viên để xem điểm</h3>
		</div>
	);
};

export default StudentGrade;
