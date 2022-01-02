
import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Toast } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { postApiMethod } from "../../api/api-handler";
import CustomPagination from "../pagination/custom-pagination";
import { getApiMethod } from "../../api/api-handler";
import ModalLockUser from "./admin-confirm-lock-user";
const AdminAccounts = () =>{
	const studentIdValidator = (newValue, row, column) => {
		return { valid: true, message: `Phạm vi điểm 0 - 10` };
		
		
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
	const [currentUser, setCurrentUser] = useState({});
	const [spinning, setSpinning] = useState(false);
    const [users, setUsers] = useState([])
    const getAllUser = async ()=>{
        try{
            const res = await getApiMethod('admin/users');
			const arr = [];
			for(var i = 0; i < res.items.length; i++){
				const user = res.items[i];
				if(user.role !== "ADMIN"){
					arr.push(user)
				}
			}
            setUsers(arr)
			console.log(arr);
            }
        catch(e){
            console.log(e);
        }

    }
	const userData = []
	for(var i = 0; i < users.length; i++){
		const user = users[i];
		userData.push({
			...user, 
			status: Status({isLocked: !user.active}), 
			active: user.active,
			action:Lock({
					user,
					isLocked: !user.active,
					openModal
					})
		})
	}
    useEffect(() => {
		getAllUser();
	}, []);
   
	//Mark to customize later!!
	const rowStyle = (row, rowIndex) => {
		const style = {};

		if (users[rowIndex].active === false) {
            style.backgroundColor = "#FFCDC2";
            
        }


		return style;
	};
    const defaultSorted = [
		{
			dataField: "name",
			order: "desc",
		},
	];
	const totalPages = 25;
	const [currentPage, setCurrentPage] = useState(1);
	const pageClicked = (page)=>{
		setCurrentPage(page);
	}
	const [showToast, setShowToast] = useState(false);
    return (
        
		<div style = {{position: 'relative'}}>
			<ToolkitProvider defaultSorted = {defaultSorted} bootstrap5 keyField="account" data={userData} columns={columns} search>
				{(props) => (
					<div>
						<CustomPagination pageClicked = {pageClicked} totPages ={totalPages} currentPage = {currentPage}/>
						<hr />
						
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
const Lock = ({isLocked, openModal, user})=>{
	
    return(
		<>
			<Button variant={isLocked?"outline-success":"outline-danger"} style = {{width: '100px'}} onClick = {()=>openModal(user)} >
				{isLocked?
					<>
						<i className = "fas fa-unlock"></i>  Mở khóa
					</>
					
				: 
					<>
						<i className = "fas fa-lock"></i>  Khóa
					</>
					
				}
			</Button>
				
		</>
        
    )
}

export default AdminAccounts;