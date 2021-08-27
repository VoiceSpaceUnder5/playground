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

// 요롷게 onTransition 이벤트 리스너를 걸어버릴 수도 있음.
services.onTransition(state => {
    if (state.matches('broken')) {
        console.log('broken');
    } else if (state.matches('lit')) {
        console.log('lit');
    } else if (state.matches('unlit')) {
        console.log('unlit');
    }
})

services.send('TOGGLE');
services.send('TOGGLE');
services.send('BREAK');
