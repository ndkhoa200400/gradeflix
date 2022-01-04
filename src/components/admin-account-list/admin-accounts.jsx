
import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Toast, DropdownButton , Dropdown } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { postApiMethod } from "../../api/api-handler";
import CustomPagination from "../pagination/custom-pagination";
import { getApiMethod } from "../../api/api-handler";
import ModalLockUser from "./admin-confirm-lock-user";
import AccountQuickView from "./account-quick-view";
const AdminAccounts = ({recently, keyword, currentPage, pageSize, onLoading}) =>{
	const studentIdValidator = (newValue, row, column) => {
		return { valid: true,  };
		
		
	};
	const headerFormatter = (column, colIndex, { sortElement, filterElement }) => {
		return (
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", cursor: "move" }}>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "move" }}>
						{filterElement}
						{column.text}
						{sortElement}
					</div>
				</div>
				&nbsp;
				<div
					variant="link"
					style={{ padding: "0px" }}
					
				>
					<i className="fa fa-edit" aria-hidden="true"></i>
				</div>
			</div>
		);
	};
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

            dataField: "studentId",
			text: "MSSV",
			editable: true,
            headerFormatter,
            validator: studentIdValidator,
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
	

	

	const beforeSaveCell =  async(oldValue, newValue, row, column, done) => {
		console.log(users);
		if (newValue === oldValue) return;
		const id = row.id;
		//call api
		try {
			const newUsers = [...users]
            for(var i = 0; i < newUsers.length; i++){
                if(newUsers[i].id === id){
					const user = newUsers[i];
					user.studentId = newValue;
					newUsers[i] = user;
					
                }
            }
            setUsers(newUsers);
			const res = await postApiMethod(`admin/users/`+id, {studentId: newValue});
			
		} catch (e) {
			console.log(e);
			setShowToast(true)
			const newUsers = [...users]
            for(var i = 0; i < newUsers.length; i++){
                if(newUsers[i].id === id){
					const user = newUsers[i];
					user.studentId = oldValue;
					newUsers[i] = user;
					
                }
            }
            setUsers(newUsers);
		}
		
	};
	const onStudentIdChange = (id, newStudentId) =>{
		const newUsers = [...users]
		for(var i = 0; i < newUsers.length; i++){
			if(newUsers[i].id === id){
				const user = newUsers[i];
				user.studentId = newStudentId;
				newUsers[i] = user;
				
			}
		}
		setUsers(newUsers);
	}
	const onClick = async(id, isLocked)=>{
		setSpinning(true);
		try{
			const res = await postApiMethod(`admin/users/`+id, {active: isLocked});	
			console.log(res);
			const newUsers = [...users]
            for(var i = 0; i < newUsers.length; i++){
                if(newUsers[i].id === id){
					const user = newUsers[i];
					user.active = !user.active;
					newUsers[i] = user;
					
                }
            }
            setUsers(newUsers);
			handleClose();
		}
		catch(e){
			console.log(e);
		}
		
		setSpinning(false);
	}
	const [show, setShow] = useState(false);
	const handleClose = () =>{
		setShow(false);
		console.log("close");
	}
	const openModal = (user)=>{
		setShow(true);
		setCurrentUser(user);
		console.log("open");
	}
	const [modalShow, setModalShow] = useState(false);
	const onViewClick = (user)=>{
		
        setModalShow(true)
        setCurrentUser(user)
    }
	const [currentUser, setCurrentUser] = useState({});
	const [spinning, setSpinning] = useState(false);
    const [users, setUsers] = useState([])
    
	//Phan trang cho nay
	const getAllUser = async ()=>{
        try{
			//Params: 
			//	recently: true/false, sort theo ngày tháng
			//	keyword: string, từ khóa tìm kiếm, tìm theo email + tên
			//	currentPage: number, page cần tìm
			// 	pageSize: số items/ page
			    const res = await getApiMethod('admin/users?filter={pageSize: 2}');
			const arr = [];
			for(var i = 0; i < res.items.length; i++){
				const user = res.items[i];
				if(user.role !== "ADMIN"){
					arr.push(user)
				}
			}
            setUsers(arr)
			const totalPages = 12;
			console.log(`Get user list: recently ${recently}, keyword: ${keyword}, currentPage: ${currentPage}, pageSize: ${pageSize}, totalPages: ${totalPages}`)
			onLoading(totalPages);
            }
        catch(e){
            console.log(e);
        }

    }
	const userData = []
	const formatDate = (date)=>{
		const dateObj = new Date(date);
		const month = dateObj.getMonth()+1;
		const day = String(dateObj.getDate()).padStart(2, '0');
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`
	}
	for(var i = 0; i < users.length; i++){
		const user = users[i];
		userData.push({
			...user, 
			createdAt: formatDate(user.createdAt),
			status: Status({isLocked: !user.active}), 
			active: user.active,
			action:Lock({
					user,
					isLocked: !user.active,
					openModal,
					onViewClick
					})
		})
	}
    useEffect(() => {
		getAllUser();
	}, [currentPage, recently, keyword]);
   
	//Mark to customize later!!
	const rowStyle = (row, rowIndex) => {
		const style = {};

		if (users[rowIndex].active === false) {
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
	
	const [showToast, setShowToast] = useState(false);
    return (
        
		<div style = {{position: 'relative'}}>
			<ToolkitProvider defaultSorted = {defaultSorted} bootstrap5 keyField="email" data={userData} columns={columns} search>
				{(props) => (
					<div>
						
						<Card className="text-center d-grid grap-2 div-horizontal">
							<BootstrapTable
								bootstrap4
								hover
								noDataIndication="Không có sinh viên nào"
								rowStyle={rowStyle}
								wrapperClasses="table-responsive"
								// rowEvents={ rowEvents }
								{...props.baseProps}
								cellEdit={cellEditFactory({
									mode: "click",
									blurToSave: true,
									beforeSaveCell,
								})}
							/>
						</Card>
					</div>
				)}
					
			</ToolkitProvider>
			<ModalLockUser show = {show}
						 handleClose = {handleClose}
						currentUser = {currentUser}
						onClick = {onClick}
						spinning = {spinning}
			/>
			<Toast bg="warning" onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide style = {{position: 'fixed' ,top: 20, zIndex: 100, left: '50%'}}>
				<Toast.Header>
					<strong className="me-auto">Thông báo</strong>
				</Toast.Header>
				<Toast.Body>Mã số sinh viên này đã được sử dụng!</Toast.Body>
			</Toast>
			<AccountQuickView
				show={modalShow}
                handleClose={() => setModalShow(false)}
                openModal = {openModal}
                user = {currentUser}
				onStudentIdChange = {onStudentIdChange}
			/>
			
		</div>
    )
}
const Status = ({isLocked})=>{
    return(
        <div style = {{color: isLocked?'red' : 'green', fontWeight:'bold'}} >
            {isLocked?"Bị khóa":"Hoạt động"}
        </div>
    )
}
const Lock = ({isLocked, openModal, user, onViewClick})=>{
	
    return(
		<>
			<Button variant="outline-primary" style = {{width: '50px', marginRight: 10}} onClick = {()=>onViewClick(user)} >
				<>
					<i className = "fas fa-eye"></i> 
				</>
			</Button>

			<Button variant={isLocked?"success":"danger"} style = {{width: '50px'}} onClick = {()=>openModal(user)} >
				{isLocked?
					<>
						<i className = "fas fa-unlock"></i>
					</>
					
				: 
					<>
						<i className = "fas fa-lock"></i> 
					</>
					
				}
			</Button>
				
		</>
        
    )
}

export default AdminAccounts;