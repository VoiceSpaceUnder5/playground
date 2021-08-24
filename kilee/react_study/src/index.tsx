import React, { useEffect, useRef, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// const Context = createContext({ num: 3 });

const App = () => {
  const user = { name: 'kilee', age: 31 };
  const addAge = () => {
    user.age++;
    console.log(user.age);
  };
  return (
    <>
      <Child name={user.name} age={user.age} addAge={addAge} />
    </>
  );
};

interface ChildProps {
  name: string;
  age: number;
  addAge: () => void;
}

const Child = (props: ChildProps) => {
  useEffect(() => {
    console.log('heelo');
  }, [props.age]);
  return <GrandChild handleOnClick={props.addAge} />;
};

interface GrandChildProps {
  handleOnClick: () => void;
}
const GrandChild = (props: GrandChildProps) => {
  return <button onClick={props.handleOnClick}>+</button>;
};
// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
