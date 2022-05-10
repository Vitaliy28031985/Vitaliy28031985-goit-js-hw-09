import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/themes/dark.css';

//-----------------Загальні змінні-----------------

const refs = {
   inputDate: document.querySelector('#datetime-picker'),
   startBtn: document.querySelector('button[data-start]'),
   days: document.querySelector('span[data-days]'),
   hours: document.querySelector('span[data-hours]'),
   minutes: document.querySelector('span[data-minutes]'),
   seconds: document.querySelector('span[data-seconds]'),

 };

 let selectedTime = null,
 timerID = 0;


//-----------функція форматування дати------------

function convertMs(ms) {
   // Number of milliseconds per unit of time
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
 
   // Remaining days
   const days = addLeadingZero(Math.floor(ms / day));
   // Remaining hours
   const hours = addLeadingZero(Math.floor((ms % day) / hour));
   // Remaining minutes
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   // Remaining seconds
   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
 
   return { days, hours, minutes, seconds };
 }
 
 function addLeadingZero(value) {
   return String(value).padStart(2, '0');
 }

//------------------Налаштування опцій бібліотеки------

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: Date.now(),
   minuteIncrement: 1,
   onClose(selectedDates) {
     if (selectedDates[0] < Date.now()) {
       Notify.failure('Please choose a date in the future');
       selectedDates[0] = new Date();
       refs.startBtn.disabled = true;
     } else {
       refs.startBtn.disabled = false;
       selectedTime = selectedDates[0];
     }
   },
 }
 
 flatpickr(refs.inputDate, options);


 function accountTime() {
timerID = setInterval(() => {const currentTime = Date.now();
const differenceTime = selectedTime - currentTime;
const componentsTimer = convertMs(differenceTime);
updateComponentsTimer(componentsTimer);
if (differenceTime <= 0) {
stopTimer();
 }}, 1000)
 }


function updateComponentsTimer({ days, hours, minutes, seconds }) {
   refs.days.textContent = days;
   refs.hours.textContent = hours;
   refs.minutes.textContent = minutes;
   refs.seconds.textContent = seconds;
 }

function stopTimer() {
clearInterval(timerID);
 }
 
 refs.startBtn.addEventListener('click', accountTime);
