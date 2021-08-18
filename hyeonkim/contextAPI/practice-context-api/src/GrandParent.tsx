import React, { ReducerWithoutAction, useContext, useState } from "react";
import Parent from "./Parent";

interface ctxInterface {
  testColor: string;
  testFunction: () => void;
}

export const contextPractice = React.createContext<ctxInterface | null>(null);

const GrandParent = () => {
  const [color, setColor] = useState<string>("black");
  const pracFunction = () => {
    setColor(color === "yellow" ? "black" : "yellow");
  };
  return (
    <contextPractice.Provider
      value={{ testColor: color, testFunction: pracFunction }}
    >
      <Parent />
    </contextPractice.Provider>
  );
};

export default GrandParent;
