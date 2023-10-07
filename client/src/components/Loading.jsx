import React from "react";
import { Oval, TailSpin } from "react-loader-spinner";
function Loading() {
  return (
    <span className="loading-container">
      <TailSpin
        height="80"
        width="80"
        color="var(--highlight-clr)"
        ariaLabel="tail-spin-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />{" "}
    </span>
  );
}

export default Loading;
