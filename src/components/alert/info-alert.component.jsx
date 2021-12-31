import React from "react";
import { Button, Modal } from "react-bootstrap";
const InfoAlert = ({ show, setHide, message }) => {
	return (
		<Modal show={show} onHide={() => setHide(false)}>
			<Modal.Header className="bg-success">
				<Modal.Title className="text-white text-center">Thông báo</Modal.Title>
			</Modal.Header>
			<Modal.Body className="py-4 text-center fw-bold">{message}</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={() => setHide(false)}>
					Đồng ý
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default InfoAlert;
