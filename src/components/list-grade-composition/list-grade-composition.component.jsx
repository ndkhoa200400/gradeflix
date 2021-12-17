import React from "react";

import { Alert, Card } from "react-bootstrap";
import GradeCompositionsItem from "../grade-composition-item/grade-composition-item.component";
const ListGradeCompositions = ({ classroom }) => {
	const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
	const gradeCompositions = classroom.gradeStructure ? classroom.gradeStructure.gradeCompositions ?? [] : [];
	return classroom.gradeStructure ? (
		<Card className="list-gradeCompositions grade-compositions-list mb-3">
			<Card.Header className="bg-primary">
				<Card.Title className="text-white">Thang điểm</Card.Title>
			</Card.Header>

			<Card.Body>
				<h5 className="mb-3">Tổng điểm lớp: {total}</h5>
				{gradeCompositions.map((item, idx) => (
					<GradeCompositionsItem gradeCompositions={item} key={idx} />
				))}
			</Card.Body>
		</Card>
	) : classroom?.user?.userRole === "TEACHER" ? (
		<Alert className="my-5" variant={"info"}>
			<Alert.Heading>Bạn chưa có thang điểm!</Alert.Heading>
			<p>Chọn nút Chỉnh sửa thang điểm để thêm</p>
		</Alert>
	) : (
		<Alert className="my-5" variant={"info"}>
			<Alert.Heading>Lớp học chưa có thang điểm!</Alert.Heading>
			<p>Liên hệ giáo viên để thêm.</p>
		</Alert>
	);
};

export default ListGradeCompositions;
