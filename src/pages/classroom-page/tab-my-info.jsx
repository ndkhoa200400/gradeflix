import React, { useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import Spining from "../../components/spinning/spinning.component";
const TabMyInfo = ({classroom}) => {
    const [showEditClass, setEditCreateClass] = useState(false);
    const handleClose = () => {
        setEditCreateClass(false);
    };
    const openModal = () =>{
        setEditCreateClass(true);
    }
    console.log(classroom);
    return (
        <Container>
            {!classroom ? <Spining />:
            <Row>
                <Col sm={3}>
                    
                    <Card  bg="light" style={{marginBottom: "10px"}}>
                        <Card.Header>
                            <Card.Title>Thông tin cá nhân</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text style = {{display: "flex",lexDirection:'row', justifyContent:"space-between"}}>
                                <div>
                                    Mã số sinh viên
                                </div>
                                <div>
                                    Mã số s 
                                </div>
                            </Card.Text>
                            <Card.Text style = {{display: "flex",lexDirection:'row', justifyContent:"space-between"}}>
                                <div>
                                    Họ và tên
                                </div>
                                <div>
                                    {classroom.user.fullname}
                                </div>
                            </Card.Text>
                            <Card.Text style = {{display: "flex",lexDirection:'row', justifyContent:"space-between"}}>
                                <div>
                                    Bài tập hoàn thành
                                </div>
                                <div>
                                    0
                                </div>
                            </Card.Text>
                            <Card.Text style = {{display: "flex",lexDirection:'row', justifyContent:"space-between"}}>
                                <div>
                                    Bài tập được giao 
                                </div>
                                <div>
                                   0
                                </div>
                            </Card.Text>
                            <Card.Text style = {{display: "flex",lexDirection:'row', justifyContent:"space-between"}}>
                                <div>
                                    Điểm tích lũy
                                </div>
                                <div>
                                    0.0
                                </div>
                            </Card.Text>
                            <br/>
                            <div style = {{display: "flex",lexDirection:'row', justifyContent:"center"}}>
                                <Button variant="outline-success" onClick = {openModal}>Chỉnh sửa mã số sinh viên</Button>
                            </div>
                            
                            
                            
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col sm={9} >
                    <Card bg="light">
                        <Card.Header>
                            <Card.Title>Bảng điểm</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text style = {{height: "200px"}}>
                                Tính năng đang trong quá trình phát triển ...
                            </Card.Text>
                        </Card.Body>
                    </Card>
                
                </Col>
   
            </Row>
            }
        </Container>
       
    )
}
export default TabMyInfo;