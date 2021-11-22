import { Button, Card, Col, Row } from "react-bootstrap";
import ListParem from "../../components/list-parem/list-parem.component";
import GradeForm from '../../components/grade-form/grade-form'
import {useState} from 'react'
const TabParem = ({ classroom, onGradeEdit }) => {
    const [showForm, setShowForm] = useState(false);
    const handleClose = ()=>{
      setShowForm(false);
    }
    const openForm = ()=>{
      setShowForm(true);
    }
    return (
      <Row className="py-3"
      >
        <Col sm={3}>
          {classroom && classroom.user.userRole !== "STUDENT" ? (
            <Card bg="light">
              <Card.Header>
                <Card.Title>Cấu hình</Card.Title>
              </Card.Header>
              <Card.Body className="text-center d-grid grap-2">
                <Button variant="outline-success" className="mb-3" block onClick = {openForm}>
                  Chỉnh sửa thang điểm
                </Button>

                <Button variant="outline-success" disabled>Xuất bảng điểm</Button>
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
      </Row>
    );
};
export default TabParem;
