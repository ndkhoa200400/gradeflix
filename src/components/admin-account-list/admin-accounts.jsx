
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { postApiMethod } from "../../api/api-handler";
import CustomPagination from "./custom-pagination";
import { getApiMethod } from "../../api/api-handler";
const AdminAccounts = () =>{
	const studentIdValidator = (newValue, row, column) => {
		if (isNaN(newValue)) {
			return {
				valid: false,
				message: "Hãy nhập điểm bằng số",
			};
		}
		if (+newValue >= 0 && +newValue <= 10) return { valid: true };
		return { valid: false, message: `Phạm vi điểm 0 - 10` };
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
            dataField: "active",
			text: "Trạng thái",
			editable: false,
        },
        {
			dataField: "action",
			text: "Thao tác",
			editable: false,
		},
	];
	

	

	const beforeSaveCell = async (oldValue, newValue, row, column, done) => {
		console.log(oldValue, newValue, oldValue === undefined && newValue === "");
		if (oldValue === newValue || (oldValue === undefined && newValue === "")) return;
		const studentId = row.studentId;
		const field = column.dataField;
		//call api
		try {
			const res = await postApiMethod(``, {
				newGrade: newValue,
			});
			
		} catch (e) {
			console.log(e);
		}
	};
    const [users, setUsers] = useState([])
    const getAllUser = async ()=>{
        try{
            const res = await getApiMethod('admin/users');
            console.log(res)
            const newUsers = []
            for(var i = 0; i < res.items.length; i++){
                const user = res.items[i];
                if(user.role !== "ADMIN"){
                    newUsers.push({
                        ...user, 
                        active: Status({isLocked: !user.active}), 
                        action:Lock({id: user.id, isLocked: !user.active})
                    })
                }
                
                
            }
            setUsers(newUsers);
                console.log(newUsers)
            }
        catch(e){
            console.log(e);
        }

    }
    useEffect(() => {
		getAllUser();
        
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
   
	//Mark to customize later!!
	const rowStyle = (row, rowIndex) => {
		const style = {};
		if (users[rowIndex].active === false) {
            style.backgroundColor = "#FFCDD2";
            
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
        <ToolkitProvider defaultSorted = {defaultSorted} bootstrap5 keyField="account" data={users} columns={columns} search>
			{(props) => (
				<div>
					<CustomPagination/>
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
    )
}
const Status = ({isLocked})=>{
    return(
        <div style = {{color: isLocked?'red' : 'green'}} >
            {isLocked?"Bị khóa":"Hoạt động"}
        </div>
    )
}
const Lock = ({id, isLocked})=>{
    return(
        <Button variant={isLocked?"outline-success":"outline-danger"} style = {{width: '100px'}} >
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
    )
}

export default AdminAccounts;