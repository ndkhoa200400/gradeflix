
import { NavLink, Link } from 'react-router-dom';
import { Button, } from 'react-bootstrap';
import "./style.css"
import $ from 'jquery';
import { useState } from 'react';
const AdminPage = () =>{
    const [active, setActive] = useState(false);
    const toggle = () =>{
        setActive(!active);
    }
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
                            <span style={{marginLeft: "20px"}}>
                                Account
                            </span>
                            
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/classes" 
                            className={({ isActive }) =>(isActive ? "nav-item-active" : "")}
                        >          
                            <i class="fas fa-bars"></i> 
                            <span style={{marginLeft: "20px"}}>
                                Class
                            </span>
                        </NavLink>
                    </li>
                </ul>

            </nav>
            <div id="content" class ={active?"active":""} style={{zIndex: 10, position:'fixed', top: 0, padding: 0}} >
                <nav class="navbar navbar-default" >
                    <div class="container-fluid">

                        <div class="navbar-header">
                            <Button variant="outline-primary" onClick = {toggle}>
                                <i class="fas fa-bars"></i>
                            </Button>
                        </div>

                        
                    </div>
                </nav>
            </div>
            
            <div id="content" class ={active?"active":""} >
            
                <div>
                    <h2>Collapsible Sidebar Using Bootstrap 3</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div class="line"></div>

                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div class="line"></div>

                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div class="line"></div>

                    <h3>Lorem Ipsum Dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
                </div>
            </div>
       
       
    </div>





    )
}
export default AdminPage;