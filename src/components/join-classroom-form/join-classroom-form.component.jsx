import React, { useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
const JoinClassRoomForm = ({ show, handleClose, onClassJoined }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [onSubmiting, setOnSubmiting] = useState(false);

  const closeModal = () =>{
    handleClose()
    reset()
  }

  const onSubmit = async (data) => {
    setOnSubmiting(true);
    try {
      const newClassroom = await getApiMethod(`join-by-code/${data.code}`);
      onClassJoined(newClassroom);
      handleClose();

      reset();
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
    setOnSubmiting(false);
  };
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Tham gia lớp học bằng mã lớp</Modal.Title>
        {onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Mã lớp học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mã lớp học (bắt buộc)"
              {...register("code", { required: true })}
              isInvalid={errors.code}
            />
            {errors.code && (
              <Form.Control.Feedback type="invalid">
                Bắt buộc
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
          Tham gia
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JoinClassRoomForm;
