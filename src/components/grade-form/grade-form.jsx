import React, { useState, useEffect } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spining from "../spinning/spinning.component";
import { Modal, Button, Form, Col, Row, Card, CloseButton, InputGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GradeForm = ({ show, handleClose, onGradeEdit, classroom }) => {

	const [err, setErr] = useState("")
	const [onSubmiting, setOnSubmiting] = useState(false);
	const [total, setTotal] = useState('');
	const [parems, setParems] = useState([{ name: "", percent: "" }]);
	const [validated, setValidated] = useState(false);

	const init = () => {
		if (classroom.gradeStructure) {
			// deep copy object
			const gradeStructure = JSON.parse(JSON.stringify(classroom.gradeStructure))

			if (gradeStructure.parems && gradeStructure.parems.length > 0) {
				setParems(Array.from(gradeStructure.parems))
			}
			if (gradeStructure.total) {
				setTotal(gradeStructure.total)
			}
		}
		setValidated(false)
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => init(), [show]);


	const closeModal = () => {
		handleClose()
	}

	const onPercentChange = (val, index) => {
		const newParems = parems.slice();
		newParems[index].percent = val.target.value;
		setParems(newParems)
		setErr("");
	}
	const onNameChange = (val, index) => {
		const newParems = parems.slice();
		newParems[index].name = val.target.value;
		setParems(newParems);
		setErr("");
	}

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const items = Array.from(parems);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setParems(items);
	}
	const onAddClick = () => {
		setParems([...parems, { name: "", percent: "" }]);
	}
	const onRemoveClick = (index) => {
		const newParems = parems.slice();
		newParems.splice(index, 1);
		setParems(newParems);
	}

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false || !(total && (+total) > 0)) {
			event.preventDefault();
			event.stopPropagation();

		}
		else {
			var sum = 0;
			for (var i = 0; i < parems.length; i++)
				sum += +parems[i].percent;
			if (sum === 100)
				onSubmit();
			else {
				setErr("Tổng phần trăm các điểm thành phần phải đúng 100%")
			}
		}
		setValidated(true);
		event.preventDefault();
		event.stopPropagation();
	};
	const onSubmit = async () => {
		setOnSubmiting(true);
		try {
			const data = { total, parems }
			console.log(data)
			await postApiMethod(`classrooms/${classroom.id}/grade-structure`, data);
			onGradeEdit(data);
			handleClose();
			init();

		} catch (error) {
			console.log("error on submitting", error);
			setErr(error.message)
		}
		setOnSubmiting(false);
	};

	const renderParems = (name, percent, index) => {
		return (
			<Draggable key={index.toString()} draggableId={index.toString()} index={index} >
				{(provided) => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Card>
							<Card.Body >
								<div
									className="d-flex flex-row w-100 justify-content-end mb-3"
								>
									{parems.length > 1 ? <CloseButton onClick={() => onRemoveClick(index)} /> : null}
								</div>
								<Form.Group as={Row} className="mb-3">
									<Form.Label column sm="4">
										Cột điểm
									</Form.Label>
									<Col sm="8">
										<Form.Control
											required
											type="text"
											placeholder="Tên"
											value={name}
											onChange={(val) => onNameChange(val, index)} />
										<Form.Control.Feedback type="invalid">
											Không được bỏ trống
										</Form.Control.Feedback>
									</Col>

								</Form.Group>
								<Form.Group as={Row} className="mb-3">
									<Form.Label column sm="4">
										Phần trăm
									</Form.Label>
									<Col sm="8">
										<InputGroup>

											<Form.Control
												required
												type="number"
												placeholder="Phần trăm"
												value={percent}
												onChange={(val) => onPercentChange(val, index)} />
											<Form.Control.Feedback type="invalid">
												Không được bỏ trống
											</Form.Control.Feedback>
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
	}
	return (
		<Modal show={show} onHide={closeModal}>
			<Form validated={validated} onSubmit={handleSubmit} >
				<Modal.Header closeButton>
					<Modal.Title>Thang điểm</Modal.Title>
					{onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
						<div style={{ color: 'red' }}>{err}</div>
					</div>
					<Card style={{ border: "0px" }}>
						<Card.Body>
							<Form.Group as={Row} className="mb-3" >
								<Form.Label column sm="4">
									Tổng điểm
								</Form.Label>
								<Col sm="6">
									<Form.Control
										required
										isInvalid={!(total && (+total) > 0)}
										type="number"
										placeholder="Điểm"
										value={total}
										onChange={(e) => setTotal(e.target.value)} />
									<Form.Control.Feedback type="invalid">
										Hãy điền vào một số lớn hơn 0
									</Form.Control.Feedback>
								</Col>
								<Col sm="2">
									<Button variant="outline-success" style={{ width: '100%' }} onClick={onAddClick}>
										<i className="fas fa-plus"></i>
									</Button>
								</Col>
							</Form.Group>
						</Card.Body>

					</Card>

					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Droppable droppableId="parems" >
							{(provided) => (
								<div  {...provided.droppableProps} ref={provided.innerRef}>
									{parems.map(({ name, percent }, index) =>
										renderParems(name, percent, index)
									)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>


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
		</Modal>
	);
};

export default GradeForm;
