import { Machine } from "xstate";

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

// transition에는 (기준이 되는 상태, 이벤트)방식으로 인자 전달
console.log(lightBulbMachine.transition("lit", "TOGGLE").value); // => 'unlit'
console.log(lightBulbMachine.transition("unlit", "BREAK").value); // => 'broken'
