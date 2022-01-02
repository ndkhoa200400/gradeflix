
import { NavLink,useParams } from 'react-router-dom';
import { Button, Row, Form } from 'react-bootstrap';
import "./style.css"
import { useState } from 'react';
import AdminAccounts from '../../components/admin-account-list/admin-accounts';
import AdminClasses from '../../components/admin-classroom-list/admin-classes';
import AdminAvatar from '../../components/admin-account-list/admin-avatar';
const AdminPage = () =>{
    const params = useParams();
    const [active, setActive] = useState(false);
    const toggle = () =>{
        setActive(!active);
    }
    const contentArea = () =>{
        if (params.tab === "accounts")
            return (
                <AdminAccounts/>
            )
        if (params.tab === "classes")
            return (
                <AdminClasses/>
            )
        return null;
    }
    var title = "Title";
    if (params.tab === "accounts")
        title = "Quản lý tài khoản"
    if (params.tab === "classes")
        title = "Quản lý lớp học"
    return (
        <div class="wrapper" style = {{position: 'relative'}}>
            
            <nav id="sidebar" class ={active?"active":""} >
                <div class="sidebar-header">
                    <div style = {{display: 'flex', flexDirection:'row'}}>
                        <img src="/logo.png" alt="" width={40} height={40} />
                        <div style = {{display: 'flex', flexDirection:'column'}}>
                            <h4 style = {{justifySelf:'center'}}>Gradeflix</h4>
                        </div>
                        
                    </div>
                </div>

                <ul class="list-unstyled components">
                    <li>
                        <NavLink to="/admin/accounts" 
                            className={({ isActive }) =>(isActive ? "nav-item-active" : "")}
                        >          
                            <i class="fas fa-bars"></i> 
                            <span style={{marginLeft: "15px"}}>
                                Quản lý tài khoản
                            </span>
                            
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/classes" 
                            className={({ isActive }) =>(isActive ? "nav-item-active" : "")}
                        >          
                            <i class="fas fa-bars"></i> 
                            <span style={{marginLeft: "15px"}}>
                                Quản lý lớp học
                            </span>
                        </NavLink>
                    </li>
                </ul>

            </nav>
            <div id = "content" class ={active?"active":"" + "content-nav"} style={{zIndex: 10, position:'fixed', top: 0, padding: 0, marginBottom: 0}} >
                <nav class="navbar navbar-default" style={{ marginBottom: 30, width:'100%'}}>
                    <div class="container-fluid">

                        <div class="navbar-header">
                            <Button variant="outline-primary" onClick = {toggle}>
                                <i class="fas fa-bars"></i>
                            </Button>
                        </div>
                        <h2>{title}</h2>
                        <AdminAvatar/>
                        
                    </div>
                </nav>
                <Form >
                    <Row  style = {{ justifyContent: 'center'}}>
                        <Form.Group className="mb-3" controlId="searchbar" style = {{width: "50%"}}>
                            <Form.Control type="text" placeholder="Tìm kiếm" />
                        </Form.Group>
                    </Row>
                </Form>
                
            </div>
           
            <div id = "content"  class ={active?"active":"" + "content-nav"} style = {{top: "100px",}}>
                {contentArea()}
                
            </div>
       
       
    </div>





    )
}
export default AdminPage;