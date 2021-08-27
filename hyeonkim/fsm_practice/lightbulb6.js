import { interpret, Machine } from "xstate";

// states에는 각 상태별로 받는 이벤트와 이벤트가 일어난 후의 상태를 표현

const config = {
  id: "lightbulb",
  initial: "unlit",
  states: {
    lit: {
      on: {
        // 이처럼 특정 이벤트 이름에 바로 'broken'을 써넣는 것은 실제로는
        // {target: 'broken'}라는 객체를 할당하는 작업의 축약임
        // 이 객체에 actions라는 속성도 넘겨줄 수 있음.
        // 각 함수는 (context, event) => any | void의 시그니처를 가짐.
        BREAK: {
          target: "broken",
          actions: ["logBroken"],
        },
        TOGGLE: "unlit",
      },
    },
    unlit: {
      on: {
        BREAK: {
          target: "broken",
          actions: ["logBroken"],
        },
        TOGGLE: {
          tartget: "lit",
          actions: ["logLit"],
        }
      },
    },
    broken: {
      type: "final",
    },
  },
};

const lightBulbMachine = Machine(config, {
  // 액션이란 "일어나고 잊혀지는" 사이드 이펙트를 뜻함.
  actions: {
    logBroken: (context, event) => {
      console.log(`Yo I'm broke in the ${event.location}`);
    },
    logLit: (context, event) => {
      console.log(`Yo I'm lit in the ${event.location}`);
    }
  },
});

const services = interpret(lightBulbMachine).start();

// services.send({ type: "BREAK", location: "HOME" });
services.send({ type: "TOGGLE", location: "HOME" });

// https://xstate.js.org/viz/ 시각화된 상태머신을 볼 수도 있음.
