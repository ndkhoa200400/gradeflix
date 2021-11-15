
const Banner = ({ classroom }) => {
    return (
        <div >
            <div className="card bg-dark text-white">
                <img className="card-img" src={classroom.banner} width="831" height="180" alt="Card image"></img>
                <div className="card-img-overlay">
                    <h5 className="card-title">{classroom.name}.</h5>
                    <p className="card-text">{classroom.description}</p>
                    <p className="card-text">Môn học:{classroom.subject}</p>
                </div>
            </div>
        </div>
    )
};

export default Banner;
