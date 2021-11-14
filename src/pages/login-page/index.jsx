import React, {useState} from "react";
import {Form, Button,Container, Row, Col} from "react-bootstrap";
import './Login.css';
import {useNavigate, Link} from 'react-router-dom';
import { postApiMethod } from "../../api/api-handler";
import FacebookLogin from 'react-facebook-login';
import * as AuthenService from "../../services/auth.service"
///users/login
const LoginPage = () =>{
    const responseFacebook = (response) => {
        console.log(response);
       // setData(response);
        //setPicture(response.picture.data.url);
        if (response.accessToken) {
        //  setLogin(true);
        } else {
        //  setLogin(false);
        }
      }
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        console.log(email +" "+ password);
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            
            return;
        }
        setValidated(true);
        try {
            // gửi cho api
            const data = {email, password}
            const res = await postApiMethod("users/login", data);
           
            console.log(res);
            AuthenService.saveToken(res.token);
            navigate('/', {replace: true});
        } catch (error) {
            console.log(error);
        }
        event.preventDefault();
      
    };
    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="Login">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group as={Col} md="mb-3" controlId="validationCustom05">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" required name = "email" />
                                <Form.Control.Feedback type="invalid">
                                    Email không đúng định dạng
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control type="password" placeholder="Mật khẩu"  required name = "password"/>
                                <Form.Control.Feedback type="invalid">
                                    Không được bỏ trống
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="button">
                                <Link to="/signup">Sign up</Link>
                                
                            </Button>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                    <FacebookLogin
                        appId="612167976904652"
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        icon="fa-facebook" />
                </Col>
                
            </Row>
        </Container>
       
    )
}
export default LoginPage;