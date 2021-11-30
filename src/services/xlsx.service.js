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
const exportFile = (data, fileName = "sheet.xlsx") => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, fileName)
};
export {createTemplateUploadStudentList,createTemplateUploadGradeAssignment, exportFile} 