import { Modal, Button } from "react-bootstrap";
import Spining from "../spinning/spinning.component";
const ModalLockClassroom = ({show, handleClose, currentClassroom, onClick, spinning})=>{
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                Xác nhận {!currentClassroom.active ? "mở" : "khóa"} lớp học
                
            </Modal.Title>
            {spinning?
                        <Spining isFull={false} className="mx-2" />
                    :
                        null
                }
            </Modal.Header>
            <Modal.Body>Bạn có chắc {!currentClassroom.active ? "mở" : "khóa"} lớp học {currentClassroom.name}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Đóng
            </Button>
            <Button variant="primary" onClick={()=>{onClick(currentClassroom.id, !currentClassroom.active)}}>
                Đồng ý
            </Button>
            </Modal.Footer>
        </Modal>
    );
        
}
export default ModalLockClassroom;