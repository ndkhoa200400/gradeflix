import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
const UploadFileForm = ({
    show,
    handleClose,
    endPoint,
    classroom,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [onSubmiting, setOnSubmiting] = useState(false);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState();
    const uploadImage = (e) => {
        if (e) {
            setFileName(e.target.files[0].name);
            console.log(e.target.files[0].name);
            setFile(e.target.files[0])
        };
    };

    const closeModal = () => {
        handleClose();
        reset();
    };

    const onSubmit = async () => {
        setOnSubmiting(true);
        try {
            const data = new FormData();
            data.files = [file];
            console.log(data);
           
            const res = await postApiMethod(
                "classrooms/" + classroom.id + "/" + endPoint,
                data,
             "multipart/form-data"
            );
            handleClose();

            reset();
        } catch (error) {
            //console.log( error);
            alert("Đã xảy ra lỗi! Vui lòng thử lại");
        }
        setOnSubmiting(false);
    };
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật file</Modal.Title>
                {onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>File</Form.Label>
                        <a alt="classroom banner cursor-pointer" target='_blank' rel="noreferrer">
                            <Form.Control
                                type="text"
                                placeholder="Chọn file"
                                defaultValue={fileName}
                            />
                        </a>

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
                <Button variant="outline-secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
                    Cập nhât
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UploadFileForm;
