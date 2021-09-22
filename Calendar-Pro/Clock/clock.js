// const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const minutesGot = document.getElementById("minutesGot").innerHTML;
const hoursGot = document.getElementById("hoursGot").innerHTML;

function setDate() {
  // const now = new Date();

  const seconds = 0;
  // const secondsDegrees = ((seconds / 60) * 360) + 90;
  // secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = minutesGot;
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = hoursGot;
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();