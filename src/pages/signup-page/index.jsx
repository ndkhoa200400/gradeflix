import React, {useState} from "react";
import {Form, Button,Container, Row, Col} from "react-bootstrap";
import {useNavigate, Link} from 'react-router-dom';
//'/users/register
import { postApiMethod } from "../../api/api-handler";
import * as AuthenService from "../../services/auth.service"
const SignupPage = () =>{
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const name = event.target.elements.name.value;
      event.preventDefault();
      event.stopPropagation();
     
      if (form.checkValidity() === false) {
     
        return;
      }
      setValidated(true);
      try {
        const data = {fullname: name, email, password}
        // gửi cho api
        const res = await postApiMethod("users/register", data);
      
        console.log(res);
        AuthenService.saveToken(res.token);
        navigate('/', {replace: true});
      } catch (error) {
       
        console.log(error);
      
      }
      event.preventDefault();
      event.stopPropagation();
      
    };
    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="Login">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group as={Col} md="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" required name = "email" />
                                <Form.Control.Feedback type="invalid">
                                    Email không đúng định dạng
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="mb-3" controlId="name">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control type="text" placeholder="Họ và tên" required  name = "name"/>
                                <Form.Control.Feedback type="invalid">
                                    Không được bỏ trống
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control type="password" placeholder="Mật khẩu"  required name = "password"/>
                                <Form.Control.Feedback type="invalid">
                                    Không được bỏ trống
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign up
                                
                            </Button>
                            <Button variant="primary" type="button">
                                
                                <Link to="/login">Login</Link>
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default SignupPage;