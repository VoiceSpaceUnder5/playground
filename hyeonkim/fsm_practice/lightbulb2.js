const STATES = {
  lit: "lit",
  unlit: "unlit",
  broken: "broken",
};

function lightbulb() {
  let state = STATES.unlit;

  return {
    state() {
      return state;
    },
    toggle() {
      switch (state) {
        case STATES.unlit:
          state = STATES.lit;
          break;
        case STATES.lit:
          state = STATES.unlit;
          break;
        default:
          break;
      }
    },
    break() {
      state = STATES.broken;
    },
  };
}
// 아예 위와 같이 표현 가능한 상태를 하나만 두고,
// 전구가 깨진 상태와 전구에 불이 들어온 상태가 함께 관리되어 복잡한 문제를 쉽게 해결할 수도 있음.

const bulb = lightbulb();
const log = () => {
  console.log(bulb.state());
};

bulb.toggle();
bulb.break();

log();
