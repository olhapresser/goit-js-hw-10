/*-------  Підключаю бібліотеку FlatPick  -------*/
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

/*-------  Достаю елементи  -------*/

const dateTime = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

/*------- Логіка -------*/


startBtn.disabled = true;

let userSelectedDate;
let countdownInterval;

flatpickr(dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose([selectedDates]) {
    if (selectedDates.getTime() < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates.getTime();
    }
  },
});

function timerStart() {
  countdownInterval = setInterval(() => {
      const startTime = userSelectedDate;
      const currentTime = Date.now();
      const diff = startTime - currentTime;

      if (diff <= 0) {
            startBtn.disabled = true;
          clearInterval(countdownInterval);
          convertMs(0);
      } else {
          
          // startBtn.disabled = false;
          const time = convertMs(diff);

        updateClockFace(time);
        
      }
    
    startBtn.disabled = true;
dateTime.disabled = true;
  }, 1000);

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
dataDays.textContent = days;
  dataHours.textContent=hours;
  dataMinutes.textContent=minutes;
  dataSeconds.textContent=seconds;
}

startBtn.addEventListener('click', () => {
    if (userSelectedDate) {
      timerStart();
    }
})