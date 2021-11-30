import React from "react";
import {  Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { postApiMethod } from "../../api/api-handler";
import './grade-board.css'

const { SearchBar } = Search;

const headerFormatter = (column, colIndex, { sortElement, filterElement })=> {
  return (
    <div style={ { display: 'flex', flexDirection: 'row',  justifyContent:'center', cursor:'pointer'} }>
      { filterElement }
      { column.text }
      { sortElement }
    </div>
  );
}
const sortCaret =  (order, column) => {
    if (!order) return ( <span>&nbsp;<i class="fas fa-sort" style={{fontSize:'10px'}}></i></span>);
    else if (order === 'asc') return ( <span>&nbsp;<i class="fas fa-sort-up" style={{fontSize:'10px'}} ></i></span>);
    else if (order === 'desc') return ( <span>&nbsp;<i class="fas fa-sort-down" style={{fontSize:'10px'}}></i></span>);
    return null;
  }


const GradeBoard = ({gradeStructure, students, onUpdateGrade, classroomId})=> {
    const gradeValidator = (newValue, row, column) => {
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: "Hãy nhập điểm bằng số"
            };
          }
        if (+newValue >= 0 && +newValue <= gradeStructure.total)
            return {valid: true}
        return {valid: false, message: `Phạm vi điểm 0 - ${gradeStructure.total}`}
    }

    const parems = gradeStructure.parems;
    const defaultSorted = [
        {
          dataField: "name",
          order: "desc"
        }
    ];
    const columns = [
        {
          dataField: "studentId",
          text: "MSSV",
          editable: false,
          sort: true,
          headerFormatter,
          sortCaret
        },
        {
          dataField: "fullName",
          text: "Họ và tên",
          sort: true,
          editable: false,
          headerFormatter,
          sortCaret,
        },
        {
            dataField: "account",
            text: "Tài khoản",
            sort: true,
            editable: false,
            headerFormatter,
            sortCaret,
          }
        
    ]
    parems.forEach(e=>{
        columns.push({
                    dataField: e.name,
                    text: `${e.name} (${e.percent}%)`, 
                    sort: true,
                    editable: true,
                    headerFormatter,
                    sortCaret,
                    validator: gradeValidator
                    })
    })
    columns.push({
        dataField: 'total',
        text: 'Tổng kết', 
        sort: true,
        editable: false,
        headerFormatter,
        sortCaret,
        })
   
    const data = []
    students.forEach(e=>{
        const newObj = {studentId: e.studentId, fullName: e.fullName, account: e.user?e.user.fullname:""}
        var updated = false;
        for(var i = 0; i < parems.length; i++){
            if (e.grades){
                for(var j = 0 ; j < e.grades.length; j++)
                    if(e.grades[j].name === parems[i].name)
                    {
                        newObj[`${parems[i].name}`] = e.grades[j].grade;
                        updated = true;
                        break;
                    }
                if (!updated)
                    newObj[`${parems[i].name}`] =  "";
            }
            else
                newObj[`${parems[i].name}`] =  "";
        }
            
        newObj['total'] = e['total'] ? e['total'] : "";
        data.push(newObj)
    })
    console.log(data)
    const beforeSaveCell = (oldValue, newValue, row, column, done) => {
        console.log(oldValue, newValue, (oldValue === undefined && newValue === ""))
        if (oldValue === newValue || (oldValue === undefined && newValue === ""))
            return;
        const studentId = row.studentId;
        const field = column.dataField;
        console.log(studentId, field, newValue)
        //call api
        postApiMethod(`classrooms/${classroomId}/students/${studentId}/grades?gradeName=${field}`, {newGrade: newValue})
        .then(res=>{
            console.log(res);
            onUpdateGrade(studentId, field, newValue);
        })
        .catch(e=>{
            console.log(e);
            onUpdateGrade(studentId, field, oldValue);
        });
        onUpdateGrade(studentId, field, newValue);
      };

    return (
      <ToolkitProvider
        bootstrap5
        defaultSorted={defaultSorted}
        keyField="studentId"
        data={data}
        columns={columns}
        search
        
      >
        {(props) => (
          <div>
            <SearchBar 
                {...props.searchProps}
                className="search-field"
                placeholder="Tìm kiếm"
             />
            <hr />
            <Card className="text-center d-grid grap-2 div-horizontal">
                <BootstrapTable
                    
                    bootstrap4
                    hover
                    noDataIndication="Không có sinh viên nào"
                    
                    wrapperClasses="table-responsive"
                // rowEvents={ rowEvents }
                {...props.baseProps}
                cellEdit={cellEditFactory({
                    mode: "click",
                    blurToSave: true,
                    beforeSaveCell
                    
                })}
                />
          </Card>
            
          </div>
        )}
      </ToolkitProvider>
    );
  
}
export default GradeBoard;