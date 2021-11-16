import {Row, Container } from "react-bootstrap";
const Banner = ({ classroom }) => {
    return (
        <Container>
            <Row>
                
                <div >
                    <div className="card bg-dark text-white" style = {{position: "relative"}}>
                        <img 
                            className="card-img" 
                            src={classroom.banner} 
                            width="830" 
                            height="250" 
                            ></img>
                        <div style = {{position: "absolute", bottom: "20px", left: "20px"}}>
                            <h3 className="card-title" >{classroom.name}</h3>
                        </div>
                    </div>
                </div>
                
            </Row>
        </Container>
        
    )
};

export default Banner;
