import { Button,Alert, Card, Col, Row } from "react-bootstrap";
import GradeForm from "../../components/grade-form/grade-form";
import { useState } from "react";
import GradeBoard from "../../components/grade-board/grade-board";
const TabParem = ({ classroom, onGradeEdit }) => {
    const [showForm, setShowForm] = useState(false);
    const handleClose = ()=>{
      setShowForm(false);
    }
    const openForm = ()=>{
      setShowForm(true);
    }
    const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
	  const parems = classroom.gradeStructure ? classroom.gradeStructure.parems : [];
    return (
      <Row className="py-3"
      >
        <Col sm={3}>
          {classroom && classroom.user.userRole !== "STUDENT" ? (
            <div>
                <Card  style={{ marginBottom: "10px"}}>
                  <Card.Header>
                    <Card.Title>Thang điểm</Card.Title>
                  </Card.Header>
                  <Card.Body className="text-center d-grid grap-2">
                  {classroom.gradeStructure 
                  ? (<div><h5>Tổng điểm lớp: {total}</h5>
                    {parems.map((item, idx) => (
                      <Card.Text
                        key={idx}
                        style={{
                          display: "flex",
                          lexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{item.name}</div>
                        <div>{item.percent}</div>
                      </Card.Text>
                    ))} </div>)
                  :<Alert className="my-5" variant={"info"}>
                    <Alert.Heading>Chưa có thang điểm!</Alert.Heading>
                    <p>Hãy thêm thang điểm</p>
                  </Alert>
                  }
                  
                    <Button variant="outline-primary" className="mb-3" onClick = {openForm}>
                      Chỉnh sửa thang điểm
                    </Button>
                  </Card.Body>
                </Card>
                <Card >
                <Card.Header>
                  <Card.Title>Cấu hình</Card.Title>
                </Card.Header>
                <Card.Body className="text-center d-grid grap-2">
               
                  <Button variant="outline-primary" className="mb-3" >
                    Xuất mẫu điền thông tin sinh viên
                  </Button>
                  <Button variant="outline-primary" className="mb-3">Xuất mẫu chấm điểm </Button>
                  <Button variant="outline-primary"className="mb-3" >Nhập danh sách sinh viên từ xlsx</Button>
                  <Button variant="outline-primary" className="mb-3">Nhập điểm từ xlsx </Button>
                </Card.Body>
              </Card>
            </div>
            
            
          ) : null}
        </Col>
        <Col className="parem-list-tab" sm={9} >
          <Card>
              <Card.Header>
                <Card.Title>Bảng điểm</Card.Title>
              </Card.Header>
                <Card.Body className="text-center d-grid grap-2 " style = {{position:'relative',}}>
                    <GradeBoard></GradeBoard>
                </Card.Body>
          </Card>
        </Col>
        <GradeForm
          show={showForm}
          handleClose={handleClose}
          onGradeEdit={onGradeEdit}
          classroom={classroom}
        />
      </Row>
    );
};
export default TabParem;
