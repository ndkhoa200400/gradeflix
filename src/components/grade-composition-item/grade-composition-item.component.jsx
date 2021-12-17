import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const GradeCompositionsItem = ({ gradeCompositions }) => {
  return (
    <Card className="my-2 gradeCompositions-item">
      <Card.Body>
        <Row className="align-items-center">
          <Col>{gradeCompositions.name}</Col>
          <Col className="text-end">{gradeCompositions.percent}%</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default GradeCompositionsItem;
