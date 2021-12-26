import "../../pages/admin-page/style.css"
import { ListGroup ,Badge, Button, Row, Container} from "react-bootstrap";
const AdminClasses = () =>{
    return (
        <>
            <hr />
            <ListGroup as="ol" numbered>
                <Item />
                <Item/>
                <Item/>
            </ListGroup>
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
const Item = ({isLocked}) =>{
    return (
        <ListGroup.Item
            className="d-flex justify-content-between align-items-start" style={{margin: "5px", position: 'relative'}}
        >
            <i className = 'fas fa-lock' style = {style} ></i>
            <div className="ms-2 me-auto" >
                <div className="fw-bold">Subheading</div>
                Cras justo odio <br/>
                Cras justo odio<br/>
                Cras justo odio
            </div>
            <div>
                <Button variant="primary" style={{margin: "5px"}} >
                    14
                    </Button>
                    <Button variant="primary" style={{margin: "5px"}}>
                    14
                    </Button>
            </div>
                    
        </ListGroup.Item>
        
    )
}
export default AdminClasses;