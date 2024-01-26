// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
console.log(form);
form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const { state, delay } = Object.fromEntries(formData.entries());

  if (!state) {
    return;
  }

  new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        return res(delay);
      }

      rej(delay);
    }, delay);
  })
    .then(successfullNotification)
    .catch(rejectedNotification);
});

function successfullNotification(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: 'white',
    backgroundColor: 'green',
    theme: 'light',
    position: 'topRight',
  });
}

function rejectedNotification(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    messageColor: 'white',
    backgroundColor: 'red',
    theme: 'light',
    position: 'topRight',
  });
}
