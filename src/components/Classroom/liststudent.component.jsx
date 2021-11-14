
const ListStudent = ({ list }) => {
    return (
        <div >
            <table className="table table-striped table-hover col-lg-3">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>MSSV</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.id}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default ListStudent;
