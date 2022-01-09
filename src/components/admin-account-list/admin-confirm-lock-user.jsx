import { Modal, Button } from "react-bootstrap";
import Spinning from "../spinning/spinning.component";
const ModalLockUser = ({ show, handleClose, currentUser, onClick, spinning }) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Xác nhận {!currentUser.active ? "mở" : "khóa"} tài khoản</Modal.Title>
				{spinning ? <Spinning isFull={false} className="mx-2" /> : null}
			</Modal.Header>
			<Modal.Body>
				Bạn có chắc {!currentUser.active ? "mở" : "khóa"} tài khoản {currentUser.email}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Đóng
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						onClick(currentUser.id, !currentUser.active);
					}}
				>
					Đồng ý
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default ModalLockUser;
