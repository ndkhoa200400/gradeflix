import { Button, Card, Col, Row } from "react-bootstrap";
import ListParem from "../../components/list-parem/list-parem.component";
import GradeForm from "../../components/grade-form/grade-form";
import UploadFileForm from "../../components/upload-file-form/upload-file-form";
import { useState } from "react";
const TabParem = ({ classroom, onGradeEdit }) => {
  const [showForm, setShowForm] = useState(false);
  const [showUploadFileForm, setShowUploadFileForm] = useState(false);
  const handleClose = () => {
    setShowForm(false);
    setShowUploadFileForm(false);
  }
  const openForm = () => {
    setShowForm(true);
  }
  const openUploadFileForm = () => {
    setShowUploadFileForm(true);
  }


  const [endPoint, setEndPoint] = useState("");
  return (
    <Row className="py-3"
    >
      <Col sm={3}>
        {classroom && classroom.user.userRole !== "STUDENT" ? (
          <Card >
            <Card.Header>
              <Card.Title>Cấu hình</Card.Title>
            </Card.Header>
            <Card.Body className="text-center d-grid grap-2">
              <Button variant="outline-primary" className="mb-3" onClick={openForm}>
                Chỉnh sửa thang điểm
              </Button>

              <Button variant="outline-primary" className="mb-3" disabled>Xuất bảng điểm</Button>

              <Button variant="outline-primary" className="mb-3" onClick={() => {
                setEndPoint("student-list");
                setShowUploadFileForm(true);
              }}>
                Tải danh sách sinh viên
              </Button>

              <Button variant="outline-primary" onClick={() => {
                setEndPoint("student-grades");
                setShowUploadFileForm(true);
              }}> 
              Tải Bảng Điểm
              </Button>
            </Card.Body>
          </Card>
        ) : null}
      </Col>
      <Col className="parem-list-tab">
        <ListParem classroom={classroom}></ListParem>
      </Col>
      <GradeForm
        show={showForm}
        handleClose={handleClose}
        onGradeEdit={onGradeEdit}
        classroom={classroom}
      />
      <UploadFileForm
        show={showUploadFileForm}
        handleClose={handleClose}
        endPoint={endPoint}
        classroom={classroom}
      />
    </Row>
  );
};
export default TabParem;
