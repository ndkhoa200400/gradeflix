import ClassroomList from "../../components/classroom-list/classroom-list.component";
import TopNavigationHome from "../../components/top-nav/top-nav-home.component";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";

import Spinning from "../../components/spinning/spinning.component";
const HomePage = () => {
	const [classrooms, setClassrooms] = useState();

	const getClassrooms = async () => {
		// const params = `filter={"include":["host"]}`;
		const params = {
			filter: {
				include: ["host"],
				where: {
					active: true,
				},
			},
		};
		const data = await getApiMethod("classrooms", params);
		setClassrooms(data);
	};
	const handleOnClassCreate = (newClass) => {
		setClassrooms([...classrooms, newClass]);
	};

	const handleOnClassJoin = (newClass) => {
		setClassrooms([...classrooms, newClass]);
	};
	useEffect(() => getClassrooms(), []);
	return (
		<div>
			<TopNavigationHome onClassCreated={handleOnClassCreate} onClassJoined={handleOnClassJoin} />
			{classrooms ? (
				<div className="container-fluid h-full">
					<ClassroomList classrooms={classrooms} />
				</div>
			) : (
				<Spinning />
			)}
		</div>
	);
};
export default HomePage;
