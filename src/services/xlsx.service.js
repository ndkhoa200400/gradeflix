import XLSX from 'xlsx';
const createTemplateUploadStudentList = ()=>{
    exportFile([["Mã số sinh viên", "Họ và tên"]], "Danh_Sach_Sinh_Vien.xlsx");
}
const createTemplateUploadGradeAssignment = (students)=>{
    const data = []
    data.push(["Mã số sinh viên", "Điểm"])
    for(var i = 0; i < students.length; i++)
        data.push([students[i].studentId, ""])
    exportFile(data, "Mau_Cham_Diem.xlsx");
}
const exportGradeBoard = (students, className, gradeStructure)=>{
    // MSSV, HoTen, cac cot diem
    const gradeCompositions = gradeStructure.gradeCompositions
    const data = []
    var firstRow = ["MSSV", "Họ và tên"]
    for(var i = 0; i < gradeCompositions.length; i++) {
        firstRow.push(gradeCompositions[i].name)
    }
    firstRow.push("Tổng kết")
    data.push(firstRow);
    
    for(var j = 0; j < students.length; j++){
        
        const row = getRowGradeBoard(students[j]);
      
        data.push(row)
    }
        
    exportFile(data, `Bang_Diem_Diem${className}.xlsx`);
}
const getRowGradeBoard = (student) =>{
    const row = [student.studentId, student.fullName]
    for(var i = 0; i < student.grades.length; i++) {
       
        row.push(student.grades[i].grade)
    }
    row.push(student.total);
    return row;
}
const exportFile = (data, fileName = "sheet.xlsx") => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, fileName)
};
export {createTemplateUploadStudentList,createTemplateUploadGradeAssignment, exportFile, exportGradeBoard} 