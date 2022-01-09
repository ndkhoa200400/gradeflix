import ReactLoading from "react-loading";
const Spinning = ({ isFull = true,...props }) => {
  return isFull ? (
    <div className="spinning ">
      <ReactLoading
        type="spinningBubbles"
        color="#4885ED"
        width="8%"
        height="8%"
       {...props}
      />
    </div>
  ) : (
    <ReactLoading
      type="spinningBubbles"
      color="#4885ED"
      width="8%"
      height="8%"
      {...props}
    />
  );
};

export default Spinning;
