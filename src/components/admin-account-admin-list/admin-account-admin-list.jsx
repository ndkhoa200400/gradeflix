/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { getApiMethod } from "../../api/api-handler";
import * as AuthService from "../../services/auth.service";
import AccountQuickView from "../admin-account-list/account-quick-view";
const AdminAccountAdmins = ({
	recently,
	keyword,
	currentPage,
	pageSize,
	onLoading,
	adminAccounts,
	setAdminAccounts,
}) => {
	const myaccount = AuthService.getUserInfo();

	const columns = [
		{
			dataField: "email",
			text: "Email",
			editable: false,
		},
		{
			dataField: "fullname",
			text: "Họ và tên",
			editable: false,
		},
		{
			dataField: "createdAt",
			text: "Ngày mở",
			editable: false,
		},
		{
			dataField: "status",
			text: "Trạng thái",
			editable: false,
		},
		{
			dataField: "action",
			text: "Thao tác",
			editable: false,
		},
	];

	// eslint-disable-next-line no-unused-vars
	const [show, setShow] = useState(false);

	const openModal = (user) => {
		setShow(true);
		setCurrentUser(user);
	};
	const [modalShow, setModalShow] = useState(false);
	const onViewClick = (user) => {
		setModalShow(true);
		setCurrentUser(user);
	};
	const [currentUser, setCurrentUser] = useState({});

	const getAllUser = async () => {
		try {
			//Params: có sẵn ở đầu hàm rồi, tạo filter thôi
			//	recently: true/false, sort theo ngày tháng
			//	keyword: string, từ khóa tìm kiếm, tìm theo email + tên
			//	currentPage: number, page cần tìm
			// 	pageSize: số items/ page

			const filter = {
				order: [`createdAt ${recently ? "DESC" : "ASC"}`],
				where: {
					role: "ADMIN",
				},
			};
			if (keyword) {
				filter.where = {
					...filter.where,
					or: [{ fullname: { ilike: `%${keyword}%` } }, { email: { ilike: `%${keyword}%` } }],
				};
			}
			const params = {
				pageSize: pageSize,
				pageIndex: currentPage,
				filter,
			};
			const res = await getApiMethod("admin/accounts", params);
			const arr = [];
			for (var i = 0; i < res.items.length; i++) {
				const user = res.items[i];
				if (user.id === myaccount.id) {
					user.fullname += " (tôi)";
				}
				arr.push(user);
			}

			setAdminAccounts(arr);
			const totalPages = res.totalPages;
			console.log(
				`Get admin list: recently ${recently}, keyword: ${keyword}, currentPage: ${currentPage}, pageSize: ${pageSize}, totalPages: ${totalPages}`
			);
			onLoading(totalPages);
		} catch (e) {
			console.log(e);
		}
	};
	const formatDate = (date) => {
		return dayjs(date ?? new Date()).format("DD/MM/YYYY");
	};
	const accountData = [];
	for (var i = 0; i < adminAccounts.length; i++) {
		const user = adminAccounts[i];
		accountData.push({
			...user,
			createdAt: formatDate(user.createdAt),
			status: Status({ isLocked: !user.active }),
			active: user.active,
			action: Lock({
				user,
				isLocked: !user.active,
				openModal,
				onViewClick,
			}),
		});
	}
	useEffect(() => {
		getAllUser();
	}, [currentPage, recently, keyword]);

	//Mark to customize later!!
	const rowStyle = (row, rowIndex) => {
		const style = {};

		if (adminAccounts[rowIndex].active === false) {
			style.color = "red";
		}

		return style;
	};
	const defaultSorted = [
		{
			dataField: "name",
			order: "desc",
		},
	];

	return (
		<div style={{ position: "relative" }}>
			<ToolkitProvider
				defaultSorted={defaultSorted}
				bootstrap5
				keyField="email"
				data={accountData}
				columns={columns}
				search
			>
				{(props) => (
					<div>
						<Card className="text-center d-grid grap-2 div-horizontal">
							<BootstrapTable
								bootstrap4
								hover
								noDataIndication="Không có tài khoản nào"
								rowStyle={rowStyle}
								wrapperClasses="table-responsive"
								// rowEvents={ rowEvents }
								{...props.baseProps}
								cellEdit={cellEditFactory({
									mode: "click",
									blurToSave: true,
								})}
							/>
						</Card>
					</div>
				)}
			</ToolkitProvider>
			<AccountQuickView
				show={modalShow}
				handleClose={() => setModalShow(false)}
				openModal={openModal}
				user={currentUser}
			/>
		</div>
	);
};
const Status = ({ isLocked }) => {
	return (
		<div style={{ color: isLocked ? "red" : "green", fontWeight: "bold" }}>{isLocked ? "Bị khóa" : "Hoạt động"}</div>
	);
};
const Lock = ({ isLocked, openModal, user, onViewClick }) => {
	return (
		<>
			<Button variant="outline-primary" style={{ width: "50px", marginRight: 10 }} onClick={() => onViewClick(user)}>
				<>
					<i className="fas fa-eye"></i>
				</>
			</Button>
		</>
	);
};

export default AdminAccountAdmins;
