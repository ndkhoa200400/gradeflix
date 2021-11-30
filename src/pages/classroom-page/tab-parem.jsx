import { Button,Alert, Card, Col, Row } from "react-bootstrap";
import GradeForm from "../../components/grade-form/grade-form";
import UploadFileForm from "../../components/upload-file-form/upload-file-form";
import { useState, useEffect } from "react";
import GradeBoard from "../../components/grade-board/grade-board";
import { getApiMethod } from "../../api/api-handler";
import { createTemplateUploadStudentList, createTemplateUploadGradeAssignment } from "../../services/xlsx.service";
const TabParem = ({ classroom, onGradeEdit }) => {
    const [showForm, setShowForm] = useState(false);
    const [showUploadFileForm, setShowUploadFileForm] = useState(false);
    const [students, setStudents] = useState([]);
    const handleClose = ()=>{
      setShowForm(false);
      setShowUploadFileForm(false);
    }
    const openForm = ()=>{
      setShowForm(true);
    }
    const [endPoint, setEndPoint] = useState("");
    const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
	  const parems = classroom.gradeStructure ? classroom.gradeStructure.parems : [];
    const midleOnGradeEdit = (gradeStructure) =>{
        onGradeEdit(gradeStructure);
        getGradeBoards();
    }
    const refeshGradeBoard = ()=>{
      getGradeBoards();
    }
    const getGradeBoards = async () => {
      try {
        const res = await getApiMethod("classrooms/" + classroom.id + "/student-list");
        console.log(res);
        setStudents(res)
      } catch (error) {
        console.log('error', error);
      }
    };
    useEffect(() => {
        return getGradeBoards();
        
    }, []);
    const onUpdateGrade = (studentId, field, newValue)=>{
      const newList = [...students];
        for(var i = 0; i < newList.length; i++){
            if (newList[i].studentId === studentId){
                if (newList[i].grades){
                  for(var j = 0; j < newList[i].grades.length; j++)
                    if(newList[i].grades[j].name === field){
                      newList[i].grades[j].grade = newValue;
                      break;
                    }
                      
                }
                else {
                  newList[i].grades = []
                  newList[i].grades.push({name: field, grade:newValue});
                }  
                break;
            } 
        };
        setStudents(newList);
    }
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
                  <Card.Body className="text-center d-grid grap-3">
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
                  
                      <Button variant="outline-primary" style = {{marginTop: '20px'}} onClick = {openForm}>
                        Chỉnh sửa thang điểm
                      </Button>
                  </Card.Body>
                  
                </Card>
                <Card >
                <Card.Header>
                  <Card.Title>Cấu hình</Card.Title>
                </Card.Header>
                <Card.Body className="text-center d-grid grap-2">
               
                  <Button variant="outline-primary" className="mb-3" onClick={()=>{
                    createTemplateUploadStudentList();
                  }}>
                    Xuất mẫu điền thông tin sinh viên
                  </Button>
                  <Button variant="outline-primary" className="mb-3"
                    onClick={()=>{
                      createTemplateUploadGradeAssignment(students);
                    }}>Xuất mẫu chấm điểm </Button>
                  <Button 
                      variant="outline-primary"className="mb-3"
                      onClick={() => {
                        setEndPoint("student-list");
                        setShowUploadFileForm(true);
                      }} >
                      Nhập danh sách sinh viên từ xlsx
                  </Button>
                  <Button 
                      variant="outline-primary" 
                      className="mb-3"
                      onClick={() => {
                        setEndPoint("student-grades");
                        setShowUploadFileForm(true);
                      }}>
                      Nhập điểm từ xlsx 
                  </Button>

            
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
                    <GradeBoard 
                        classroomId = {classroom.id}
                        gradeStructure = {classroom.gradeStructure} 
                        students = {students} 
                        onUpdateGrade = {onUpdateGrade}>
                       
                    </GradeBoard>
                </Card.Body>
          </Card>
        </Col>
        <GradeForm
          show={showForm}
          handleClose={handleClose}
          onGradeEdit={midleOnGradeEdit}
          classroom={classroom}
        />
        <UploadFileForm
          show={showUploadFileForm}
          handleClose={handleClose}
          endPoint={endPoint}
          classroom={classroom}
          refeshGradeBoard = {refeshGradeBoard}
        />
      </Row>
    );
};
export default TabParem;
