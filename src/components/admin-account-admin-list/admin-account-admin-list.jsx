
import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { postApiMethod } from "../../api/api-handler";
import CustomPagination from "../pagination/custom-pagination";
import { getApiMethod } from "../../api/api-handler";
import ModalLockUser from '../admin-account-list/admin-confirm-lock-user'
import * as AuthService from '../../services/auth.service'
const AdminAccountAdmins = ({recently, keyword, currentPage, pageSize, onLoading}) =>{
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
	

	

	const onClick = async(id, isLocked)=>{
		setSpinning(true);
		try{
			const res = await postApiMethod(`admin/accounts/`+id, {active: isLocked});	
			console.log(res);
			const newAccounts = [...accounts]
            for(var i = 0; i < newAccounts.length; i++){
                if(newAccounts[i].id === id){
					const user = newAccounts[i];
					user.active = !user.active;
					newAccounts[i] = user;
					
                }
            }
            setAccounts(newAccounts);
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
    const [accounts, setAccounts] = useState([])
    
	//Phan trang cho nay
	const getAllUser = async ()=>{
        try{
            //Params: có sẵn ở đầu hàm rồi, tạo filter thôi
			//	recently: true/false, sort theo ngày tháng
			//	keyword: string, từ khóa tìm kiếm, tìm theo email + tên
			//	currentPage: number, page cần tìm
			// 	pageSize: số items/ page
            const res = await getApiMethod('admin/accounts?filter={pageSize: 2}');
            const arr = []
            for(var i = 0; i < res.items.length; i++){
				const user = res.items[i];
				if(user.id !== myaccount.id){
					arr.push(user)
				}
			}
            setAccounts(arr)
            const totalPages = 10;
            console.log(`Get admin list: recently ${recently}, keyword: ${keyword}, currentPage: ${currentPage}, pageSize: ${pageSize}, totalPages: ${totalPages}`)
			onLoading(totalPages);
        }
        catch(e){
            console.log(e);
        }

    }
    const formatDate = (date)=>{
		const dateObj = new Date(date);
		const month = dateObj.getMonth()+1;
		const day = String(dateObj.getDate()).padStart(2, '0');
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`
	}
	const accountData = []
	for(var i = 0; i < accounts.length; i++){
		const user = accounts[i];
		accountData.push({
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

		if (accounts[rowIndex].active === false) {
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
        
		<div style = {{position: 'relative'}}>
			<ToolkitProvider defaultSorted = {defaultSorted} bootstrap5 keyField="email" data={accountData} columns={columns} search>
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
			<ModalLockUser show = {show}
						 handleClose = {handleClose}
						currentUser = {currentUser}
						onClick = {onClick}
						spinning = {spinning}
			/>
       
			{/* <AccountQuickView
				show={modalShow}
                handleClose={() => setModalShow(false)}
                openModal = {openModal}
                user = {currentUser}
				onStudentIdChange = {onStudentIdChange}
			/> */}
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

export default AdminAccountAdmins;