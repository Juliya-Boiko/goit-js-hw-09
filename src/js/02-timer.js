import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    picker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < new Date().getTime()) {
            refs.startBtn.disabled = true;
            Notify.failure('Please choose a date in the future');
            updateCounter({days: 0, hours: 0, minutes: 0, seconds: 0});
        } else {
            refs.startBtn.disabled = false;
            clearInterval(intervalId);
            updateCounter({days: 0, hours: 0, minutes: 0, seconds: 0});
        }
    },
};

let intervalId = null;
const fp = flatpickr(refs.picker, options);
// refs.startBtn.disabled = true;

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function onStartBtnClick() {
    intervalId = setInterval(() => {
        const newDay = new Date();
        const choosenDay = fp.selectedDates[0];
        const delta = choosenDay.getTime() - newDay.getTime();
        if (delta < 0) {
        clearInterval(intervalId);
            refs.startBtn.disabled = false;
            return;
        }
        const convertedForCounter = convertMs(delta);
        updateCounter(convertedForCounter);
    }, 1000);
    refs.startBtn.setAttribute('disabled', 'true');
}

function updateCounter(obj) {
    refs.days.textContent = addLeadingZero(obj.days);
    refs.hours.textContent = addLeadingZero(obj.hours);
    refs.minutes.textContent = addLeadingZero(obj.minutes);
    refs.seconds.textContent = addLeadingZero(obj.seconds);
}

refs.startBtn.addEventListener('click', onStartBtnClick);