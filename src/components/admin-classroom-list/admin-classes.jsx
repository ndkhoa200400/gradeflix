import "../../pages/admin-page/style.css"
import { ListGroup , Button  } from "react-bootstrap";
import {useState, useEffect} from 'react'
import ClassQuickView from "./class-quick-view";
import { getApiMethod, postApiMethod } from "../../api/api-handler";
import ModalLockClassroom from "./admin-confirm-lock-classroom";
const AdminClasses = ( {recently, keyword, currentPage, pageSize, onLoading}) =>{ 
    const [modalShow, setModalShow] = useState(false);
    const onViewClick = (classroom)=>{
        setModalShow(true)
        setCurrentClassroom(classroom)
    }
    const [classrooms, setClassrooms] = useState([])
    const getAllClasses = async ()=>{
        try{
            //Params: có sẵn ở đầu hàm rồi, tạo filter thôi
			//	recently: true/false, sort theo ngày tháng
			//	keyword: string, từ khóa tìm kiếm, tìm theo email + tên
			//	currentPage: number, page cần tìm
			// 	pageSize: số items/ page
              const res = await getApiMethod('admin/classrooms');
           
            setClassrooms(res.items)
            const totalPages = 20;
            console.log(`Get classroom list: recently ${recently}, keyword: ${keyword}, currentPage: ${currentPage}, pageSize: ${pageSize}, totalPages: ${totalPages}`)
			onLoading(totalPages);
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
		getAllClasses();
        
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, recently, keyword]);
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
    const formatDate = (date)=>{
		const dateObj = new Date(date);
		const month = dateObj.getMonth()+1;
		const day = String(dateObj.getDate()).padStart(2, '0');
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`
	}
    return (
        
            <ListGroup.Item
            className="d-flex justify-content-between align-items-start btn btn-primary" 
            style={{margin: "5px", position: 'relative', alignItems:'start'}}
            
        >
           
     
            <div className="ms-2 me-auto "  onClick = {onViewClick} style = {{width: "100%", textAlign: 'start'}}>
                <div className="fw-bold" style = {{color:isLocked?'red':'black'}}>{classroom.name}</div>
                Người tạo: {host?host.fullname:""} <br/>
                Thành viên: {numTeacher} Giáo viên, {numStudent} Học viên<br/>
                Ngày mở: {formatDate(classroom.createdAt)}<br/>
                Trạng thái: <span style = {{fontWeight:'bold',color:isLocked?'red':'green'}}>{isLocked?"Bị khóa":"Đang hoạt động"}</span>
            </div>
       
            <Button variant="outline-primary" style = {{width: '50px', marginRight: 10}} onClick = {()=>onViewClick(classroom)} >
				<>
					<i className = "fas fa-eye"></i>
				</>
			</Button>

			<Button variant={isLocked?"success":"danger"} style = {{width: '50px'}} onClick = {()=>openModal(classroom)} >
				{isLocked?
					<>
						<i className = "fas fa-unlock"></i> 
					</>
					
				: 
					<>
						<i className = "fas fa-lock"></i> 
					</>
					
				}
			</Button>
           
               
              
        </ListGroup.Item>
       
        
        
    )
}
export default AdminClasses;