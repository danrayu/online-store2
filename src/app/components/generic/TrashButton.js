import React from "react";

const TrashButton = (props) => {
  const callMaster = () => {
    props.do();
  }
  return (
    <button className="btn btn-md btn-danger ms-2" onClick={callMaster}>
        Delete
    </button>
  );
};

export default TrashButton;
