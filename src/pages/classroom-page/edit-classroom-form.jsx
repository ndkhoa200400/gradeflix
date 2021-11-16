import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component"
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
const EditClassRoomForm = ({ show, handleClose, onEditedClassRoom, classroom }) => {
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
     

      // gửi cho api
      const res = await postApiMethod(`classrooms/${classroom?classroom.id:""}`, data);
      onEditedClassRoom(res);
      handleClose();

      reset();
    } catch (error) {
      console.log( error);
      alert("Đã xảy ra lỗi! Vui lòng thử lại");
    }
    setOnSubmiting(false);
  };
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thông tin lớp học</Modal.Title>
        {onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Tên lớp học (*)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên lớp học (bắt buộc)"
              {...register("name", { required: true })}
              isInvalid={errors.name}
              defaultValue={classroom?classroom.name:""}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                Bắt buộc
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Môn học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập môn học"
              {...register("subject")}
              defaultValue={classroom?classroom.subject:""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả lớp học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mô tả lớp học"
              {...register("description")}
              defaultValue={classroom?classroom.description:""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phòng học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập phòng học"
              {...register("room")}
              defaultValue={classroom?classroom.room:""}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
          Chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditClassRoomForm;
