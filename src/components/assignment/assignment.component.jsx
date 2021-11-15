
const Assignment = ({ list }) => {
    return (
        <div className="list-group ">

            {
                list.map(item => (
                    <div>
                        <a href="#" className="list-group-item active">
                            <h4 className="list-group-item-heading">{item.title}</h4>
                            <p className="list-group-item-text">{item.info}</p>
                        </a>
                        <br></br>
                    </div>
                ))
            }
        </div>
    )
};

export default Assignment;
