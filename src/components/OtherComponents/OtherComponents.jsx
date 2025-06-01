import React from "react";
import Recomended from "../Recommended/Recomended";
import Puzzle from "../Puzzle/Puzzle";


const OtherComponents = React.forwardRef((props, ref) => {
  return (
    <div
      style={{ backgroundColor: "white", marginTop: "6rem", width: "100vw" }}
    >
        <Recomended />
        <Puzzle/>
    </div>
  );
});

export default OtherComponents;
