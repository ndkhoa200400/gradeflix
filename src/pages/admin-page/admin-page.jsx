import { NavLink, useParams } from "react-router-dom";
import { Button, Row, Form, DropdownButton, Dropdown, InputGroup, FormControl } from "react-bootstrap";
import "./style.css";
import { useState, useEffect } from "react";
import AdminAccounts from "../../components/admin-account-list/admin-accounts";
import AdminClasses from "../../components/admin-classroom-list/admin-classes";
import AdminAvatar from "../../components/admin-account-list/admin-avatar";
import AdminAccountAdmins from "../../components/admin-account-admin-list/admin-account-admin-list";
import CustomPagination from "../../components/pagination/custom-pagination";
import CreateAdminForm from "./create-admin-form";
const AdminPage = () => {
	const params = useParams();
	const [active, setActive] = useState(false);

	var title = "Title";
	if (params.tab === "accounts") title = "Quản lý tài khoản";
	if (params.tab === "classes") title = "Quản lý lớp học";
	if (params.tab === "admins") title = "Quản lý Admin";
	const pageSize = 10;
	const [keyword, setKeyword] = useState("");
	const [text, setText] = useState("");
	const [recently, setRecently] = useState(true);
	const recentlyText = "Gần nhất";
	const unRecentlyText = "Lâu nhất";
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [showCreateAdminForm, setShowCreateAdminForm] = useState(false);
	const [adminAccounts, setAdminAccounts] = useState([]);

	const toggle = () => {
		setActive(!active);
	};

	const contentArea = () => {
		if (params.tab === "accounts")
			return (
				<AdminAccounts
					recently={recently}
					keyword={keyword}
					currentPage={currentPage}
					pageSize={pageSize}
					onLoading={onLoading}
				/>
			);
		if (params.tab === "classes")
			return (
				<AdminClasses
					recently={recently}
					keyword={keyword}
					currentPage={currentPage}
					pageSize={pageSize}
					onLoading={onLoading}
				/>
			);
		if (params.tab === "admins")
			return (
				<AdminAccountAdmins
					recently={recently}
					keyword={keyword}
					currentPage={currentPage}
					pageSize={pageSize}
					onLoading={onLoading}
					adminAccounts={adminAccounts}
					setAdminAccounts={setAdminAccounts}
				/>
			);
		return null;
	};

	useEffect(() => {
		resetAllParams();
	}, [params]);

	const resetAllParams = () => {
		setTotalPages(0);
		setRecently(true);
		setKeyword("");
		setCurrentPage(1);
	};

	const pageClicked = (page) => {
		setCurrentPage(page);
	};

	const onLoading = (newTotalPages) => {
		setTotalPages(newTotalPages);
	};

	const onSortChange = (newRecently) => {
		setRecently(newRecently);
	};

	const onSubmitSearch = (e) => {
		e.preventDefault();
		setKeyword(text);
	};

	return (
		<div className="admin-page wrapper" style={{ position: "relative" }}>
			<nav id="sidebar" className={active ? "active" : ""}>
				<div className="sidebar-header">
					<div className="d-flex align-items-center">
						<img src="/logo.png" alt="" width={40} height={40} />
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h4 style={{ justifySelf: "center" }}>Gradeflix</h4>
						</div>
					</div>
				</div>

				<ul className="list-unstyled components">
					<li>
						<NavLink to="/admin/accounts" className={({ isActive }) => (isActive ? "nav-item-active" : "")}>
							<i class="fas fa-bars"></i>
							<span style={{ marginLeft: "15px" }}>Quản lý tài khoản</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/admins" className={({ isActive }) => (isActive ? "nav-item-active" : "")}>
							<i class="fas fa-bars"></i>
							<span style={{ marginLeft: "15px" }}>Quản lý Admin</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/classes" className={({ isActive }) => (isActive ? "nav-item-active" : "")}>
							<i class="fas fa-bars"></i>
							<span style={{ marginLeft: "15px" }}>Quản lý lớp học</span>
						</NavLink>
					</li>
				</ul>
			</nav>
			<div
				id="content"
				className={`"content-nav" ${active ? "active" : ""}`}
				style={{ zIndex: 10, position: "fixed", top: 0, padding: 0, marginBottom: 0 }}
			>
				<nav className="navbar navbar-default" style={{ marginBottom: 30, width: "100%" }}>
					<div className="container-fluid">
						<div className="navbar-header">
							<Button variant="outline-primary" onClick={toggle}>
								<i className="fas fa-bars"></i>
							</Button>
						</div>
						<h2>{title}</h2>
						<AdminAvatar />
					</div>
				</nav>
				<Form onSubmit={onSubmitSearch}>
					<Row style={{ justifyContent: "center" }}>
						<InputGroup className="mb-3" style={{ width: "40%" }}>
							<FormControl
								type="text"
								placeholder="Tìm kiếm"
								value={text}
								onChange={(event) => setText(event.target.value)}
							/>

							<Button variant="outline-primary" type="submit">
								<i className="fas fa-search" />
							</Button>
						</InputGroup>
					</Row>
				</Form>
			</div>

			<div id="content" className={`content-nav ${active ? "active" : ""}`} style={{ top: "150px" }}>
				<div style={{ marginBottom: "20px", justifyContent: "space-between", display: "flex" }}>
					<DropdownButton
						id="dropdown-item-button"
						title={recently ? recentlyText : unRecentlyText}
						variant="outline-primary"
					>
						<Dropdown.Item
							as="button"
							active={recently}
							onClick={() => {
								onSortChange(true);
							}}
						>
							{recentlyText}
						</Dropdown.Item>
						<Dropdown.Item
							as="button"
							active={!recently}
							onClick={() => {
								onSortChange(false);
							}}
						>
							{unRecentlyText}
						</Dropdown.Item>
					</DropdownButton>
					{params.tab === "admins" ? (
						<Button
							variant="outline-success"
							style={{ fontWeight: "bold" }}
							onClick={() => setShowCreateAdminForm(true)}
						>
							<i className="fas fa-plus" /> Tạo Admin
						</Button>
					) : null}
				</div>
				<hr />
				{contentArea()}
				<CustomPagination
					pageClicked={pageClicked}
					totPages={totalPages}
					currentPage={currentPage}
					style={{ position: "fixed", top: 20, zIndex: 100, left: "50%" }}
				/>
			</div>
			<CreateAdminForm
				show={showCreateAdminForm}
				handleClose={() => setShowCreateAdminForm(false)}
				adminAccounts={adminAccounts}
				setAdminAccounts={setAdminAccounts}
			/>
		</div>
	);
};
export default AdminPage;
