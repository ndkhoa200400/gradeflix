import "./App.css";
import ClassroomList from "./components/classroom-list/classroom-list.component";
import TopNavigationHome from "./components/top-nav/top-nav-home.component";
import { useEffect, useState } from "react";
import { getApiMethod } from "./api/api-handler";

import Spining from "./components/spinning/spinning.component";
function App() {
  const [classrooms, setClassrooms] = useState();

  useEffect(() => getClassrooms(), []);
  const getClassrooms = async () => {
    const data = await getApiMethod("classrooms");
    setClassrooms(data);
  };
  

  const handleOnClassCreate = (newClass) =>{
    setClassrooms([...classrooms, newClass])
  }
  return (
    <div className="App">
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
}

export default App;
