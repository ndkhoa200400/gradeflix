import "../../pages/admin-page/style.css"
import { ListGroup ,Dropdown, Button,  } from "react-bootstrap";
import {useState, useEffect} from 'react'
import ClassQuickView from "./class-quick-view";
import { getApiMethod } from "../../api/api-handler";
const AdminClasses = () =>{
    const [modalShow, setModalShow] = useState(false);
    const onViewClick = (classroom)=>{
        setModalShow(true)
    }
    const [classrooms, setClassrooms] = useState([])
    const getAllClasses = async ()=>{
        try{
            const res = await getApiMethod('admin/classrooms');
            console.log(res)
            const newClassrooms = []
            // for(var i = 0; i < res.items.length; i++){
            //     const classroom = res.items[i];
            //     if(user.role !== "ADMIN"){
            //         newClassrooms.push({
            //             ...classroom, 
            //             //active: Status({isLocked: !user.active}), 
            //             //action:Lock({id: user.id, isLocked: !user.active})
            //         })
            //     }
                
                
            // }
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
    return (
        <>
            <hr />
            <ListGroup as="ol" numbered>
                {
                    classrooms.map((classroom) => (
                        <Item key={classroom.id} isLocked = {true} onViewClick = {()=> onViewClick(classroom)}/>
                      ))
                }
            </ListGroup>
            <ClassQuickView
                show={modalShow}
                handleClose={() => setModalShow(false)}
            />
        </>
        
    )
}
const style = {
    color: 'red',
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 9,
    fontSize: "100px"
}
const Item = ({isLocked, onViewClick}) =>{
    return (
        
            <ListGroup.Item
            className="d-flex justify-content-between align-items-start btn btn-primary" 
            style={{margin: "5px", position: 'relative', alignItems:'start'}}
            
        >
            {isLocked?<i className = 'fas fa-lock' style = {style} ></i>:null}
     
            <div className="ms-2 me-auto "  onClick = {onViewClick} style = {{width: "100%", textAlign: 'start'}}>
                <div className="fw-bold" >Ten lop</div>
                Người tạo: Thầy A <br/>
                Thành viên: 5 Giáo viên, 5 Học viên<br/>
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
                                            onClick={() => {}}
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