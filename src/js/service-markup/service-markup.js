import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class MarkUpInterface {
  constructor({ input, card, loader }) {
    this.input = document.querySelector(input);
    this.card = document.querySelector(card);
    this.loader = document.querySelector(loader);
  }

  createMarkUpForSelect(arr) {
    const markUp =
      '<option data-placeholder= "true"></option>' +
      arr
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join('');

    this.input.insertAdjacentHTML('afterbegin', markUp);
    new SlimSelect({
      select: this.input,
      settings: {
        placeholderText: "Choice cat's breed",
      },
    });
  }

  createMarkUpCard(arr) {
    this.card.innerHTML = '';

    const { url } = arr[0];
    const { name, description, temperament } = arr[0].breeds[0];

    const markUp = `<img src="${url}" alt="" width = 380 height = 320/> <div class = "card-text">
  <h2>${name}</h2>
  <p>${description}</p>
  <p><span class="bold-text">Temperament: </span>${temperament}</p> </div>
  `;

    this.card.insertAdjacentHTML('afterbegin', markUp);
  }

  showSelect() {
    this.input.classList.remove('is-hidden');
  }

  hiddenSelect() {
    this.input.classList.add('is-hidden');
  }

  showCard() {
    this.card.classList.remove('is-hidden');
  }

  hiddenCard() {
    this.card.classList.add('is-hidden');
  }

  switchShowLoader() {
    this.loader.classList.toggle('is-hidden');
  }

  showError(type) {
    switch (type) {
      case 'select':
        Notify.failure('Oops! Something went wrong! Try reloading the page!', {
          clickToClose: true,
          position: 'left-top',
          timeout: 999999,
        });
        break;
      case 'card':
        Notify.failure('Oops! Something went wrong! Choice another cat!', {
          clickToClose: true,
          position: 'left-top',
          distance: '42px',
          timeout: 10000,
        });
        break;
    }
  }
}

export { MarkUpInterface };