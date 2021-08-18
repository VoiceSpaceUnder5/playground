import React, { useContext } from "react";
import { contextPractice } from "./GrandParent";

const Child = () => {
  //   const useContextPractice = useContext(contextPractice);
  return (
    <contextPractice.Consumer>
        {/* <button onClick={useContextPractice?.testFunction}>{useContextPractice?.testColor}</button>  */}
        {(value) => <button onClick={value?.testFunction}></button>}
    </contextPractice.Consumer>
  );
};

export default Child;
