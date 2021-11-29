import React, { useState } from "react";
import {  Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
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


const GradeBoard = ()=> {
    const [columns, setColumns] = useState([
        {
          dataField: "studentId",
          text: "MSSV",
          editable: false,
          sort: true,
          headerFormatter,
          sortCaret
        },
        {
          dataField: "name",
          text: "Họ và tên",
          sort: true,
          editable: true,
          headerFormatter,
          sortCaret,
        }
        
      ]);
      
    const defaultSorted = [
        {
          dataField: "name",
          order: "desc"
        }
    ];
    const [students, setStudents] = useState([
      { studentId: 1, name: "Jay", grade: 1 },
      { studentId: 2, name: "orange", grade: 2 },
      { studentId: 3, name: "banana", grade: 3 },
      { studentId: 4, name: "peach", grade: 2 },
      { studentId: 5, name: "carrot", grade: 1 },
      { studentId: 6, name: "grapes", grade: 4 },
      { studentId: 7, name: "mango", grade: 1 },
      { studentId: 8, name: "potatoe", grade: 3 },
      { studentId: 9, name: "onion", grade: 3 },
      { studentId: 10, name: "onion", grade: 3 },
      { studentId: 11, name: "onion", grade: 3 },
      { studentId: 12, name: "onion", grade: 3 },
      { studentId: 13, name: "onion", grade: 3 },
      { studentId: 14, name: "onion", grade: 3 }
    ]);
    const beforeSaveCell = (oldValue, newValue, row, column, done) => {
        const studentId = row.studentId;
        const field = column.dataField;
        console.log(studentId, field, newValue)
        const newList = [...students];
        for(var i = 0; i < newList.length; i++){
            if (newList[i].studentId === studentId){
                newList[i][field] = newValue;
                break;
            } 
        };
        setStudents(newList);
      };

    return (
      <ToolkitProvider
        bootstrap5
        defaultSorted={defaultSorted}
        keyField="id"
        data={students}
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
                    striped
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