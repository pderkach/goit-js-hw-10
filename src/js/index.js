import { fetchBreeds, fetchCatByBreed } from './api/cat-api';
import { MarkUpInterface } from './service-markup/service-markup';

const ref = {
  input: '.breed-select',
  card: '.cat-info',
  loader: '.loader',
};

const catInterface = new MarkUpInterface(ref);

document.addEventListener('DOMContentLoaded', addDataToSelect);
catInterface.input.addEventListener('change', onShowCardCat);

function addDataToSelect() {
  fetchBreeds()
    .then(data => {
      catInterface.createMarkUpForSelect(data);
      catInterface.showSelect();
    })
    .catch(() => {
      catInterface.showError('select');
      catInterface.hiddenSelect();
    })
    .finally(() => {
      catInterface.switchShowLoader();
    });
}

function onShowCardCat(evt) {
  catInterface.switchShowCard();
  catInterface.switchShowLoader();

  fetchCatByBreed(evt)
    .then(data => catInterface.createMarkUpCard(data))
    .catch(() => catInterface.showError('card'))
    .finally(() => {
      catInterface.switchShowLoader();
      catInterface.switchShowCard();
    });
}
