import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spining from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";

const CreateInviteForm = ({ show, handleClose, idClass, role }) => {
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
      data.userEmails = getValues("userEmails").split(",");
      //console.log(data)
      // gửi cho api
      await postApiMethod("classrooms/" + idClass + "/send-invitation?role=" + role, data);

      handleClose();

      reset();
    } catch (error) {
      //console.log("error", error);
      alert("Đã xảy ra lỗi! Vui lòng thử lại");
    }
    setOnSubmiting(false);
  };
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{role === "TEACHER" ? "Mời giáo viên" : "Mời học sinh"}</Modal.Title>
        {onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-4">
            <Form.Label> Email</Form.Label>
            <Form.Control
              as="textarea" rows="3"
              {...register("userEmails", {
                required: true,
              })}
              isInvalid={errors.userEmails}
             
            />
            <Form.Control.Feedback type="invalid">
                     Không được bỏ trống
                </Form.Control.Feedback>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Hủy
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

export default CreateInviteForm;
