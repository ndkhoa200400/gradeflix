import React from "react";

import { Alert, Card } from "react-bootstrap";
import ParemItem from "../parem-item/parem-item.component";

const ListParem = ({ classroom }) => {
	const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
	const parem = classroom.gradeStructure ? classroom.gradeStructure.parems : "";

	return classroom.gradeStructure ? (
		<Card className="list-parem parem-list mb-3">
			<Card.Header className="bg-primary">
				<Card.Title className="text-white">Thang điểm</Card.Title>
			</Card.Header>

			<Card.Body>
				<h5>Tổng điểm lớp: {total}</h5>
				{parem.map((item, idx) => (
					<ParemItem parem={item} key={idx} />
				))}
			</Card.Body>
		</Card>
	) : (
		<Alert className="my-5" variant={"info"}>
			<Alert.Heading>Bạn chưa có thang điểm!</Alert.Heading>
			<p>Chọn nút Chỉnh sửa thang điểm để thêm</p>
		</Alert>
	);
};

export default ListParem;
