import React from "react";

import { Alert, Card } from "react-bootstrap";
import ParemItem from "../parem-item/parem-item.component";

const ListParem = ({ classroom }) => {
  const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
  const parem = classroom.gradeStructure ? classroom.gradeStructure.parems : "";

  return classroom.gradeStructure ? (
    <Card className="list-parem parem-list ">
      <Card.Header>
        <h2>Thang điểm: {total}</h2>

      
      </Card.Header>

      <Card.Body>
        {parem.map((item, idx) => (
          <ParemItem parem={item} key={idx} />
        ))}
      </Card.Body>
    </Card>
  ) : (
    <Alert className="my-5" variant={"info"}>
      <Alert.Heading>Bạn chưa thêm thang điểm!</Alert.Heading>
      <p>Chọn nút edit để thêm</p>
    </Alert>
  );
};

export default ListParem;
