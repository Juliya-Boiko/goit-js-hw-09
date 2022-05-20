import { Notify } from 'notiflix/build/notiflix-notify-aio';
	
const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};

function onSubmitForm(evt) {
  evt.preventDefault();
  const firstDelay = +evt.target.elements.delay.value;
  const step = +evt.target.elements.step.value;
  const amount = +evt.target.elements.amount.value;
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      createPromise(i + 1, firstDelay + i * step)
        .then(notify => Notify.success(notify))
        .catch(notify => Notify.failure(notify));
    }, firstDelay + i * step)
  }
}

form.addEventListener('submit', onSubmitForm);
