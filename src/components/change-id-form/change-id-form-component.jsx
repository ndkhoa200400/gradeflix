import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spining from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";

const listemail = "huyly@kobiton.com,lydanghuy918@gmail.com"
const ChangeIDForm = ({ show, handleClose, idClass, userId }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const [onSubmiting, setOnSubmiting] = useState(false);

  const closeModal = () => {
    handleClose()
    reset()
  }

  const onSubmit = async (data) => {
    setOnSubmiting(true);
    try {
      // Lấy ảnh ngẫu nhiên làm banner

      console.log(data)
      console.log("classrooms/" + idClass + "/users/" + userId);
      // gửi cho api
      await postApiMethod("classrooms/" + idClass + "/users/" + userId, data);

      handleClose();

      reset();
    } catch (error) {
      console.log("error", error);
      alert("Đã xảy ra lỗi! Vui lòng thử lại");
    }
    setOnSubmiting(false);
  };
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Đổi mã số sinh viên</Modal.Title>
        {onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-4">
            <Form.Label> MSSV</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập MSSV(bắt buộc)"
              {...register("studentId")}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="outline-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Mời
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeIDForm;
