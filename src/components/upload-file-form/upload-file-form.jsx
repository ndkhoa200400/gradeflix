import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../../components/spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form,  } from "react-bootstrap";
const UploadFileForm = ({
	show,
	handleClose,
	endPoint,
	classroom,
	refeshGradeBoard,
	title,
	gradeForm
}) => {
	const {
		handleSubmit,
		reset,
	} = useForm();

	const [onSubmiting, setOnSubmiting] = useState(false);
	const [fileName, setFileName] = useState("");
	const [file, setFile] = useState();
	const uploadImage = (e) => {
		if (e) {
			setFileName(e.target.files[0].name);
			setFile(e.target.files[0])
		};
	};

	const closeModal = () => {
		handleClose();
		setFileName("");
		reset();
	};

	const onSubmit = async () => {
		setOnSubmiting(true);
		try {
			const data = new FormData();
			data.append("files", file);

			const res = await postApiMethod(
				"classrooms/" + classroom.id + "/" + endPoint,
				data,
				"multipart/form-data"
			);
			var msg = ""
			if (res.errorList && gradeForm){

				msg = "Điểm không hợp lệ tại các mã số sinh viên: ";
				for(var i = 0; i < res.errorList.length && i < 10; i++){
					msg += res.errorList[i] + ", "
				}
				if (res.errorList.length > 10)
					msg += "..."
				else
					msg = msg.slice(0, msg.length-2);
			}
			refeshGradeBoard(msg, res.errorList);
			handleClose();

			reset();

		} catch (error) {

			console.log( error);
			//alert("Đã xảy ra lỗi! Vui lòng thử lại");
		}
		setFileName("");
		setOnSubmiting(false);
	};
	return (
		<Modal show={show} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
				{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3">
						<Form.Label>File</Form.Label>
						<div className="cursor-pointer" target='_blank' rel="noreferrer">
							<Form.Control
								type="text"
								placeholder="Chọn file"
								value={fileName}
							/>
						</div>

						<div className="py-2">
							<input type="file" id="upload" hidden onChange={uploadImage} />
							<label
								htmlFor="upload"
								className="cursor-pointer btn btn-outline-primary"
							>
								Tải file lên
							</label>
						</div>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-secondary" onClick={closeModal}>
					Đóng
				</Button>
				<Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
					Cập nhật
				</Button>
			</Modal.Footer>

		</Modal>
	);
};

export default UploadFileForm;
