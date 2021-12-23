import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
const StudentGrade = ({ classroom, studentList }) => {
	const [mappingGrades, setMappingGrades] = useState({});

	useEffect(() => {
		if (studentList) {
			const mapping = {};
			const studentGrade = studentList.grades ?? [];
			if (classroom?.gradeStructure)
				for (const gradeCompositions of classroom?.gradeStructure?.gradeCompositions) {
					const grade = studentGrade.find((g) => g.name === gradeCompositions.name);
					if (gradeCompositions.isFinal && grade?.grade) mapping[gradeCompositions.name] = grade.grade;
					else {
						mapping[gradeCompositions.name] = "Chưa công bố";
					}
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
			{classroom.gradeStructure.gradeCompositions.map((gradeCompositions, idx) => (
				<Row className="p-2" key={idx}>
					<Col className="border border-2 border-end-0 p-3" sm={8}>
						{gradeCompositions.name}
					</Col>
					<Col className="border border-2 p-3">{mappingGrades[gradeCompositions.name]}</Col>
				</Row>
			))}
		</div>
	) : (
		<div>
			<h3>Cập nhật đúng mã số sinh viên để xem điểm</h3>
		</div>
	);
};

export default StudentGrade;
