import React, { useState } from "react";
import { Col, Row, Container, Card, Button ,Toast} from "react-bootstrap";
import EditClassRoomForm from "./edit-classroom-form";
const TabDetail = ({classroom, onEditedClassRoom}) => {
    const [showEditClass, setEditCreateClass] = useState(false);
    const handleClose = () => {
        setEditCreateClass(false);
    };
    const [show, setShow] = useState(false);
    const openModal = () =>{
        setEditCreateClass(true);
    }
    const invLink = `${window.location.host}/invitation?classroomId=${classroom.id}&role=STUDENT`
    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(invLink);
        setShow(true);
      }
    
    return (
        <Container>
            <Row>
               
                    
                    <Col sm={3}>
                    {  classroom&&classroom.user.userRole === "STUDENT"? 
                           ( <Card  bg="light" >
                                <Card.Header>
                                    <Card.Title>Bài tập sắp đến hạn</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                   <Card.Text>Không có bài tập nào sắp đến hạn</Card.Text>
                                    
                                   
                                </Card.Body>
                            </Card>)

                        :
                
                        (<div> 
                            <Card  bg="light" style={{marginBottom: "10px", position:'relative'}}>
                                <Card.Header>
                                    <Card.Title>Đường dẫn vào lớp</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div style = {{display: "flex",lexDirection:'row', justifyContent:"center"}}>
                                        <Card.Text style = {{flexWrap: "nowrap", overflowX: 'auto'}}>
                                            {invLink}
                                        </Card.Text>
                                        
                                    </div>
                                    <br/>
                                    <div style = {{display: "flex",flexDirection:'row', justifyContent:"center"}}>
                                        <Button variant="outline-primary" onClick = {copyCodeToClipboard}>Sao chép</Button>
                                    
                                    </div>
                                </Card.Body>
                                <div style = {{display: "flex",flexDirection:'row', justifyContent:"center"}}>
                                    <Toast style = {{ position:'absolute', top: "50%", width: "120px", right: "30%",}}
                                            onClose={() => setShow(false)} 
                                            show={show} 
                                            delay={1000} 
                                            autohide >
                                            <Toast.Body>Đã sao chép!</Toast.Body>
                                    </Toast>
                                </div>
                                
                            </Card>
                        
                            <Card  bg="light" >
                                <Card.Header>
                                    <Card.Title>Cấu hình</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div style = {{display: "flex",lexDirection:'row', justifyContent:"center"}}>
                                    
                                        <Button variant="outline-success" onClick = {openModal}>Thay đổi thông tin</Button>
                                    </div>
                                    
                                    <EditClassRoomForm
                                        show={showEditClass}
                                        handleClose={handleClose}
                                        onEditedClassRoom={onEditedClassRoom}
                                        classroom = {classroom}
                                    />
                                </Card.Body>
                            </Card>
                        </div>)
                       }
                    </Col>
                
                <Col sm={9} >
                    <Card bg="light">
                        <Card.Header>
                            <Card.Title>Thông tin lớp học</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Tên lớp</Card.Title>
                            <Card.Text>
                                {classroom.name}
                            </Card.Text>
                            <Card.Title>Môn học</Card.Title>
                            <Card.Text>
                                {classroom.subject?classroom.subject:"Trống"}
                            </Card.Text>
                            <Card.Title>Mô tả lớp học</Card.Title>
                            <Card.Text>
                                {classroom.description?classroom.description:"Trống"}
                            </Card.Text>
                            <Card.Title>Phòng học</Card.Title>
                            <Card.Text>
                                {classroom.room?classroom.room:"Trống"}
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                
                </Col>
                
            </Row>
            
        </Container>
       
    )
}
export default TabDetail;