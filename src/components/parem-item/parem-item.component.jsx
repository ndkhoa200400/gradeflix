import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const ParemItem = ({ parem }) => {
  return (
    <Card className="my-2 parem-item">
      <Card.Body>
        <Row className="align-items-center">
          <Col>{parem.name}</Col>
          <Col className="text-end">{parem.percent}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default ParemItem;
