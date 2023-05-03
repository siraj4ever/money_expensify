import { useState } from "react";

function Extra() {
  const [showHide, setShowHide] = useState("Siraj");

  function showBtn() {
    setShowHide("Siraj Alam");
  }

  return (
    <>
      {showHide}
      <br />
      <button onClick={() => showBtn()}>Show Details</button>
    </>
  );
}

export default Extra;
