import { NavLink } from "react-router-dom";
import { Row, Container, Nav, Col ,Navbar} from "react-bootstrap";
import "./tab.css"
const trangchutt = [{ title: 'Hoc 25/5', info: 'lam bai ' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }, { title: 'Hoc 30/4', info: 'Bai ve rea' }];

const Tab = ({ id }) => {
    const urlTab1 = "/classrooms/"+ id + "/tab-detail";
    const urlTab2 = "/classrooms/"+ id + "/tab-people";
    const urlTab3 = "/classrooms/"+ id + "/tab-my-info";
    return (
        <Container>
            <Row style = {{padding: "10px"}}>
                <Col md={{ span: 6, offset: 3 }}>
                    <Nav justify  variant="pills" defaultActiveKey={urlTab1} >
                            <Nav.Item>
                                    <NavLink
                                            to= {urlTab1}
                                            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                        >Trang chủ</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink 
                                        to={urlTab2}
                                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                    >
                                        Danh sách
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink
                                        to={urlTab3}
                                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                    >
                                        Thông tin của tôi
                                </NavLink >
                            </Nav.Item>
                        </Nav>
                </Col>
                
               
            </Row>
        </Container>
        
    )
};

export default Tab;