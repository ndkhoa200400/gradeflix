import ClassroomList from "../../components/classroom-list/classroom-list.component";
import TopNavigationHome from "../../components/top-nav/top-nav-home.component";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";

import Spining from "../../components/spinning/spinning.component";
const HomePage = () => {
  const [classrooms, setClassrooms] = useState();

  const getClassrooms = async () => {
    const params = `filter={"include":["host"]}`;
    const data = await getApiMethod("classrooms", params);
    setClassrooms(data);
  };
  const handleOnClassCreate = (newClass) => {
    setClassrooms([...classrooms, newClass]);
  };
  useEffect(() => getClassrooms(), []);
  return (
    <div>
      <TopNavigationHome onClassCreated={handleOnClassCreate} />
      {classrooms ? (
        <div className="container-fluid h-full">
          <ClassroomList classrooms={classrooms} />
        </div>
      ) : (
        <Spining />
      )}
    </div>
  );
};
export default HomePage;
