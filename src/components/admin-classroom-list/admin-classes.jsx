import "../../pages/admin-page/style.css"
import { ListGroup ,Dropdown, Button,  } from "react-bootstrap";
import {useState, useEffect} from 'react'
import ClassQuickView from "./class-quick-view";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import ModalLockClassroom from "./admin-confirm-lock-classroom";
import { set } from "react-hook-form";
const AdminClasses = () =>{
    const [modalShow, setModalShow] = useState(false);
    const onViewClick = (classroom)=>{
        setModalShow(true)
        setCurrentClassroom(classroom)
    }
    const [classrooms, setClassrooms] = useState([])
    const getAllClasses = async ()=>{
        try{
            const res = await getApiMethod('admin/classrooms');
            console.log(res)
            setClassrooms(res.items)
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
		getAllClasses();
        
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    const [show, setShow] = useState(false);
    const [currentClassroom, setCurrentClassroom] = useState({});
    const openModal = (classroom)=>{
        setShow(true);
        setCurrentClassroom(classroom)
    }
    const handleClose = ()=>{
        setShow(false);
    }
    const [spinning, setSpinning] = useState(false)
    const onClick = async (id, isLocked)=>{
        console.log(isLocked);
		setSpinning(true);
		try{
			const res = await postApiMethod(`admin/classrooms/`+id, {active: isLocked});	
			console.log(res);
			const newClassrooms = [...classrooms]
            for(var i = 0; i < newClassrooms.length; i++){
                if(newClassrooms[i].id === id){
                    newClassrooms[i].active = !newClassrooms[i].active;
                }
            }
            setClassrooms(newClassrooms);
			handleClose();
		}
		catch(e){
			console.log(e);
		}
		
		setSpinning(false);
    }
    return (
        <>
            <hr />
            <ListGroup as="ol" numbered>
                {
                    classrooms.map((classroom) => (
                        <Item 
                            key={classroom.id} 
                            classroom = {classroom} 
                            onViewClick = {()=> onViewClick(classroom)}
                            openModal = {openModal}/>
                      ))
                }
            </ListGroup>
            <ClassQuickView
                show={modalShow}
                handleClose={() => setModalShow(false)}
                openModal = {openModal}
                classroom = {currentClassroom}
            />
            <ModalLockClassroom
                show = {show}
                handleClose = {handleClose}
               currentClassroom = {currentClassroom}
               onClick = {onClick}
               spinning = {spinning}
                />
        </>
        
    )
}
const style = {
    color: 'red',
    position: 'absolute',
    top: -20,
    left: -20,
    zIndex: 9,
    fontSize: "50px"
}
const Item = ({onViewClick, classroom, openModal}) =>{
    var host = null
    var numTeacher = 0;
    var numStudent = 0;
    var isLocked = !classroom.active;
    var hostId = classroom.hostId;
    const users = classroom.users
    for(var i = 0; i < users.length; i++){
        if (users[i].userRole === "TEACHER"){
            numTeacher++;
            
        }
        else if (users[i].userRole === "HOST"){
            numTeacher++;
            host = users[i];
        }
            
        else   
            numStudent++;
    }
    return (
        
            <ListGroup.Item
            className="d-flex justify-content-between align-items-start btn btn-primary" 
            style={{margin: "5px", position: 'relative', alignItems:'start'}}
            
        >
            {isLocked?<i className = 'fas fa-lock' style = {style} ></i>:null}
     
            <div className="ms-2 me-auto "  onClick = {onViewClick} style = {{width: "100%", textAlign: 'start'}}>
                <div className="fw-bold" >{classroom.name}</div>
                Người tạo: {host?host.name:""} <br/>
                Thành viên: {numTeacher} Giáo viên, {numStudent} Học viên<br/>
                Trạng thái: {isLocked?"Bị khóa":"Hoạt động"}
            </div>
            <div>

            <Dropdown className="" style = {{zIndex: 20}}>
                                    <Dropdown.Toggle
                                        variant="light"
                                        className="btn btn-light btn-add-classroom"
                                        data-bs-toggle="dropdown"
                                        id="addClassroomBtn"
                                    ></Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            type="button"
                                            onClick={onViewClick}
                                        >
                                            Xem
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            type="button"
                                            onClick={() => {
                                                openModal(classroom);
                                            }}
                                        >
                                            {isLocked?"Mở khóa": "Khóa"}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
               
            </div>
              
        </ListGroup.Item>
       
        
        
    )
}
export default AdminClasses;