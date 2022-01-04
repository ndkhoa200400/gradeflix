import { Modal, Button, Card, Row, Col, Alert } from "react-bootstrap";
import QuickViewListMember from "./quick-view-list-member";
const ClassQuickView = ({show, handleClose, openModal, classroom})=>{
    const icon = isLocked?"fas fa-unlock":"fas fa-lock";
    var host = null
    var teachers = [];
    var students = [];
    var isLocked = !classroom.active;
    var hostId = classroom.hostId;
    var users = classroom.users
    if (!users)
        users = []
    for(var i = 0; i < users.length; i++){
        if (users[i].userRole === "TEACHER"){
            teachers.push(users[i])
            
        }
        else if (users[i].userRole === "HOST"){
            teachers.push(users[i])
            host = users[i];
        }
            
        else   
            students.push(users[i])
    }
    const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
	const gradeCompositions = classroom.gradeStructure ? classroom.gradeStructure.gradeCompositions : [];
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
            <Modal.Title style = {{fontWeight:'bold'}}>{classroom.name} (  
                <span style = {{color:isLocked?'red':'green'}}>
                    {isLocked?'Bị khóa':'Đang hoạt động'}
                </span>) </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={3} >
                        <Card style={{ marginBottom: "10px" }}>
							<Card.Header>
								<Card.Title>Thang điểm</Card.Title>
							</Card.Header>
							<Card.Body className="text-center d-grid grap-3">
								{classroom.gradeStructure ? (
									<div>
										<h5>Tổng điểm lớp: {total}</h5>
										{gradeCompositions.map((item, idx) => (
											<Card.Text
												key={idx}
												style={{
													display: "flex",
													lexDirection: "row",
													justifyContent: "space-between",
												}}
											>
												<div>{item.name}</div>
												<div>{item.percent}%</div>
											</Card.Text>
										))}
									</div>
								) : (
									<Alert className="my-2" variant={"info"}>
										<Alert.Heading>Chưa có thang điểm!</Alert.Heading>
										
									</Alert>
								)}
							</Card.Body>
						</Card>
                    </Col>

                    <Col sm={9}>
                        <Card className="my-3 my-sm-0"  >
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
                        <QuickViewListMember isTeacherList = {true} list={teachers} />
                        <QuickViewListMember isTeacherList = {false} list={students}/>
                        
                            
                     
                    </Col>
                </Row>
                

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Đóng
            </Button>
            <Button variant={isLocked?"success":"danger"}onClick={() => {
                                                openModal(classroom);
                                            }}>
                <i className = {icon}></i> {isLocked?"Mở khóa":"Khóa"}
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ClassQuickView;