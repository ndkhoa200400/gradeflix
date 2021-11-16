import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component"
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
const EditStudentIdModal = ({ show, handleClose, onEditStudentId,classroom }) => {
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
      const link = `classrooms/${classroom?classroom.id:""}/users/${classroom?classroom.user.id:""}`
      console.log(link + data)
      const studentId = await postApiMethod(link, data);
      onEditStudentId(studentId);
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
        <Modal.Title>Chỉnh sửa mã số sinh viên</Modal.Title>
        {onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Mã số sinh viên</Form.Label>
            <Form.Control
                type="text"
                placeholder="Nhập mã số sinh viên"
                {...register("studentId", {  })}
                defaultValue={classroom?classroom.user.studentId:""}
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

export default EditStudentIdModal;
