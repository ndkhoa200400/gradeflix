import React, { useState, useEffect } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../spinning/spinning.component";
import { Modal, Button, Form, Col, Row, Card, CloseButton, InputGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GradeForm = ({ show, handleClose, onGradeEdit, classroom }) => {
	const [err, setErr] = useState("");
	const [onSubmiting, setOnSubmiting] = useState(false);
	const [total, setTotal] = useState("");
	const [gradeCompositions, setGradeCompositions] = useState([{ name: "", percent: "", isFinal: false }]);
	const [validated, setValidated] = useState(false);

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
		setValidated(false);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => init(), [show]);

	const closeModal = () => {
		handleClose();
	};

	const onPercentChange = (val, index) => {
		const newgradeCompositions = gradeCompositions.slice();
		newgradeCompositions[index].percent = val.target.value;
		setGradeCompositions(newgradeCompositions);
		setErr("");
	};
	const onNameChange = (val, index) => {
		const newgradeCompositions = gradeCompositions.slice();
		newgradeCompositions[index].name = val.target.value;
		setGradeCompositions(newgradeCompositions);
		setErr("");
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const items = Array.from(gradeCompositions);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setGradeCompositions(items);
	};
	const onAddClick = () => {
		setGradeCompositions([...gradeCompositions, { name: "", percent: "" }]);
	};
	const onRemoveClick = (index) => {
		const newgradeCompositions = gradeCompositions.slice();
		newgradeCompositions.splice(index, 1);
		setGradeCompositions(newgradeCompositions);
	};
	const isDuplicated = (gradeCompositions) => {
		for (var i = 0; i < gradeCompositions.length; i++) {
			var count = 0;
			for (var j = 0; j < gradeCompositions.length; j++) {
				if (gradeCompositions[i].name === gradeCompositions[j].name) count++;
			}
			if (count >= 2) {
				return true;
			}
		}
		return false;
	};
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false || !(total && +total > 0)) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			if (isDuplicated(gradeCompositions) === true) {
				setErr("T??n c??c c???t ??i???m kh??ng ???????c tr??ng nhau");
			} else {
				var sum = 0;
				for (var i = 0; i < gradeCompositions.length; i++) sum += +gradeCompositions[i].percent;
				if (sum === 100) onSubmit();
				else {
					setErr("T???ng ph???n tr??m c??c ??i???m th??nh ph???n ph???i ????ng 100%");
				}
			}
		}
		setValidated(true);
		event.preventDefault();
		event.stopPropagation();
	};
	const onSubmit = async () => {
		setOnSubmiting(true);
		try {
			const data = { total, gradeCompositions };
			await postApiMethod(`classrooms/${classroom.id}/grade-structure`, data);
			onGradeEdit(data);
			handleClose();
			init();
		} catch (error) {
			console.log("error on submitting", error);
			setErr(error.message);
		}
		setOnSubmiting(false);
	};

	const renderGradeComposition = (name, percent, isFinal, index) => {
		return (
			<Draggable key={index.toString()} draggableId={index.toString()} index={index}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Card>
							<Card.Body>
								<div className="d-flex flex-row w-100 justify-content-end mb-3">
									{gradeCompositions.length > 1 ? <CloseButton onClick={() => onRemoveClick(index)} /> : null}
								</div>
								<Form.Group as={Row} className="mb-3">
									<Form.Label column sm="4">
										C???t ??i???m
									</Form.Label>
									<Col sm="8">
										<Form.Control
											required
											type="text"
											placeholder="T??n"
											value={name}
											onChange={(val) => onNameChange(val, index)}
										/>
										<Form.Control.Feedback type="invalid">Kh??ng ???????c b??? tr???ng</Form.Control.Feedback>
									</Col>
								</Form.Group>
								<Form.Group as={Row} className="mb-3">
									<Form.Label column sm="4">
										Ph???n tr??m
									</Form.Label>
									<Col sm="8">
										<InputGroup>
											<Form.Control
												required
												type="number"
												placeholder="Ph???n tr??m"
												value={percent}
												onChange={(val) => onPercentChange(val, index)}
											/>
											<Form.Control.Feedback type="invalid">Kh??ng ???????c b??? tr???ng</Form.Control.Feedback>
											<InputGroup.Text>%</InputGroup.Text>
										</InputGroup>
									</Col>
								</Form.Group>
							</Card.Body>
						</Card>
						<br />
					</div>
				)}
			</Draggable>
		);
	};
	return (
		<Modal show={show} onHide={closeModal}>
			<Form validated={validated} onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Thang ??i???m</Modal.Title>
					{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
						<div style={{ color: "red" }}>{err}</div>
					</div>
					<Card style={{ border: "0px" }}>
						<Card.Body>
							<Form.Group as={Row} className="mb-3">
								<Form.Label column sm="4">
									T???ng ??i???m
								</Form.Label>
								<Col sm="6">
									<Form.Control
										required
										isInvalid={!(total && +total > 0)}
										type="number"
										placeholder="??i???m"
										value={total}
										onChange={(e) => setTotal(e.target.value)}
									/>
									<Form.Control.Feedback type="invalid">H??y ??i???n v??o m???t s??? l???n h??n 0</Form.Control.Feedback>
								</Col>
								<Col sm="2">
									<Button variant="outline-success" style={{ width: "100%" }} onClick={onAddClick}>
										<i className="fas fa-plus"></i>
									</Button>
								</Col>
							</Form.Group>
						</Card.Body>
					</Card>

					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Droppable droppableId="gradeCompositions">
							{(provided) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{gradeCompositions.map(({ name, percent, isFinal }, index) =>
										renderGradeComposition(name, percent, isFinal, index)
									)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" type="button" onClick={closeModal}>
						????ng
					</Button>
					<Button variant="outline-primary" type="submit">
						Ho??n t???t
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default GradeForm;
