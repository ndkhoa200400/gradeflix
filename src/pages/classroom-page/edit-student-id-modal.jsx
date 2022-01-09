import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../../components/spinning/spinning.component"
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
const EditStudentIdModal = ({ show, handleClose, onEditStudentId,classroom }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [onSubmiting, setOnSubmiting] = useState(false);

  const closeModal = () =>{

    handleClose()
    reset()
  }

  const onSubmit = async (data) => {
    if (classroom&&data.studentId === classroom.user.studentId){
      setError("studentId", {
          message: "Hãy nhập mã số sinh viên mới"
      });
      return;
    }
    setOnSubmiting(true);
    try {


      // gửi cho api
      const link = `classrooms/${classroom?classroom.id:""}/users/${classroom?classroom.user.id:""}`

      await postApiMethod(link, data);

      onEditStudentId(data.studentId);
      handleClose();

      reset();
    } catch (error) {
      console.log( error);
      setError("studentId", {
          message: "Mã số sinh viên đã tồn tại"
      });

    }
    setOnSubmiting(false);
  };
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa mã số sinh viên</Modal.Title>
        {onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Mã số sinh viên</Form.Label>
            <Form.Control
                type="text"
                placeholder="Nhập mã số sinh viên"
                {...register("studentId", {  })}
                isInvalid={errors.studentId}
                defaultValue={classroom?classroom.user.studentId:""}
            />
            {errors.studentId?.message && (
                  <Form.Control.Feedback type="invalid">
                      {errors.studentId?.message}
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
            Chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStudentIdModal;
