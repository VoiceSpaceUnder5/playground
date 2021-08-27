function lightbulb() {
  let isLit = false;
  let isBroken = false;

  return {
    // state() {
    //   this.isBroken();
    //   return { isLit, isBroken };
    // },
    toggle() {
      isLit = !isLit;
    },
    break() {
      isBroken = true;
    },
    // isBroken() {
    //   if (isBroken) {
    //     isLit = false;
    //     return;
    //   }
    // },
  };
}

const bulb = lightbulb();
const log = () => {
  console.log(bulb.state());
};

bulb.toggle();
bulb.break();
// 전구가 break 되면 lit가 꺼지길 바랄 때 위의 주석을 풀어야 함.
// 위와 같이 boolean 값이 추가될 때, 관리해야하는 상태가 가지는 경우의 수가 2^n이 되는 상황을
// combinatorial(boolean) explosion이라 함.

log();
