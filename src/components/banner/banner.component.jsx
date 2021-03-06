import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../../components/spinning/spinning.component";
import { useNavigate } from "react-router-dom";
const ModalConFirmOutRoom = ({ show, handleClose, classroom }) => {
	const [onSubmiting, setOnSubmiting] = useState(false);
	const navigate = useNavigate();

	const onClick = async () => {
		setOnSubmiting(true);
		try {
			const link = `classrooms/${classroom ? classroom.id : ""}/leave`;
			await postApiMethod(link);
			navigate("/", { replace: true });
			handleClose();
		} catch (err) {}

		setOnSubmiting(false);
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Bạn có chắc muốn rời khỏi lớp?</Modal.Title>
				{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
			</Modal.Header>

			<Modal.Footer>
				<Button variant="outline-secondary" onClick={handleClose}>
					Hủy
				</Button>
				<Button variant="outline-primary" onClick={onClick}>
					Rời lớp
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
const Banner = ({ classroom }) => {
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	};
	const openModal = () => {
		setShowModal(true);
	};
	return (
		<div>
			<div>
				<div className="card bg-dark text-white " style={{ position: "relative" }}>
					<img
						className="card-img classroom-banner"
						src={classroom.banner}
						width="830"
						height="250"
						alt="classroom banner"
					></img>
					<div className="classroom-banner-container w-100 h-100"></div>
					<div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
						<h3 className="card-title">{classroom.name}</h3>
					</div>
					{classroom && classroom.user.userRole === "HOST" ? null : (
						<Button
							variant="outline-light"
							style={{ position: "absolute", top: "20px", right: "20px" }}
							onClick={openModal}
						>
							<i className="fas fa-sign-out-alt"></i>
						</Button>
					)}
				</div>
			</div>
			<ModalConFirmOutRoom show={showModal} handleClose={handleClose} classroom={classroom} />
		</div>
	);
};

export default Banner;
