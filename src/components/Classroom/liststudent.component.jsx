const ListStudent = ({ list }) => {
  return (
    <div>
      <table className="table table-striped table-hover col-lg-3">
        <thead>
          <tr>
            <th>Tên</th>
            <th>MSSV</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr>
              <td>
                <img
                  src={item.avatar ?? "./default-avatar.png"}
                  width={24}
                  height={24}
                  className="me-2"
                ></img>
                {item.fullname}
              </td>
              <td>{item.studentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudent;
