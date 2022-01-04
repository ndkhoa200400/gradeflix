import { Modal, Button, Card, Row, Col, Alert, Form } from "react-bootstrap";
import {useState, useEffect} from 'react'
import Spining from "../spinning/spinning.component";

import { postApiMethod } from "../../api/api-handler";
const AccountQuickView = ({show, handleClose, openModal, user, onStudentIdChange})=>{
    const [spinning, setSpinning] = useState(false)
    const [err, setErr] = useState("")
    const [studentId, setStudentId] = useState(user.studentId)
    const isLocked = !user.active;
    const icon = isLocked?"fas fa-unlock":"fas fa-lock";
    useEffect(()=>{
        setStudentId(user.studentId)
        console.log(user)
    },[user])
    const onSubmiting = async()=>{
        setSpinning(true);
        try {
			const res = await postApiMethod(`admin/users/`+user.id, {studentId});
            onStudentIdChange(user.id, studentId)
		} catch (e) {
			console.log(e);
            setErr("Mã số sinh viên đã được sử dụng!");
        }
        setSpinning(false);
    }
    const formatDate = (date)=>{
		const dateObj = new Date(date);
		const month = dateObj.getMonth()+1;
		const day = String(dateObj.getDate()).padStart(2, '0');
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`
	}
    return (
        <Modal  show={show} 
                onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className = "classroom"
        >
            <Modal.Header closeButton>
            <Modal.Title style = {{fontWeight:'bold'}}>{user.fullname} (  
                <span style = {{color:isLocked?'red':'green'}}>
                    {isLocked?'Bị khóa':'Đang hoạt động'}
                </span>) 
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={4} >
                        <Card style={{ marginBottom: "10px" }}>
							<Card.Header>
								<Card.Title>Ảnh đại diện</Card.Title>
							</Card.Header>
							<Card.Body className="text-center d-grid grap-3">
                            <div className="avatar col-lg-5 text-center">
						<img src={user.avatar ? user.avatar:"/default-avatar.png"} alt="" className="d-block rounded rounded-circle m-auto mb-4" width="300" height="300" />
					
					</div>
							</Card.Body>
						</Card>
                    </Col>

                    <Col sm={8}>
                        <Card className="my-3 my-sm-0"  >
                        <Card.Header>
							<Card.Title>Thông tin cá nhân</Card.Title>
						</Card.Header>
						<Card.Body>
							<Form className="form-profile" >
								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder="Nhập email" value={user.email} disabled={true} />
								</Form.Group>

								<Form.Group className="mb-3" controlId="formFullname">
									<Form.Label>Họ và tên</Form.Label>
									<Form.Control
										type="text"
										placeholder="Nhập họ và tên"
										value={user.fullname} disabled={true}
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Ngày sinh</Form.Label>
									<Form.Control
										type="text"
										value={user.birthday} disabled={true}
									/>
								</Form.Group>
                                <Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Ngày mở tài khoản</Form.Label>
									<Form.Control
										type="text"
										value={formatDate(user.createdAt)} disabled={true}
									/>
								</Form.Group>
                                {user.role !== "ADMIN"?
                                    <div>
                                    <Form.Group className="mb-3" controlId="formStudentId">
                                        <Form.Label>Mã số sinh viên</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập mã số sinh viên"
                                            value={studentId}
                                            onChange = { (event) => { setStudentId(event.target.value); setErr("");}  }
                                        />
                                    </Form.Group>
                                    <div style = {{color: 'red', marginBottom: 20}}>{err}</div>
                                    <div className="d-flex" style={{justifyContent:'flex-end'}}>
                                        {spinning ? <Spining isFull={false} className="mx-2" /> : null}
                                        <Button style = {{width:100}} variant="primary" onClick={()=>onSubmiting()} className="px-4 py-2" disabled = {user.studentId === studentId}>
                                            Lưu
                                        </Button>
                                        
                                    </div>
                                    </div>
                                :null
                                }
								
							</Form>

						</Card.Body>
                        </Card>
                        
                    </Col>
                </Row>
                

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Đóng
            </Button>
            <Button variant={isLocked?"success":"danger"}onClick={() => {
                                                openModal(user);
                                            }}>
                <i className = {icon}></i> {isLocked?"Mở khóa":"Khóa"}
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AccountQuickView;