const ListTeacher = ({ list }) => {
  return (
    <div>
      <table className="table table-hover col-lg-3">
        <thead>
          <tr>
            <th>Tên</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTeacher;
