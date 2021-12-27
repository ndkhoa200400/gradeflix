import { Modal, Button, Card, Row, Col } from "react-bootstrap";
const ClassQuickView = ({show, handleClose, handleLock, isLocked, classroom})=>{
    const icon = isLocked?"fas fa-unlock":"fas fa-lock";
    const text = isLocked?"Mở khóa":"Khóa";
    classroom = {name: "name", subject: "subject", description: "description", classroom: "classroom"}
    return (
        <Modal  show={show} 
                onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
        >
            <Modal.Header closeButton>
            <Modal.Title>{classroom.name} (Xem nhanh)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={3}>
                    <Card>
                            <Card.Header>
                                <Card.Title>Bài tập sắp đến hạn</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>Không có bài tập nào sắp đến hạn</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={9}>
                        <Card className="my-3 my-sm-0">
                            <Card.Header>
                                <Card.Title>Thông tin lớp học</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Tên lớp</Card.Title>
                                <Card.Text>{classroom.name}</Card.Text>
                                <Card.Title>Môn học</Card.Title>
                                <Card.Text>{classroom.subject ? classroom.subject : "Trống"}</Card.Text>
                                <Card.Title>Mô tả lớp học</Card.Title>
                                <Card.Text>{classroom.description ? classroom.description : "Trống"}</Card.Text>
                                <Card.Title>Phòng học</Card.Title>
                                <Card.Text>{classroom.room ? classroom.room : "Trống"}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant={isLocked?"success":"danger"} onClick={handleClose}>
                <i className = {icon}></i> {text}
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ClassQuickView;