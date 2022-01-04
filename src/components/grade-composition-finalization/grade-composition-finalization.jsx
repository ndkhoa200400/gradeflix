import React, { useState, useEffect } from "react";
import { postApiMethod } from "../../api/api-handler";
import { Modal, Button, Form, Col, Row, Card } from "react-bootstrap";
import InfoAlert from "../alert/info-alert.component";
import ErrorAlert from "../alert/error-alert.component";

const GradeCompositionFinalization = ({ show, handleClose, onGradeEdit, classroom }) => {
	const [total, setTotal] = useState("");
	const [gradeCompositions, setGradeCompositions] = useState([{ name: "", percent: "", isFinal: false }]);
	const [errorMessage, setErrorMessage] = useState("");
	const [infoMessage, setInfoMessage] = useState("");
	const init = () => {
		if (classroom.gradeStructure) {
			// deep copy object
			const gradeStructure = JSON.parse(JSON.stringify(classroom.gradeStructure));

			if (gradeStructure.gradeCompositions && gradeStructure.gradeCompositions.length > 0) {
				setGradeCompositions(Array.from(gradeStructure.gradeCompositions));
			}
			if (gradeStructure.total) {
				setTotal(gradeStructure.total);
			}
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => init(), [show]);

	const closeModal = () => {
		handleClose();
	};

	const onFinalStatusChange = (val, index) => {
		const newgradeCompositions = gradeCompositions.slice();
		newgradeCompositions[index].isFinal = val.target.checked;
		setGradeCompositions(newgradeCompositions);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = { total, gradeCompositions };
			await postApiMethod(`classrooms/${classroom.id}/grade-structure`, data);
			onGradeEdit(data);
			init();
			setInfoMessage("Cập nhật thành công.");
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const renderGradeComposition = (name, isFinal, index) => {
		return (
			<div>
				<Card>
					<Card.Body>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="4">
								Cột điểm
							</Form.Label>
							<Col sm="8">
								<Form.Control required type="text" placeholder="Tên" value={name} disabled />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3">
							<Col sm="12">
								<Form.Check
									checked={isFinal}
									column
									sm="12"
									id={`checked-${index}`}
									type={"checkbox"}
									label={`Công bố điểm`}
									onChange={(val) => onFinalStatusChange(val, index)}
								/>
							</Col>
						</Form.Group>
					</Card.Body>
				</Card>
				<br />
			</div>
		);
	};
	return (
		<Modal show={show} onHide={closeModal}>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					{gradeCompositions.map(({ name, isFinal }, index) => renderGradeComposition(name, isFinal, index))}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" type="button" onClick={closeModal}>
						Đóng
					</Button>
					<Button variant="outline-primary" type="submit">
						Hoàn tất
					</Button>
				</Modal.Footer>
			</Form>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
			<InfoAlert show={infoMessage} setHide={handleClose} message={infoMessage} />
		</Modal>
	);
};

export default GradeCompositionFinalization;
