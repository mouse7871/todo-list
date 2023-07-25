const clock = document.querySelector("h2#clock");
const dateBox = document.querySelector(".clock #date");

const week = new Array('일', '월', '화', '수', '목', '금', '토');

const makeCurrentTime = () => {
  const date = new Date();
  dateBox.innerText = makedateFormat(date);
  clock.innerText = makeClockFormat(date);
};

const makeClockFormat = (date) => {
  const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
  time.forEach((d, i) => {
    time[i] = String(d).padStart(2, "0");
  });
  return time.join(":");
};

const makedateFormat = (date) => {
  const time = [
    `${date.getMonth() + 1}월`,
    `${date.getDate()}일`,
    `${week[date.getDay()]}요일`,
  ];
  return time.join(" ");
};

// const makeClockFormat = (date) => {
//   const time = {
//     hour: date.getHours(),
//     minute: date.getMinutes(),
//     second: date.getSeconds(),
//   };
//   for (const [k, v] of Object.entries(time)) {
//     time[k] = String(v).padStart(2, "0");
//   }
//   return `${time.hour}:${time.minute}:${time.second}`;
// };

makeCurrentTime();
setInterval(makeCurrentTime, 1 * 1000); // 1초마다 계속 실행

// setTimeout(() => {}, 1 * 1000); // 1초 기다렸다 한번만 실행
