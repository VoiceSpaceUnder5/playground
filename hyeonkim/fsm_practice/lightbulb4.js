import { interpret, Machine } from "xstate";

const lit = {
  on: {
    BREAK: "broken",
    TOGGLE: "unlit",
  },
};
const unlit = {
  on: {
    BREAK: "broken",
    TOGGLE: "lit",
  },
};
const broken = {
  // broken이 상태머신의 마지막 상태이므로 type: 'final'
  type: "final",
};

// states에는 각 상태별로 받는 이벤트와 이벤트가 일어난 후의 상태를 표현
const states = { lit, unlit, broken };
const initial = "unlit";

const config = {
  id: "lightbulb",
  initial,
  states,
};

const lightBulbMachine = Machine(config);

const services = interpret(lightBulbMachine).start();

services.send('TOGGLE');
let nextState = services.state;
console.log(nextState.value);
services.send('TOGGLE');
nextState = services.state;
console.log(nextState.value);
services.send('BREAK');
nextState = services.state;
console.log(nextState.value);