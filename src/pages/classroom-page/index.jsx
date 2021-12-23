import Banner from "../../components/banner/banner.component";
import Tab from "../../components/tab/tab.component";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spining from "../../components/spinning/spinning.component";
import TabDetail from "./tab-detail";
import TabPeople from "./tab-people";
import TabMyInfo from "./tab-my-info";
import TabGradeCompositions from "./tab-grade-composition";

import TopNavigation from "../../components/top-nav/top-nav.component";
import ClassroomNotFound from "./classroom-not-found";
const getContentTab = (tab, idClass, classroom, studentList, onEditedClassRoom, onEditStudentId, onGradeEdit) => {
	if (tab === "tab-my-info") {
		if (classroom && classroom.user.userRole === "STUDENT")
			return <TabMyInfo classroom={classroom} onEditStudentId={onEditStudentId} studentList={studentList} />;
		const redirectLink = `/classrooms/${idClass}/tab-detail`;
		return <Navigate to={redirectLink} />;
	} else if (tab === "tab-people") return <TabPeople classroom={classroom} />;
	else if (tab === "tab-grade")
		return <TabGradeCompositions classroom={classroom} onGradeEdit={onGradeEdit} />;
	return <TabDetail classroom={classroom} onEditedClassRoom={onEditedClassRoom} />;
};

const ClassroomPage = ({ isFull = true, ...props }) => {
	const params = useParams();
	const [classroom, setClassroom] = useState();
	const [error, setError] = useState(null);
	const [studentList, setStudentList] = useState();
	//console.log(params);

	const onEditedClassRoom = (newClassroom) => {
		newClassroom.user = classroom.user;
		setClassroom(newClassroom);
	};

	const onEditStudentId = (studentId) => {
		classroom.user.studentId = studentId;
		setClassroom(classroom);
		// console.log(classroom);
		return getGrades();
	};
	const onGradeEdit = (gradeStructure) => {
		classroom.gradeStructure = gradeStructure;
		setClassroom(classroom);
	};
	useEffect(() => {
		const getClassroom = async () => {
			try {
				const data = await getApiMethod("classrooms/" + params.id.toString());

				setClassroom(data);
			} catch (error) {
				console.log("error", error);
				setError(error);
			}
		};

		return getClassroom();
	}, [params]);

	const getGrades = async () => {
		if (classroom?.user?.studentId) {
			try {
				const result = await getApiMethod(`/classrooms/${classroom.id}/students/${classroom.user.studentId}/grades`);
				setStudentList(result);
			} catch (e) {
				setStudentList(null);
			}
		}
	};

	useEffect(() => {
		try {
			return getGrades();
		} catch (err) {
			console.log(err);
			setError(err);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom]);
	return classroom ? (
		<div>
			<TopNavigation title="Gradeflix" titleLink="/" />
			<div className="container classroom">
				<div className="banner mt-3">
					<Banner classroom={classroom}></Banner>
				</div>

				<Tab id={params.id} classroom={classroom} className="tab"></Tab>
				{getContentTab(params.tab, params.id, classroom, studentList, onEditedClassRoom, onEditStudentId, onGradeEdit)}
			</div>
		</div>
	) : error ? (
		<ClassroomNotFound errorMessage={error.message} />
	) : (
		<Spining />
	);
};

export default ClassroomPage;
