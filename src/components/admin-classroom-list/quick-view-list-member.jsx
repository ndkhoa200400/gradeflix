import { Table, Card } from "react-bootstrap";
const QuickViewListMember = ({isTeacherList, list})=>{
    return (
		<Card className="my-3 " style = {{marginTop: 20+'! important'}}>
			<Card.Header>
				<Card.Title>{isTeacherList?"Giáo viên": "Sinh viên"}</Card.Title>
			</Card.Header>
			<Card.Body>
				<Table hover>
					<thead>
						<tr className="">
							<th>Tên</th>
							{!isTeacherList?<th>MSSV</th>:null}
						</tr>
					</thead>
					<tbody>
						{list.map((item, idx) => (
							<tr key={idx}>
								<td className="py-3 ">
									<div className="user-info">
										<img
											src={item.avatar ?? "/default-avatar.png"}
											width={24}
											height={24}
											className="me-2"
											alt="member avatar"
										></img>
										{item.fullname}{" "}

									</div>
								</td>
								{!isTeacherList?<td>{item.studentId}</td>:null}
							</tr>
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
    )
}
export default QuickViewListMember;